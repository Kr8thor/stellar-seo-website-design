
import React from 'react';
import OpenGraphImageGenerator from '@/components/admin/OpenGraphImageGenerator';
import { useSEO } from '@/hooks/useSEO';

const Admin = () => {
  useSEO({
    title: "Admin - Marden SEO",
    description: "Administrative tools for Marden SEO website management",
    noIndex: true
  });

  return (
    <main className="pt-24 pb-16 px-4 md:px-8 min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Admin Tools
          </h1>
          <p className="text-xl text-slate-600">
            Website management and content generation tools
          </p>
        </div>

        <div className="space-y-8">
          <OpenGraphImageGenerator />
        </div>
      </div>
    </main>
  );
};

export default Admin;
