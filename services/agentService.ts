
import { GoogleGenAI, FunctionDeclaration, Type, GenerateContentResponse, Content } from '@google/genai';
import type { GpuStatus } from '../types';

// IMPORTANT: In a real application, the API key must be stored securely
// and not hardcoded. The instructions mandate using process.env.API_KEY.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

// --- Tool Implementations (Mocked for Browser Environment) ---

const tools = {
  async getGPUStatus(): Promise<GpuStatus> {
    // This is a mock function as we cannot run `nvidia-smi` in the browser.
    // It returns randomized data to simulate a real GPU.
    console.log("TOOL EXECUTED: getGPUStatus");
    return {
      name: "Simulated RTX 4090",
      temperature: Math.floor(Math.random() * 30) + 50, // 50-80 C
      utilization: Math.floor(Math.random() * 80) + 10, // 10-90 %
      memoryUsed: Math.floor(Math.random() * 12000) + 4000, // 4-16 GB
      memoryTotal: 24576, // 24 GB
    };
  },
  async estimateModelPerformance({ model_name }: { model_name: string }): Promise<string> {
    console.log(`TOOL EXECUTED: estimateModelPerformance with model: ${model_name}`);
    const modelDb: { [key: string]: string } = {
      'resnet50': 'Requires ~2.5GB VRAM. Estimated speed on a high-end GPU: ~500 images/sec.',
      'llama2-7b': 'Requires ~8GB VRAM for 4-bit quantization. Estimated speed on a high-end GPU: ~40 tokens/sec.',
      'stable-diffusion-xl': 'Requires ~12GB VRAM. Estimated speed on a high-end GPU: ~2 iterations/sec.',
    };
    return modelDb[model_name.toLowerCase()] || `Model '${model_name}' not found in our database. Common models are ResNet50, Llama2-7B, Stable-Diffusion-XL.`;
  },
  async executeCode({ code }: { code: string }): Promise<string> {
    console.log(`TOOL EXECUTED: executeCode with code: ${code}`);
    // In a real backend, this would use a secure sandbox.
    // Here, we simulate it for specific safe commands.
    if (code.trim() === '1 + 1') {
      return "Output: 2";
    }
    if (code.trim().toLowerCase() === "'hello'.touppercase()") {
        return "Output: 'HELLO'";
    }
    return "Execution of arbitrary code is disabled in this browser-based demo for security reasons. Only simple, predefined snippets are allowed.";
  },
};

// --- Gemini Function Declarations ---

const getGpuStatusDeclaration: FunctionDeclaration = {
  name: 'getGPUStatus',
  description: "Get the current status of the user's GPU, including temperature, utilization, and memory usage.",
  parameters: { type: Type.OBJECT, properties: {} }
};

const estimateModelPerformanceDeclaration: FunctionDeclaration = {
  name: 'estimateModelPerformance',
  description: "Estimate the VRAM requirements and inference speed for a given AI model on a typical high-end GPU.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      model_name: {
        type: Type.STRING,
        description: 'The name of the AI model, e.g., "ResNet50", "Llama2-7B".'
      }
    },
    required: ['model_name']
  }
};

const executeCodeDeclaration: FunctionDeclaration = {
  name: 'executeCode',
  description: "Safely execute a small, non-malicious snippet of code and return its output.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      code: {
        type: Type.STRING,
        description: 'The code snippet to execute.'
      }
    },
    required: ['code']
  }
};

const systemInstruction = `You are AgentiCore, a powerful AI agent. You have access to specialized tools to help users.
- Use getGPUStatus to check system hardware details.
- Use estimateModelPerformance to provide insights on AI model requirements.
- Use executeCode for simple computations.
- When you use getGPUStatus, after getting the result, present the key metrics clearly and tell the user you are generating a visual chart.
- For general conversation, answer directly. Be helpful and concise.`;

export async function runAgent(
  userMessage: string,
  history: Content[],
  updateCallback: (role: 'model' | 'tool', content: any) => void
) {
  const currentHistory: Content[] = [...history, { role: 'user', parts: [{ text: userMessage }] }];

  try {
    let response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: currentHistory,
      config: {
        systemInstruction: systemInstruction,
        tools: [{
          functionDeclarations: [getGpuStatusDeclaration, estimateModelPerformanceDeclaration, executeCodeDeclaration]
        }],
      },
    });

    while (response.functionCalls && response.functionCalls.length > 0) {
      const fc = response.functionCalls[0];
      updateCallback('model', { functionCall: fc });
      
      currentHistory.push({
        role: "model",
        parts: [{ functionCall: fc }]
      });

      const { name, args } = fc;
      const tool = tools[name as keyof typeof tools];

      if (tool) {
        const result = await tool(args as any);
        const functionResponsePart = {
            name: name,
            response: { result: result },
        };

        if (name === 'getGPUStatus') {
            updateCallback('tool', { toolResult: result, gpuStatus: result });
        } else {
            updateCallback('tool', { toolResult: JSON.stringify(result, null, 2) });
        }

        currentHistory.push({
            role: "user", // API expects 'user' role for function responses
            parts: [{ functionResponse: functionResponsePart }],
        });

        response = await ai.models.generateContent({
            model: model,
            contents: currentHistory,
             config: {
                systemInstruction: systemInstruction,
                tools: [{
                    functionDeclarations: [getGpuStatusDeclaration, estimateModelPerformanceDeclaration, executeCodeDeclaration]
                }],
            },
        });
      } else {
        throw new Error(`Tool ${name} not found.`);
      }
    }

    if (response.text) {
      updateCallback('model', response.text);
      currentHistory.push({ role: 'model', parts: [{ text: response.text }] });
    }
    return currentHistory;

  } catch (error) {
    console.error("Error running agent:", error);
    updateCallback('model', "Sorry, an error occurred while processing your request.");
    return currentHistory;
  }
}
