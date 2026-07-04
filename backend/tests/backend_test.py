"""Backend API tests for Rohit Dhongade Portfolio API."""
import os
import pytest
import requests

def _load_frontend_env():
    env_path = "/app/frontend/.env"
    with open(env_path, "r") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                return line.split("=", 1)[1].strip()
    raise RuntimeError("REACT_APP_BACKEND_URL not found")


BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or _load_frontend_env()).rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health / Root ----------
class TestHealth:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "OK"
        assert "Rohit" in data.get("message", "")

    def test_health(self, api):
        r = api.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "time" in data


# ---------- Contact ----------
class TestContact:
    def test_create_contact_success(self, api):
        payload = {
            "name": "TEST_Rohit_Tester",
            "email": "tester_rohit@example.com",
            "message": "TEST_message: interested in your workshop services.",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data

    def test_get_contact_list(self, api):
        r = api.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # Ensure the previously inserted TEST_ record is present
        assert any(item["name"] == "TEST_Rohit_Tester" for item in data)
        # Verify _id is NOT leaked
        for item in data:
            assert "_id" not in item
            assert "id" in item

    def test_create_contact_missing_name(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"email": "x@example.com", "message": "hi"},
        )
        assert r.status_code == 422

    def test_create_contact_empty_message(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"name": "A", "email": "x@example.com", "message": ""},
        )
        assert r.status_code == 422

    def test_create_contact_invalid_email(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"name": "A", "email": "not-an-email", "message": "hi"},
        )
        assert r.status_code == 422

    def test_create_contact_all_missing(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json={})
        assert r.status_code == 422
