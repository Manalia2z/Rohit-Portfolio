import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { rohit } from "@/data/rohit";
import { Phone, Mail, MapPin, Linkedin, Send, ArrowUpRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("All fields are required");
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message received. Rohit will get back to you.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Could not send message. Try email directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
      data-testid="contact-section"
    >
      <div className="absolute inset-0 bg-grid opacity-40 mask-radial-fade pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="text-center mb-16">
          <div className="overline text-[#FF3B30]">08 / TERMINAL</div>
          <h2 className="mt-4 font-display font-bold text-white text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter">
            Let&apos;s Build
            <br />
            <span className="text-[#FF3B30]">Something.</span>
          </h2>
          <p className="mt-6 text-[#A1A1AA] max-w-xl mx-auto">
            Looking for a mechanic who takes the job card seriously? Reach out — service bays open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact info cards */}
          <div className="lg:col-span-5 space-y-4">
            <ContactCard
              icon={Phone}
              label="Phone / WhatsApp"
              value={rohit.phone}
              href={`tel:${rohit.phone}`}
              testid="contact-phone"
            />
            <ContactCard
              icon={Mail}
              label="Email"
              value={rohit.email}
              href={`mailto:${rohit.email}`}
              testid="contact-email"
            />
            <ContactCard
              icon={Linkedin}
              label="LinkedIn"
              value="rohit-dhongade"
              href={rohit.linkedin}
              testid="contact-linkedin"
            />
            <ContactCard
              icon={MapPin}
              label="Location"
              value={rohit.location}
              href="#workshop"
              testid="contact-location"
            />
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            onSubmit={submit}
            className="lg:col-span-7 card-industrial corners p-6 sm:p-8"
            data-testid="contact-form"
          >
            <span className="tl" /><span className="tr" />
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-[#FF3B30] animate-glow-pulse" />
              <span className="overline text-[#71717A]">SECURE / ENCRYPTED · V.2026</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                testid="input-name"
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                testid="input-email"
              />
            </div>
            <div className="mt-4">
              <label className="overline text-[#71717A]">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows="5"
                data-testid="input-message"
                className="mt-2 w-full bg-[#0A0A0A] border border-[#27272A] focus:border-[#FF3B30] outline-none px-4 py-3 text-white text-sm font-mono resize-none transition-colors"
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#71717A]">
                Response within 24 hrs
              </div>
              <button
                type="submit"
                disabled={sending}
                className="group inline-flex items-center gap-3 bg-[#FF3B30] hover:bg-[#FF5A52] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-widest px-6 py-3 transition-colors"
                data-testid="contact-submit"
              >
                <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                {sending ? "Transmitting..." : "Transmit"}
              </button>
            </div>
          </motion.form>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-[11px] uppercase tracking-widest text-[#71717A]">
            © 2026 · ROHIT R. DHONGADE · All Systems Operational
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#3ED598] rounded-full" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#71717A]">
              Portfolio v2026.01
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, label, value, href, testid }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4 }}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group card-industrial corners p-5 flex items-center justify-between block"
      data-testid={testid}
    >
      <span className="tl" /><span className="tr" />
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-[#27272A] group-hover:border-[#FF3B30] flex items-center justify-center transition-colors">
          <Icon className="text-[#FF3B30]" size={16} />
        </div>
        <div>
          <div className="overline text-[#71717A]">{label}</div>
          <div className="mt-1 font-display text-white text-sm sm:text-base">{value}</div>
        </div>
      </div>
      <ArrowUpRight
        className="text-[#71717A] group-hover:text-[#FF3B30] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
        size={18}
      />
    </motion.a>
  );
}

function Field({ label, value, onChange, type = "text", testid }) {
  return (
    <div>
      <label className="overline text-[#71717A]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={testid}
        className="mt-2 w-full bg-[#0A0A0A] border border-[#27272A] focus:border-[#FF3B30] outline-none px-4 py-3 text-white text-sm font-mono transition-colors"
      />
    </div>
  );
}
