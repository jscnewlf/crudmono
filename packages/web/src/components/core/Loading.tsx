import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-softblue-400"></div>
    </div>
  );
};

export default Loading;
