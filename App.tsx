
import React from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import ToolShowcase from './components/ToolShowcase';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4 overflow-hidden">
        <aside className="lg:w-1/3 xl:w-1/4 bg-gray-900/50 border border-cyan-500/20 rounded-lg p-4 shadow-[0_0_15px_rgba(0,255,255,0.1)] overflow-y-auto">
          <ToolShowcase />
        </aside>
        <div className="flex-grow lg:w-2/3 xl:w-3/4 flex flex-col">
          <ChatInterface />
        </div>
      </main>
    </div>
  );
};

export default App;
