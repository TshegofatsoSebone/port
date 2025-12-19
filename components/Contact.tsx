import React, { useState } from 'react';
import { Mail, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { PORTFOLIO_DATA, SOCIALS } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Construct mailto link
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      
      // Open email client
      window.location.href = `mailto:paledisebene@gmail.com?subject=${subject}&body=${body}`;
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Get in <span className="text-indigo-600">Touch</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss modern web technologies? Fill out the form below to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Card */}
          <div className="space-y-8">
            <div className="bg-slate-50 dark:bg-slate-800 p-8 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-700 h-fit">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Email Me</h4>
                    <a href={`mailto:${PORTFOLIO_DATA.email}`} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {PORTFOLIO_DATA.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Location</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {PORTFOLIO_DATA.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {SOCIALS.map(social => (
                    <a 
                      key={social.platform} 
                      href={social.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-3 bg-white dark:bg-slate-900 rounded-full text-slate-600 dark:text-slate-400 hover:text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 shadow-sm transition-all hover:scale-110"
                      aria-label={social.platform}
                    >
                      <span className="font-bold text-xs">{social.platform[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            {isSubmitted ? (
              <div className="absolute inset-0 bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Ready!</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Your email client should have opened with the message. If not, please email me directly at <br/>
                  <span className="font-semibold text-indigo-600">{PORTFOLIO_DATA.email}</span>
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name..."
                      className={`
                        w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 
                        border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'} 
                        text-slate-900 dark:text-white placeholder-slate-400
                        focus:outline-none focus:ring-2 transition-all
                      `}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <div className="absolute right-3 top-3.5 text-red-500 pointer-events-none">
                        <AlertCircle size={18} />
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email Address..."
                      className={`
                        w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 
                        border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'} 
                        text-slate-900 dark:text-white placeholder-slate-400
                        focus:outline-none focus:ring-2 transition-all
                      `}
                      aria-invalid={!!errors.email}
                    />
                     {errors.email && (
                      <div className="absolute right-3 top-3.5 text-red-500 pointer-events-none">
                        <AlertCircle size={18} />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message..."
                    rows={5}
                    className={`
                      w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 
                      border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'} 
                      text-slate-900 dark:text-white placeholder-slate-400
                      focus:outline-none focus:ring-2 transition-all resize-y
                    `}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-4 px-6 rounded-xl font-bold text-white
                    flex items-center justify-center gap-2
                    transition-all transform hover:-translate-y-1 hover:shadow-lg
                    ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Preparing Email...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;