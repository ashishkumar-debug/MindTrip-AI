// src/service/AIModel.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load your API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Initialize the Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Sends a prompt to Gemini and returns the generated response text.
 * @param {string} prompt - The prompt string to send to Gemini.
 * @returns {Promise<string>} - The generated response text.
 */
export const sendMessage = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate response from Gemini.");
  }
};