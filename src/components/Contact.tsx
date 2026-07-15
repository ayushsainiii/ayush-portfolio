import React, { useState, useEffect } from "react";
import { Mail, MapPin, Calendar, Check, Send, Sparkles, Copy, Loader2, AlertCircle, Inbox, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data/portfolioData";

export default function Contact() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  // Local Inquiry Monitoring State
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [configStatus, setConfigStatus] = useState({
    hasWeb3FormsKey: false,
    web3FormsKey: "",
    email: ""
  });

  const fetchConfigStatus = async () => {
    try {
      const response = await fetch("/api/config");
      const data = await response.json();
      if (data.success) {
        setConfigStatus({
          hasWeb3FormsKey: data.hasWeb3FormsKey,
          web3FormsKey: data.web3FormsKey || "",
          email: data.email
        });
      }
    } catch (error) {
      console.error("Error fetching config status:", error);
    }
  };

  const fetchLocalMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      const data = await response.json();
      if (data.success) {
        setLocalMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching local messages:", error);
    }
  };

  const deleteLocalMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setLocalMessages(prev => prev.filter(m => m.id !== id));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    fetchLocalMessages();
    fetchConfigStatus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on input
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = { name: "", email: "", subject: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please specify a valid email address";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject line is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message body is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccessMessage("");

    // 1. Save Locally
    let savedLocally = false;
    try {
      const localResponse = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const localData = await localResponse.json();
      if (localData.success) {
        savedLocally = true;
      }
    } catch (err) {
      console.error("Local save failed:", err);
    }

    // 2. Client-Side Web3Forms Submit
    let emailSent = false;
    let emailError = "";

    if (configStatus.hasWeb3FormsKey && configStatus.web3FormsKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            access_key: configStatus.web3FormsKey,
            from_name: formData.name,
            subject: `Portfolio Contact: ${formData.subject}`,
            name: formData.name,
            email: formData.email,
            message: `Subject: ${formData.subject}\nFrom: ${formData.name} (${formData.email})\n\nMessage Details:\n${formData.message}`,
          }),
        });

        const data = await response.json();
        if (data.success) {
          emailSent = true;
        } else {
          emailError = data.message || "Failed to deliver email";
        }
      } catch (err: any) {
        emailError = err.message || "Network error reaching Web3Forms API";
      }
    }

    setIsSubmitting(false);

    if (savedLocally || emailSent) {
      setSubmitSuccess(true);
      
      let successMsg = "";
      if (emailSent) {
        successMsg = "Your message has been sent directly to Ayush's inbox and stored in the live logs!";
      } else if (configStatus.hasWeb3FormsKey) {
        successMsg = `Message logged locally, but direct email delivery failed: ${emailError}. Please check your Access Key settings.`;
      } else {
        successMsg = "Your message was successfully registered in the secure local logs database.";
      }
      
      setSubmitSuccessMessage(successMsg);
      setFormData({ name: "", email: "", subject: "", message: "" });
      fetchLocalMessages(); // Update local logs list immediately
    } else {
      setFormErrors(prev => ({
        ...prev,
        message: "Unable to process message transmission. Please check your internet connection."
      }));
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 3000);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12 bg-cream relative overflow-hidden"
    >
      {/* Dynamic Background Circle Accent */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-biscuit/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Bold Headers & Personal Info details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-bronze block mb-2">
                Get In Touch
              </span>
              
              {/* Giant Stacked Title */}
              <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-[5vw] leading-none text-charcoal tracking-tight">
                LET’S BUILD <br />
                SOMETHING <br />
                <span className="text-bronze">TOGETHER</span>
              </h2>
            </div>

            <p className="text-sepia text-base md:text-lg max-w-md leading-relaxed font-sans">
              I am currently open to frontend development, React development, MERN stack, and software development opportunities in Noida or remote configurations.
            </p>

            {/* Direct Information Badges */}
            <div className="space-y-4 pt-6 max-w-sm">
              
              {/* Copyable Email Row */}
              <div className="p-4 bg-paper rounded-2xl border border-clay-border flex items-center justify-between shadow-sm group hover:border-bronze transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cream rounded-xl text-bronze border border-clay-border/50">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia">EMAIL ADDRESS</span>
                    <span className="text-sm font-semibold text-charcoal select-all font-mono">
                      {personalInfo.email}
                    </span>
                  </div>
                </div>
                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-cream hover:bg-charcoal hover:text-cream text-charcoal transition-all duration-200"
                  title="Copy email to clipboard"
                >
                  {emailCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Row */}
              <div className="p-4 bg-paper rounded-2xl border border-clay-border flex items-center gap-3 shadow-sm hover:border-bronze transition-all duration-300">
                <div className="p-2.5 bg-cream rounded-xl text-bronze border border-clay-border/50">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia">PREFFERED REGION</span>
                  <span className="text-sm font-semibold text-charcoal uppercase">
                    {personalInfo.location}
                  </span>
                </div>
              </div>

              {/* Status Row */}
              <div className="p-4 bg-paper rounded-2xl border border-clay-border flex items-center gap-3 shadow-sm hover:border-bronze transition-all duration-300">
                <div className="p-2.5 bg-cream rounded-xl text-emerald-600 border border-clay-border/50">
                  <Calendar className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia">AVAILABILITY</span>
                  <span className="text-sm font-semibold text-charcoal uppercase">
                    Immediate / Open to Work
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Premium Active Form Container */}
          <div className="lg:col-span-7">
            <div className="bg-paper rounded-3xl p-8 border border-clay-border shadow-xl relative overflow-hidden">
              
              {/* Loading & Submit Success overlays */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-paper/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6"
                    >
                      <Check className="w-8 h-8" strokeWidth={3} />
                    </motion.div>
                    <h3 className="font-bebas text-4xl text-charcoal tracking-wide uppercase">
                      MESSAGE RECEIVED!
                    </h3>
                    <p className="text-sm text-sepia font-mono tracking-wider uppercase mt-1">
                      Thanks for reaching out, Ayush Saini will reply shortly.
                    </p>
                    <p className="text-xs text-taupe max-w-sm mt-4 font-sans leading-relaxed">
                      {submitSuccessMessage || "A copy of this inquiry has been registered in the developer console. Ayush will receive your correspondence directly via secure email integration."}
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-8 px-6 py-2.5 bg-charcoal text-cream rounded-full uppercase font-mono tracking-widest text-xs hover:bg-bronze transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Standard HTML Form with Keyboard Support */}
              <form id="contact-form" onSubmit={handleFormSubmit} className="space-y-6">
                <div className="border-b border-clay-border pb-4 mb-2 flex items-center justify-between">
                  <h3 className="font-bebas text-2xl text-charcoal tracking-wider uppercase flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-bronze" />
                    Secure Correspondence
                  </h3>
                  <span className="text-[10px] font-mono text-sepia uppercase">
                    Validated Form
                  </span>
                </div>

                {/* Name Field */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest font-mono font-bold text-charcoal">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-cream border font-sans text-sm text-charcoal placeholder-sepia/50 focus:bg-paper focus:ring-2 focus:ring-bronze focus:border-transparent transition-all duration-300 outline-none ${
                      formErrors.name ? "border-rose-500/60 ring-1 ring-rose-500/20" : "border-clay-border/60"
                    }`}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="text-rose-500 text-xs font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest font-mono font-bold text-charcoal">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-cream border font-sans text-sm text-charcoal placeholder-sepia/50 focus:bg-paper focus:ring-2 focus:ring-bronze focus:border-transparent transition-all duration-300 outline-none ${
                      formErrors.email ? "border-rose-500/60 ring-1 ring-rose-500/20" : "border-clay-border/60"
                    }`}
                  />
                  {formErrors.email && (
                    <p id="email-error" className="text-rose-500 text-xs font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs uppercase tracking-widest font-mono font-bold text-charcoal">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can Ayush support your project?"
                    aria-invalid={!!formErrors.subject}
                    aria-describedby={formErrors.subject ? "subject-error" : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-cream border font-sans text-sm text-charcoal placeholder-sepia/50 focus:bg-paper focus:ring-2 focus:ring-bronze focus:border-transparent transition-all duration-300 outline-none ${
                      formErrors.subject ? "border-rose-500/60 ring-1 ring-rose-500/20" : "border-clay-border/60"
                    }`}
                  />
                  {formErrors.subject && (
                    <p id="subject-error" className="text-rose-500 text-xs font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest font-mono font-bold text-charcoal">
                    Message Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please details your software requirement or query here..."
                    aria-invalid={!!formErrors.message}
                    aria-describedby={formErrors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-cream border font-sans text-sm text-charcoal placeholder-sepia/50 focus:bg-paper focus:ring-2 focus:ring-bronze focus:border-transparent transition-all duration-300 outline-none resize-none ${
                      formErrors.message ? "border-rose-500/60 ring-1 ring-rose-500/20" : "border-clay-border/60"
                    }`}
                  />
                  {formErrors.message && (
                    <p id="message-error" className="text-rose-500 text-xs font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Action Button */}
                <button
                  id="submit-contact-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-charcoal text-cream rounded-xl text-xs uppercase tracking-widest font-mono hover:bg-bronze transition-colors duration-300 flex items-center justify-center gap-2 shadow disabled:opacity-80 disabled:cursor-not-allowed group scale-100 hover:scale-[1.01] active:scale-95 transition-transform"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cream" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

        {/* Dynamic Full-Stack Developer Console - Live Inquiry Logs */}
        <div className="mt-16 pt-12 border-t border-clay-border/40">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-bebas text-2xl text-charcoal tracking-wide uppercase flex items-center gap-2 justify-center sm:justify-start">
                <Inbox className="w-5 h-5 text-bronze animate-pulse" />
                Live Inbox Logs
              </h4>
              <p className="text-xs font-mono text-sepia mt-1 uppercase tracking-wider">
                Verify transmission status instantly. All messages are stored securely on the Express server.
              </p>
            </div>
            <button
              onClick={() => {
                setIsInboxOpen(!isInboxOpen);
                fetchLocalMessages();
              }}
              className="px-5 py-2.5 rounded-xl border border-charcoal/20 bg-cream hover:bg-charcoal hover:text-cream text-charcoal font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-bronze"
            >
              <span>{isInboxOpen ? "Hide Log" : `Show Log (${localMessages.length})`}</span>
              <span className={`w-2 h-2 rounded-full ${localMessages.length > 0 ? "bg-emerald-500 animate-pulse" : "bg-sepia/40"}`} />
            </button>
          </div>

          <AnimatePresence>
            {isInboxOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {!configStatus.hasWeb3FormsKey && (
                    <div className="col-span-full mb-2 p-5 rounded-2xl border border-bronze/20 bg-amber-500/5 text-charcoal">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-bronze shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs uppercase font-mono font-bold text-charcoal tracking-wider">
                            Email Delivery Setup Required (ईमेल प्राप्त करने के लिए निर्देश)
                          </h5>
                          <p className="text-xs text-sepia mt-2 leading-relaxed font-sans">
                            आपके संदेश नीचे <strong>"Live Inbox Logs"</strong> में सुरक्षित सेव हो रहे हैं! लेकिन इन्हें अपने असली जीमेल (<strong>{configStatus.email || "ayushsaini13january@gmail.com"}</strong>) पर प्राप्त करने के लिए यह आसान कदम उठाएं:
                          </p>
                          <ul className="list-disc list-inside text-xs text-sepia/90 mt-3 space-y-2 ml-1 font-sans">
                            <li>
                              <strong>1. Access Key लें:</strong> <a href="https://web3forms.com/" target="_blank" rel="noreferrer" className="text-bronze underline font-bold">web3forms.com</a> पर जाएं, अपना जीमेल डालें और अपनी <strong>Access Key</strong> तुरंत ईमेल पर पाएं (यह 100% फ्री है).
                            </li>
                            <li>
                              <strong>2. Secrets में जोड़ें:</strong> AI Studio के बाएं (left) साइडबार में <strong>Secrets (Key 🔑 आइकन)</strong> पर क्लिक करें.
                            </li>
                            <li>
                              <strong>3. नाम और वैल्यू भरें:</strong> नया सीक्रेट बनाएं जिसका नाम <strong>WEB3FORMS_ACCESS_KEY</strong> हो, और वैल्यू में अपनी ईमेल वाली चाबी (Access Key) पेस्ट कर दें.
                            </li>
                            <li>
                              <strong>4. रीस्टार्ट करें:</strong> बस! इसके बाद आपके सभी संदेश सीधे आपके जीमेल इनबॉक्स में आने लगेंगे.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {localMessages.length === 0 ? (
                    <div className="col-span-full py-12 px-6 rounded-2xl border border-dashed border-clay-border/60 bg-paper text-center">
                      <p className="font-mono text-xs text-sepia uppercase tracking-widest">
                        No inquiries received yet. Submit the form above to see your message appear here in real-time!
                      </p>
                    </div>
                  ) : (
                    localMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        layout
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="p-6 bg-paper rounded-2xl border border-clay-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative group"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-3 border-b border-clay-border/40 pb-3">
                            <div>
                              <h5 className="font-bold text-charcoal text-sm">{msg.name}</h5>
                              <p className="text-xs font-mono text-sepia">{msg.email}</p>
                            </div>
                            <span className="text-[10px] font-mono text-taupe whitespace-nowrap">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase text-bronze font-bold block">
                              Subject: {msg.subject}
                            </span>
                            <p className="text-xs text-charcoal leading-relaxed whitespace-pre-wrap">
                              {msg.message}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-clay-border/40 flex justify-between items-center">
                          <span className="text-[9px] font-mono text-taupe uppercase tracking-widest">
                            ID: {msg.id}
                          </span>
                          <button
                            onClick={() => deleteLocalMessage(msg.id)}
                            className="p-1.5 rounded-lg text-taupe hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete inquiry from server log"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
