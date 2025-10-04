# AgentiCore: Advanced AI Agent Interface

AgentiCore is a sophisticated web application showcasing a powerful AI agent built with the Google Gemini API. It demonstrates how a conversational AI can be augmented with specialized tools to perform complex tasks beyond simple text generation. The user interacts with the agent through a sleek, neon-themed UI, asking it to monitor system resources, estimate ML model performance, or even execute small code snippets safely.

This project is designed to highlight modern AI capabilities, particularly in the realm of "agentic AI" where the model can reason and decide to use external functions to fulfill a user's request.

![AgentiCore Screenshot](https://i.imgur.com/example.png) <!-- It's good practice to add a screenshot -->

---

## ✨ Features

- **Conversational AI:** Powered by Google's `gemini-2.5-flash` model for fast and intelligent responses.
- **Advanced Tool Integration (Function Calling):**
    - **GPU Resource Monitor:** The agent can access a (mocked) function to report on GPU status, including temperature, utilization, and VRAM usage. The results are displayed in a dynamic, easy-to-read chart.
    - **Model Performance Estimator:** Provides quick estimates for the VRAM requirements and potential inference speed for popular AI models like Llama2-7B or Stable Diffusion.
    - **Safe Code Executor:** Demonstrates the concept of a sandboxed environment where the agent can run simple, non-malicious code snippets to perform calculations or simple operations.
- **Engaging User Interface:**
    - A stylish and modern neon aesthetic with glowing text and borders.
    - Real-time message updates that mimic a streaming response.
    - Clear visual distinction between messages from the User, the AI (Model), and the Tools being used.
    - Fully responsive design that works seamlessly on desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **AI & Function Calling:** Google Gemini API (`@google/genai`)
- **Data Visualization:** Recharts for rendering the GPU metrics chart.
- **Icons:** Custom SVG icons for a polished look and feel.

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser.
- A Google Gemini API Key.

### Setup & Running the Application

This project is set up to run in a browser-based development environment like the one it was created in.

1.  **API Key Configuration:**
    The application is hardcoded to look for the API key in `process.env.API_KEY`. In the provided `services/agentService.ts`, you would replace the placeholder with your actual key.

    ```typescript
    // In services/agentService.ts
    const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your key
    ```
    *Note: In a real-world scenario, this key should never be exposed on the client-side. It would be handled by a backend server, and the `process.env.API_KEY` would be loaded securely.*

2.  **Open `index.html`:**
    Since this is a client-side application with no build step, you can simply open the `index.html` file in your web browser to run it.

---

## 📂 Project Structure

```
/
├── components/          # Reusable React components
│   ├── ChatInterface.tsx  # Core chat window, input, and message rendering
│   ├── GpuMetricsChart.tsx# Recharts component for GPU data
│   ├── Header.tsx         # The main application header
│   ├── Icons.tsx          # SVG icon components
│   ├── Loader.tsx         # Loading animation component
│   └── ToolShowcase.tsx   # The sidebar displaying agent capabilities
├── hooks/               # Custom React hooks
│   └── useAgent.ts      # Manages chat state and API interaction logic
├── services/            # Core application logic and API communication
│   └── agentService.ts  # Handles Gemini API calls, tool definitions, and agent logic
├── types.ts             # TypeScript type definitions for the app
├── App.tsx              # Main application component, lays out the structure
├── index.html           # The entry point of the application
├── index.tsx            # React root renderer
└── metadata.json        # Application metadata
```

---

## 🧠 Key Concepts Demonstrated

- **Agentic AI:** Building an AI that doesn't just respond with text, but can decide to use tools to perform actions and retrieve information from its environment.
- **Gemini Function Calling:** The core mechanism for enabling tool use, where the model outputs a structured request to call a specific function with certain arguments.
- **Client-Side State Management:** Using React's `useState` and `useCallback` hooks to efficiently manage the conversation state without a complex state management library.
- **Component-Based Architecture:** Structuring the entire user interface into logical, reusable, and maintainable React components.
- **Mocking Services:** Demonstrating how to simulate backend or hardware-level tools (`getGPUStatus`) in a frontend environment, which is crucial for development, testing, and creating demos like this one.
