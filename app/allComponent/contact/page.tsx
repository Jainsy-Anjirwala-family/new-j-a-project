"use client";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function Contact() {
  const [disableBtn, setDisableBtn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    query: "",
    checkValidationArr: [undefined,null,'','-',' '],
    allValidation: ['https', 'http']
  });

  function handleChange(e: any) {
  if (typeof window !== 'undefined'){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  }
  
  const validationContactUs = (data:any): boolean => {
   if(data && (data.checkValidationArr.includes(data['name']) || ( data['name'] && data.allValidation.includes(data['name'].toString().toLowerCase())))){
    toast.error("Please enter valid your name");
    return false;
   } else if(data && (data.checkValidationArr.includes(data['email']) || ( data['email'] && data.allValidation.includes(data['email'].toString().toLowerCase())))){
    toast.error("Please enter valid your email");
    return false;
   } else if(data && (data.checkValidationArr.includes(data['message']) || ( data['message'] && data.allValidation.includes(data['message'].toString().toLowerCase())))){
    toast.error("Please enter valid your message");
    return false;
   } else if(data && (data.checkValidationArr.includes(data['phone']) || ( data['phone'] && data.allValidation.includes(data['phone'].toString().toLowerCase())))){
    toast.error("Please enter valid your phone number");
    return false;
   } else if(data && (data.checkValidationArr.includes(data['query']) || ( data['query'] && data.allValidation.includes(data['query'].toString().toLowerCase())))){
    toast.error("Please enter valid your subject");
    return false;
   } else{
    return true;
   }
  }
  
async function handleSubmit(e:any) {
  e.preventDefault();
  setDisableBtn(true);
  if (validationContactUs(formData)){
    toast.loading("Sending...");
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_ij4brke';
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_voknppw';
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'jC5BQQhsO20XWm-qu';
  
    // Simple validation with clearer diagnostics (no secret values printed)
    const missing: string[] = [];
    if (!serviceId) missing.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
    if (!templateId) missing.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID');
    if (!publicKey) missing.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');
    if (missing.length > 0) {
      const msg = `EmailJS not configured. Missing env: ${missing.join(', ')}`;
      console.error(msg);
      return;
    }
  
    setSending(true);
    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        phone: formData.phone,
        query: formData.query,
        time: new Date().toLocaleString()
      };
  
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      toast.dismiss();
      toast.success("Message sent!");
      setFormData({...formData, name: "", email: "", message: "", phone: "", query: ""});
      setDisableBtn(false);
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong!");
      console.error('EmailJS error:', err);
      setDisableBtn(false);
    } finally {
      setSending(false);
      setDisableBtn(false);
    }
  }
}
const [sending, setSending] = useState(false);

  return (
    <div className="bg-img-portfolio padd-per-t-10 padd-per-b-9 ht-pc-45">
      <div className="container padd-per-r-10 padd-per-l-10 border-all-px-3 border-color-grey border-radius-px-15 bg-img-style font-color-val-white"> 
        <div className="padd-per-l-5 padd-per-r-5 padd-per-t-3 padd-per-b-3 fade-in animation-delay-fade-in-5s">
          <h1>Contact Me</h1>
          <form onSubmit={handleSubmit}>
            <div className="row marg-per-t-2">
              <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6 col-xl-6 col-xxl-6">
                <label>Name:</label>
                <input  type="text" name="name" value={formData.name} onChange={handleChange} disabled={disableBtn} required className="form-control"/>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6 col-xl-6 col-xxl-6">
                <label>Email:</label>
                <input  type="email" name="email" value={formData.email} onChange={handleChange} disabled={disableBtn} required className="form-control"/>
              </div>
            </div>
            <div className="row marg-per-t-2">
              <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6 col-xl-6 col-xxl-6">
                <label>Mobile Number:</label>
                <input  type="number" name="phone" value={formData.phone} onChange={handleChange} disabled={disableBtn} className="form-control"/>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12 col-lg-6 col-xl-6 col-xxl-6">
                <label>Subject:</label>
                <input  type="text" name="query" value={formData.query} onChange={handleChange} disabled={disableBtn} required className="form-control"/>
              </div>
            </div>
            <div className="col-md-12  col-sm-12  col-xs-12 col-lg-12  col-xl-12  col-xxl-12 marg-per-t-2">
              <label>Message:</label>
              <textarea  name="message" value={formData.message} onChange={handleChange} disabled={disableBtn} required className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary marg-per-t-3">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}