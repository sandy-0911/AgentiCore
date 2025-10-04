
import type { FunctionCall } from '@google/genai';

export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  TOOL = 'tool',
}

export interface GpuStatus {
  name: string;
  temperature: number;
  utilization: number;
  memoryUsed: number;
  memoryTotal: number;
}

export type MessageContent = string | { functionCall: FunctionCall } | { toolResult: any } | { gpuStatus: GpuStatus };

export interface Message {
  id: string;
  role: MessageRole;
  content: MessageContent;
}
