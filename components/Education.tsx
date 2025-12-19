import React from 'react';
import { GraduationCap, School, Calendar, BookOpen, Award, Briefcase } from 'lucide-react';
import { EDUCATION } from '../constants';
import { Education as EducationType } from '../types';

const Education: React.FC = () => {
  const formalEducation = EDUCATION.filter(e => e.category === 'formal');
  const additionalLearning = EDUCATION.filter(e => e.category === 'additional');

  const getIcon = (type: EducationType['type']) => {
    switch (type) {
      case 'college': return <GraduationCap className="text-indigo-600 dark:text-indigo-400" size={24} />;
      case 'school': return <School className="text-blue-600 dark:text-blue-400" size={24} />;
      case 'internship': return <Briefcase className="text-emerald-600 dark:text-emerald-400" size={24} />;
      case 'certification': return <Award className="text-amber-600 dark:text-amber-400" size={24} />;
      default: return <BookOpen className="text-slate-600 dark:text-slate-400" size={24} />;
    }
  };

  const getBgColor = (type: EducationType['type']) => {
    switch (type) {
      case 'college': return 'bg-indigo-100 dark:bg-indigo-900/30';
      case 'school': return 'bg-blue-100 dark:bg-blue-900/30';
      case 'internship': return 'bg-emerald-100 dark:bg-emerald-900/30';
      case 'certification': return 'bg-amber-100 dark:bg-amber-900/30';
      default: return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  const EducationCard = ({ edu }: { edu: EducationType }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-start gap-4">
      <div className={`p-3 rounded-xl shrink-0 ${getBgColor(edu.type)}`}>
        {getIcon(edu.type)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{edu.institution}</h4>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full shrink-0">
            <Calendar size={12} />
            {edu.period}
          </div>
        </div>
        <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">{edu.qualification}</p>
        {edu.description && (
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
            {edu.description}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section id="education" className="py-20 bg-slate-50 dark:bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-4 mb-12 max-w-6xl mx-auto">
          <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-2xl">
            <BookOpen className="text-teal-600 dark:text-teal-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Education & Learning</h2>
            <div className="w-20 h-1.5 bg-teal-600 rounded-full mt-4"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Formal Education Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-slate-400" size={24} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wide">Formal Education</h3>
            </div>
            
            <div className="relative pl-6 border-l-2 border-indigo-200 dark:border-slate-800 space-y-8">
              {formalEducation.map((edu, idx) => (
                <div key={idx} className="relative">
                   <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full border-4 border-white dark:border-slate-950 bg-indigo-500"></div>
                   <EducationCard edu={edu} />
                </div>
              ))}
            </div>
          </div>

          {/* Additional Learning Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-slate-400" size={24} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wide">Additional Learning</h3>
            </div>
            
            <div className="relative pl-6 border-l-2 border-amber-200 dark:border-slate-800 space-y-8">
               {additionalLearning.map((edu, idx) => (
                <div key={idx} className="relative">
                   <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full border-4 border-white dark:border-slate-950 bg-amber-500"></div>
                   <EducationCard edu={edu} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;