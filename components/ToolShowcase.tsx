
import React from 'react';
import { CpuChipIcon, ChartBarIcon, CodeBracketIcon } from './Icons';

const tools = [
  {
    name: 'GPU Resource Monitor',
    description: 'Access real-time GPU metrics like temperature, utilization, and memory usage.',
    icon: <CpuChipIcon className="w-8 h-8 text-cyan-400" />,
    color: 'cyan'
  },
  {
    name: 'Model Performance Estimator',
    description: 'Estimate VRAM needs and inference speeds for popular AI models.',
    icon: <ChartBarIcon className="w-8 h-8 text-fuchsia-400" />,
    color: 'fuchsia'
  },
  {
    name: 'Code Executor',
    description: 'Safely run simple code snippets and get immediate results.',
    icon: <CodeBracketIcon className="w-8 h-8 text-lime-400" />,
    color: 'lime'
  }
];

const ToolShowcase: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-cyan-300 mb-4" style={{ textShadow: '0 0 5px #67e8f9' }}>
        Agent Capabilities
      </h2>
      <div className="space-y-4">
        {tools.map((tool) => (
          <div key={tool.name} className={`bg-gray-800/50 p-4 rounded-lg border border-${tool.color}-500/30 hover:border-${tool.color}-500/70 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(var(--tw-shadow-color),0.4)]`} style={{ '--tw-shadow-color': `var(--tw-color-${tool.color}-500)` } as React.CSSProperties}>
            <div className="flex items-center gap-4">
              <div className={`p-2 bg-gray-900 rounded-full border border-${tool.color}-500/50`}>
                {tool.icon}
              </div>
              <div>
                <h3 className={`text-lg font-semibold text-${tool.color}-300`}>{tool.name}</h3>
                <p className="text-sm text-gray-400">{tool.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-auto text-xs text-gray-500 text-center pt-4">
        Ask me things like: "What's my GPU status?" or "Estimate performance for Llama2-7B".
      </p>
    </div>
  );
};

export default ToolShowcase;
