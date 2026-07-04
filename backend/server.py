from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
CONTACT_RECIPIENT = os.environ.get('CONTACT_RECIPIENT')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app = FastAPI(title="Rohit Portfolio API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)


# ---------- Models ----------
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    email_forwarded: bool = False


# ---------- Helpers ----------
def build_email_html(name: str, sender_email: str, message: str) -> str:
    safe_msg = message.replace('\n', '<br>')
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:24px;font-family:Arial,sans-serif;">
      <tr><td>
        <table width="100%" style="max-width:640px;margin:0 auto;background:#141414;border:1px solid #27272A;">
          <tr><td style="padding:24px 28px;border-bottom:2px solid #FF3B30;">
            <div style="font-size:12px;letter-spacing:3px;color:#FF3B30;text-transform:uppercase;">NEW MESSAGE / PORTFOLIO</div>
            <div style="font-size:22px;color:#FFFFFF;margin-top:6px;font-weight:700;">ROHIT DHONGADE · CONTACT FORM</div>
          </td></tr>
          <tr><td style="padding:24px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="30%" style="padding:8px 0;color:#71717A;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Name</td>
                <td style="padding:8px 0;color:#FFFFFF;font-size:14px;">{name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#71717A;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Email</td>
                <td style="padding:8px 0;color:#FFFFFF;font-size:14px;">
                  <a href="mailto:{sender_email}" style="color:#FF3B30;text-decoration:none;">{sender_email}</a>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding:20px 0 8px 0;color:#71717A;font-size:11px;text-transform:uppercase;letter-spacing:2px;border-top:1px solid #27272A;">Message</td>
              </tr>
              <tr>
                <td colspan="2" style="padding:8px 0;color:#E4E4E7;font-size:14px;line-height:1.6;">{safe_msg}</td>
              </tr>
            </table>
          </td></tr>
          <tr><td style="padding:16px 28px;background:#0A0A0A;color:#71717A;font-size:10px;letter-spacing:2px;text-transform:uppercase;">
            Portfolio v2026.01 · Auto-forwarded via Resend
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def _send_forward_email(name: str, sender_email: str, message: str) -> bool:
    if not RESEND_API_KEY or not CONTACT_RECIPIENT:
        return False
    params = {
        "from": SENDER_EMAIL,
        "to": [CONTACT_RECIPIENT],
        "reply_to": sender_email,
        "subject": f"[Portfolio] New message from {name}",
        "html": build_email_html(name, sender_email, message),
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        return True
    except Exception:
        logger.exception("Resend forward failed")
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Rohit Dhongade Portfolio API", "status": "OK"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contact", response_model=Contact)
async def create_contact(input: ContactCreate):
    forwarded = await _send_forward_email(input.name, input.email, input.message)
    doc = Contact(**input.model_dump(), email_forwarded=forwarded).model_dump()
    try:
        await db.contact_messages.insert_one(doc)
    except Exception:
        logger.exception("Failed to insert contact")
        raise HTTPException(status_code=500, detail="Failed to store message")
    return Contact(**doc)


@api_router.get("/contact", response_model=List[Contact])
async def list_contact():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [Contact(**d) for d in docs]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
