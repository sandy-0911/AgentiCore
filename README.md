# AgentiCore: Advanced AI Agent Interface

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

AgentiCore is a sophisticated web application showcasing a powerful AI agent built with the Google Gemini API. It demonstrates how a conversational AI can be augmented with specialized tools to perform complex tasks beyond simple text generation. The user interacts with the agent through a sleek, neon-themed UI, asking it to monitor system resources, estimate ML model performance, or even execute small code snippets safely.

This project is designed to highlight modern AI capabilities, particularly in the realm of **"agentic AI"** where the model can reason and decide to use external functions to fulfill a user's request.

---

### Application Preview
<!-- It's good practice to add a screenshot -->
 

---

## ✨ Core Features

| Feature                          | Description                                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 🤖 **Conversational AI**         | Powered by Google's `gemini-2.5-flash` model for fast, intelligent, and context-aware responses.                                         |
| 🛠️ **Advanced Tool Integration** | The agent uses Gemini's Function Calling to interact with its environment, providing real-world utility.                                 |
| 🖥️ **GPU Resource Monitor**     | Reports on (mocked) GPU status, including temperature, utilization, and VRAM usage, displayed in a dynamic chart.                          |
| 📈 **Model Performance Estimator** | Provides quick estimates for VRAM needs and inference speeds for popular AI models like Llama2-7B or Stable Diffusion.                   |
| 💻 **Safe Code Executor**        | Demonstrates sandboxed execution by allowing the agent to run simple, non-malicious code snippets for calculations or simple operations. |
| 🎨 **Engaging Neon UI**         | A stylish and modern aesthetic with glowing text and borders, real-time message updates, and a fully responsive design.                    |

---

## 🛠️ Tech Stack

- **Frontend:** **React** & **TypeScript**
- **Styling:** **Tailwind CSS** for a utility-first workflow.
- **AI & Function Calling:** **Google Gemini API** (`@google/genai`).
- **Data Visualization:** **Recharts** for rendering the GPU metrics chart.
- **Icons:** Custom SVG icons for a polished look and feel.

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser.
- A **Google Gemini API Key**.

### Setup & Running the Application

This project is configured to run in a browser-based development environment.

1.  **API Key Configuration:**
    The application requires an API key to function. You must set it in `services/agentService.ts`.

    ```typescript
    // In services/agentService.ts
    const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual key
    ```

    > **Important Security Note:** In a production environment, this key should **never** be exposed on the client side. It should be managed by a secure backend server, and the `process.env.API_KEY` would be loaded server-side.

2.  **Run the Application:**
    Since this is a client-side application with no build step, you can simply open the `index.html` file in your web browser to run it.

---

## 📂 Project Structure

The project is organized into a clean, component-based architecture for maintainability and scalability.

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
- **Mocking Services:** Demonstrating how to simulate backend or hardware-level tools (`getGPUStatus`) in a frontend environment—a crucial skill for development, testing, and creating demos.