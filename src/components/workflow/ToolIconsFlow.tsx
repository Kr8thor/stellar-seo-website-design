
import React from 'react';

interface ToolIcon {
  name: string;
  icon: string;
  isPrimary?: boolean;
}

const ToolIconsFlow = () => {
  const toolIcons: ToolIcon[] = [
    { name: "n8n", icon: "/icons/n8n-logo.svg", isPrimary: true },
    { name: "Claude AI", icon: "/icons/claude-logo.svg" },
    { name: "Cursor", icon: "/icons/cursor-logo.svg" },
    { name: "Zapier", icon: "/icons/zapier-logo.svg" },
    { name: "Make.com", icon: "/icons/make-logo.svg" },
    { name: "Airtable", icon: "/icons/airtable-logo.svg" },
    { name: "Notion", icon: "/icons/notion-logo.svg" },
  ];

  return (
    <div className="relative py-8">
      {/* Connection lines in the background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-4/5 h-4/5 rounded-full border-2 border-dashed border-purple-400"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-3/5 h-3/5 rounded-full border-2 border-dashed border-pink-400"></div>
      </div>
      
      {/* Centered primary n8n logo */}
      <div className="relative flex justify-center mb-8 z-10">
        <div className="w-48 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
          <img 
            src="/icons/n8n-logo.svg" 
            alt="n8n" 
            className="w-32 transition-transform hover:scale-110"
          />
        </div>
      </div>
      
      {/* Orbital ring of secondary tools */}
      <div className="relative flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {toolIcons.filter(icon => !icon.isPrimary).map((icon, index) => (
          <div 
            key={icon.name}
            className="w-32 h-20 bg-white/70 backdrop-blur-sm rounded-lg flex items-center justify-center p-3 transition-all hover:shadow-md hover:-translate-y-1"
          >
            <img 
              src={icon.icon} 
              alt={icon.name} 
              className="w-24 opacity-70 hover:opacity-100 transition-opacity" 
            />
          </div>
        ))}
      </div>
      
      {/* Small connecting nodes */}
      <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
    </div>
  );
};

export default ToolIconsFlow;
