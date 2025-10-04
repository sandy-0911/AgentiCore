
import React from 'react';
import { SparklesIcon } from './Icons';

const Loader: React.FC = () => {
  return (
    <div className="flex items-start gap-3 my-2 self-start">
        <SparklesIcon className="w-6 h-6 text-fuchsia-400 animate-pulse" />
        <div className="max-w-xl p-3 rounded-lg shadow-lg bg-gray-800/60 border border-fuchsia-500/30 flex items-center space-x-1.5">
            <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse"></div>
        </div>
    </div>
  );
};

export default Loader;
