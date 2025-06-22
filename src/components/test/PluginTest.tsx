
import React from 'react';

// Simple test component to verify componentTagger plugin is working
const PluginTest = () => {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg m-4">
      <h2 className="text-xl font-semibold text-blue-800 mb-2">
        Plugin Test Component
      </h2>
      <p className="text-blue-600">
        This component should have data-lov-* attributes if the plugin is working.
        Check the DOM inspector to see if these attributes are present.
      </p>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Test Button
      </button>
    </div>
  );
};

export default PluginTest;
