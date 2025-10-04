
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { GpuStatus } from '../types';

interface GpuMetricsChartProps {
  data: GpuStatus;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/80 border border-cyan-400/50 p-2 rounded-md text-sm">
          <p className="label text-cyan-300">{`${label} : ${payload[0].value}${payload[0].unit || ''}`}</p>
        </div>
      );
    }
    return null;
};

const GpuMetricsChart: React.FC<GpuMetricsChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Temp (°C)', value: data.temperature, fill: '#22d3ee' },
    { name: 'Util (%)', value: data.utilization, fill: '#a3e635' },
    { name: 'VRAM (MB)', value: data.memoryUsed, fill: '#d946ef' },
  ];

  return (
    <div className="w-full h-64 p-2 bg-black/30 rounded-lg">
      <h4 className="text-sm font-semibold text-cyan-300 mb-2">{data.name} Status</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
          <XAxis dataKey="name" stroke="#67e8f9" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#67e8f9" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.1)'}}/>
          <Bar dataKey="value" barSize={40} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GpuMetricsChart;
