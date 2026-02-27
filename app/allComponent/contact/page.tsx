"use client";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faUser, faEnvelope, faPhone, faMessage, faTag } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
  const [disableBtn, setDisableBtn] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    query: "",
    checkValidationArr: [undefined, null, '', '-', ' '],
    allValidation: ['https', 'http']
  });

  function handleChange(e: any) {
    if (typeof window !== 'undefined') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  }

  const validationContactUs = (data: any): boolean => {
    if (data && (data.checkValidationArr.includes(data['name']) || (data['name'] && data.allValidation.includes(data['name'].toString().toLowerCase())))) {
      toast.error("Please enter a valid name");
      return false;
    } else if (data && (data.checkValidationArr.includes(data['email']) || (data['email'] && data.allValidation.includes(data['email'].toString().toLowerCase())))) {
      toast.error("Please enter a valid email");
      return false;
    } else if (data && (data.checkValidationArr.includes(data['message']) || (data['message'] && data.allValidation.includes(data['message'].toString().toLowerCase())))) {
      toast.error("Please enter a valid message");
      return false;
    } else if (data && (data.checkValidationArr.includes(data['phone']) || (data['phone'] && data.allValidation.includes(data['phone'].toString().toLowerCase())))) {
      toast.error("Please enter a valid phone number");
      return false;
    } else if (data && (data.checkValidationArr.includes(data['query']) || (data['query'] && data.allValidation.includes(data['query'].toString().toLowerCase())))) {
      toast.error("Please enter a valid subject");
      return false;
    } else {
      return true;
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!validationContactUs(formData)) return;

    setDisableBtn(true);
    setSending(true);
    const toastId = toast.loading("Sending your message...");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_ij4brke';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_voknppw';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'jC5BQQhsO20XWm-qu';

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        phone: formData.phone,
        query: formData.query,
        time: new Date().toLocaleString()
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      toast.success("Message sent successfully!", { id: toastId });
      setFormData({ ...formData, name: "", email: "", message: "", phone: "", query: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again.", { id: toastId });
      console.error('EmailJS error:', err);
    } finally {
      setSending(false);
      setDisableBtn(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] text-white flex items-center justify-center p-4 md:p-8 pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32 transition-colors group-hover:bg-blue-600/20" />

          <div className="relative z-10 text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                Get In Touch
              </h1>
              <p className="text-neutral-400 max-w-lg mx-auto">
                Have a project in mind or just want to chat? Drop me a message below and I'll get back to you as soon as possible.
              </p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 ml-1 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="w-3 h-3" /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={disableBtn}
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-neutral-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 ml-1 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={disableBtn}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-neutral-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 ml-1 flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} className="w-3 h-3" /> Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={disableBtn}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-neutral-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 ml-1 flex items-center gap-2">
                  <FontAwesomeIcon icon={faTag} className="w-3 h-3" /> Subject
                </label>
                <input
                  type="text"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  disabled={disableBtn}
                  required
                  placeholder="Project Inquiry"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400 ml-1 flex items-center gap-2">
                <FontAwesomeIcon icon={faMessage} className="w-3 h-3" /> Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={disableBtn}
                required
                placeholder="Tell me more about your project..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-neutral-600 resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={disableBtn}
              className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl ${disableBtn
                  ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20"
                }`}
            >
              <FontAwesomeIcon icon={faPaperPlane} className={sending ? 'animate-bounce' : ''} />
              {sending ? "Sending Message..." : "Send Message"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
