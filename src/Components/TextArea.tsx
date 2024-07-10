import { useState } from "react";
import axios, { AxiosError } from "axios";

interface Candidate {
  content: {
    parts: { text: string }[];
    role: string;
  };
  finishReason: string;
  index: number;
  safetyRatings: { category: string; probability: string }[];
}

interface ApiResponse {
  candidates: Candidate[];
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

export function TextAreaForm() {
  const [text, setText] = useState<string>("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const PromptData =
    "Analyze the sentiment of the following comment and respond with a single line that includes the sentiment (positive, negative, or neutral) and an appropriate emoji: ";

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

      if (response.data.candidates && response.data.candidates.length > 0) {
        setCandidates(response.data.candidates);
      } else {
        setError("No sentiment analysis result found");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: { message: string } }>;
      console.error("API error:", axiosError.response?.data || error.message);
      setError(
        axiosError.response?.data?.error?.message || "Something went wrong",
      );
    } finally {
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
      {candidates.length > 0 && (
        <div className="w-full shadow-lg border-spacing-x-3.5 p-5 shadow-blue-600 rounded-lg ring-card-foreground-100 border border-fuchsia-500">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Index</th>
                <th className="border px-4 py-2">Finish Reason</th>
                <th className="border px-4 py-2">Safety Ratings</th>
                <th className="border px-4 py-2">Parts Text</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{candidate.index}</td>
                  <td className="border px-4 py-2">{candidate.finishReason}</td>
                  <td className="border px-4 py-2">
                    <ul>
                      {candidate.safetyRatings.map((rating, ratingIndex) => (
                        <li key={ratingIndex}>
                          <strong>Category:</strong> {rating.category},{" "}
                          <strong>Probability:</strong> {rating.probability}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">
                    <ul>
                      {candidate.content.parts.map((part, partIndex) => (
                        <li key={partIndex}>{part.text}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
