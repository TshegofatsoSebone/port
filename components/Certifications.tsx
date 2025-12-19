import React, { useState } from 'react';
import { Award, CheckCircle, ExternalLink, X, Eye, BookOpen, Brain, ShieldCheck, Code, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { CERTIFICATIONS } from '../constants';
import { Certificate } from '../types';

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // Group logic
  const groups = {
    'Generative AI & Advanced AI': CERTIFICATIONS.filter(c => c.category === 'Generative AI'),
    'AI Foundations & Specializations': CERTIFICATIONS.filter(c => c.category === 'Foundations'),
    'Responsible & Ethical AI': CERTIFICATIONS.filter(c => c.category === 'Ethics'),
    'Development & Implementation': CERTIFICATIONS.filter(c => c.category === 'Development'),
  };

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Generative AI': return <Brain className="text-purple-500" size={24} />;
      case 'Foundations': return <BookOpen className="text-blue-500" size={24} />;
      case 'Ethics': return <ShieldCheck className="text-emerald-500" size={24} />;
      case 'Development': return <Code className="text-amber-500" size={24} />;
      default: return <Award className="text-indigo-500" size={24} />;
    }
  };

  const getIssuerLogo = (issuer: string) => {
    const lower = issuer.toLowerCase();
    if (lower.includes('google')) return <i className="devicon-google-plain colored text-2xl"></i>;
    if (lower.includes('aws') || lower.includes('amazon')) return <i className="devicon-amazonwebservices-plain-wordmark colored text-2xl"></i>;
    if (lower.includes('ibm')) return <span className="font-bold text-blue-600 tracking-tighter text-xl">IBM</span>;
    if (lower.includes('microsoft') || lower.includes('azure')) return <i className="devicon-azure-plain colored text-2xl"></i>;
    if (lower.includes('intel')) return <span className="font-bold text-blue-400 text-xl">intel</span>;
    if (lower.includes('python')) return <i className="devicon-python-plain colored text-2xl"></i>;
    return <Award className="text-slate-400" size={24} />;
  };

  return (
    <section id="certifications" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-4 mb-16 max-w-6xl mx-auto">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
            <Award className="text-indigo-600 dark:text-indigo-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">AI/ML Certifications</h2>
            <div className="w-20 h-1.5 bg-indigo-600 rounded-full mt-4"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl">
              Specialized professional certifications acquired to master the latest advancements in Artificial Intelligence, Large Language Models, and Ethical AI.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {Object.entries(groups).map(([groupName, certs]) => {
            const isExpanded = expandedGroups[groupName];
            // Show only first 3 certifications (half-way) if not expanded
            const displayedCerts = isExpanded ? certs : certs.slice(0, 3);
            const hasMore = certs.length > 3;

            return (
              <div key={groupName} className="relative">
                <div className="flex items-center justify-between mb-6 sticky top-20 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur py-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      {getCategoryIcon(certs[0]?.category || '')}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{groupName}</h3>
                  </div>
                  {hasMore && (
                    <button 
                      onClick={() => toggleGroup(groupName)}
                      className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      {isExpanded ? (
                        <>Show Less <ChevronUp size={16} /></>
                      ) : (
                        <>View All ({certs.length}) <ChevronDown size={16} /></>
                      )}
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedCerts.map((cert) => (
                    <div 
                      key={cert.id} 
                      className="group bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>

                       <div className="flex items-start justify-between mb-4 relative z-10">
                          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                             {getIssuerLogo(cert.issuer)}
                          </div>
                          {/* Date removed from main card as requested */}
                       </div>
                       
                       <h4 className="font-bold text-slate-900 dark:text-white leading-tight mb-2 h-12 line-clamp-2 relative z-10">
                          {cert.title}
                       </h4>
                       
                       <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 relative z-10">
                          {cert.issuer}
                       </p>
                       
                       <div className="relative z-10">
                          <button 
                             onClick={() => setSelectedCert(cert)}
                             className="w-full py-2.5 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
                          >
                             <Eye size={16} /> Preview Credential
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Modal - Shows the FULL certification details */}
      {selectedCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
             className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
             onClick={() => setSelectedCert(null)}
          ></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-200">
             
             {/* Modal Header */}
             <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white pr-8">{selectedCert.title}</h3>
                   <div className="flex items-center gap-2 mt-1">
                      <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">{selectedCert.issuer}</p>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{selectedCert.date}</p>
                   </div>
                </div>
                <button 
                   onClick={() => setSelectedCert(null)}
                   className="p-2 bg-white dark:bg-slate-800 text-slate-500 hover:text-red-500 rounded-full shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                   <X size={20} />
                </button>
             </div>

             {/* Modal Content */}
             <div className="p-8 bg-slate-100 dark:bg-black/20 flex flex-col items-center justify-center min-h-[300px] text-center">
                {selectedCert.imageUrl ? (
                   <img src={selectedCert.imageUrl} alt={selectedCert.title} className="max-w-full h-auto rounded-lg shadow-lg" />
                ) : (
                   <div className="w-full aspect-[4/3] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-1 shadow-inner flex flex-col items-center justify-center relative overflow-hidden text-white">
                      <div className="absolute top-0 left-0 w-full h-full opacity-20">
                         <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
                         <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-300 blur-3xl"></div>
                      </div>
                      
                      <div className="relative z-10 p-8 border-4 border-white/20 rounded-xl w-[90%] h-[85%] flex flex-col items-center justify-center bg-white/10 backdrop-blur-md">
                         <Award size={64} className="mb-4 text-white/90" />
                         <h4 className="text-2xl font-serif font-bold mb-2 tracking-wide uppercase">Certificate of Completion</h4>
                         
                         <div className="w-16 h-1 bg-white/50 rounded-full mb-6"></div>
                         
                         <h2 className="text-xl md:text-2xl font-bold mb-2 max-w-lg">{selectedCert.title}</h2>
                         <p className="text-lg text-white/90">Issued by {selectedCert.issuer}</p>
                         <p className="mt-6 text-sm font-mono bg-black/20 px-4 py-1 rounded-full">{selectedCert.date}</p>
                      </div>
                   </div>
                )}
                
                <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 italic flex items-center gap-2">
                   <CheckCircle size={14} className="text-green-500" />
                   Verified professional credential for {selectedCert.title}.
                </p>
             </div>

             {/* Modal Footer */}
             <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                {selectedCert.credentialUrl && (
                  <a 
                    href={selectedCert.credentialUrl}
                    download={`${selectedCert.title.replace(/\s+/g, '_')}_Certificate.pdf`}
                    className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-xl flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Download size={16} /> Download PDF
                  </a>
                )}
                <a 
                  href={selectedCert.credentialUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20"
                >
                  Verify Authenticity <ExternalLink size={16} />
                </a>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;