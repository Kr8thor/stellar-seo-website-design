
import React from 'react';
import { motion } from 'framer-motion';

interface ToolIconProps {
  name: string;
  imagePath: string;
  delay?: number;
}

const ToolIcon: React.FC<ToolIconProps> = ({ name, imagePath, delay = 0 }) => {
  return (
    <motion.div 
      className="tool-icon group relative"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: delay }}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 p-3 transition-all duration-200 group-hover:shadow-md group-hover:scale-105 group-hover:border-primary/20">
        <img 
          src={imagePath} 
          alt={`${name} logo`} 
          className="w-full h-full object-contain"
        />
      </div>
      <motion.div 
        className="absolute -z-10 inset-0 bg-primary/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{name}</span>
    </motion.div>
  );
};

const ToolIconsFlow: React.FC = () => {
  const tools = [
    { name: "n8n", path: "/icons/n8n-logo.svg" },
    { name: "Make", path: "/icons/make-logo.svg" },
    { name: "Cursor", path: "/icons/cursor-logo.svg" },
    { name: "Zapier", path: "/icons/zapier-logo.svg" },
    { name: "Notion", path: "/icons/notion-logo.svg" },
    { name: "Airtable", path: "/icons/airtable-logo.svg" },
    { name: "Claude", path: "/icons/claude-logo.svg" },
    { name: "GitHub", path: "/icons/github-logo.svg" },
  ];

  return (
    <div className="w-full relative py-8">
      {/* Curved path in background */}
      <div className="absolute top-1/2 left-0 w-full h-1/2 -translate-y-1/2 z-0 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path 
            d="M0,50 Q300,90 600,50 T1200,50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeDasharray="6,4" 
            className="text-primary/30"
          />
        </svg>
      </div>
      
      {/* Tool icons */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative z-10">
        {tools.map((tool, index) => (
          <ToolIcon 
            key={tool.name} 
            name={tool.name} 
            imagePath={tool.path}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolIconsFlow;
