import { useState } from "react";
import axios, { AxiosError } from "axios";

interface SafetyRating {
  category: string;
  probability: string;
}

interface ApiResponse {
  message: string;
  safetyRatings?: SafetyRating[];
}

export function TextAreaForm() {
  const [text, setText] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const PromptData =
    "just analyze this X comment sentiment in one line with emoji in 20 words nothing else and return only single line response nothing else and return it in string  ";

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post<ApiResponse>(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDsera-FiGeC3om7bUnuWYlQOlRITbdkFQ",
        {
          contents: [{ parts: [{ text: PromptData + text }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("API response:", response.data); // Debug log
      setSentiment(response.data.message);
      setIsLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: { message: string } }>;
      console.error(
        "API error:",
        axiosError.response?.data?.error?.message || error.message,
      ); // Debug log
      setError(
        axiosError.response?.data?.error?.message || "Something went wrong",
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div>
        <label className="flex-col text-lg font-bold text-pink-700 uppercase shadow-lg">
          Write the comment here
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full h-28 shadow-lg border-spacing-x-3.5 p-5 shadow-blue-600 resize-none rounded-lg ring-card-foreground-100 border border-fuchsia-500"
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        className="uppercase font-extrabold text-pink-800 mt-8 relative inline-flex items-center justify-center p-0.5 mb-2
          overflow-hidden text-sm 
          rounded-lg group bg-gradient-to-br from-cyan-500
          to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4
          focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Submit
        </span>
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      <h1 className="font-bold text-3xl mb-8">Sentiment Analysis Result:</h1>
      {sentiment && (
        <p className="w-full shadow-lg border-spacing-x-3.5 p-5 shadow-blue-600 resize-none rounded-lg ring-card-foreground-100 border border-fuchsia-500">
          {sentiment}
        </p>
      )}
    </div>
  );
}
