import React, { useState, useContext } from "react";
import EventCard from "../components/EventCard";
import { AuthContext } from "../context/AuthContext";

const RecommendPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [llmResponse, setLlmResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [llmLoading, setLlmLoading] = useState(false); // <-- NEW
  const [error, setError] = useState("");
  const { userId } = useContext(AuthContext);

  const fetchRecommendations = async () => {
    if (!userId) {
      alert("You must be logged in to get recommendations.");
      return;
    }
    setLoading(true);
    setLlmLoading(true); // <-- Start LLM loading
    setError("");
    setLlmResponse("");

    try {
      const res = await fetch("http://localhost:8000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: parseInt(userId), query }),
      });
      if (!res.ok) throw new Error("Failed to fetch recommendations.");
      const data = await res.json();
      setResults(data.events || []);
      setLlmResponse(data.llm_response || "");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
    setLlmLoading(false); // <-- Stop LLM loading
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">
        Get Personalized Event Recommendations
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="What are you interested in?"
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={fetchRecommendations}
          disabled={loading}
          className={`bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Loading..." : "Recommend"}
        </button>

        {error && <div className="text-red-600 mt-4">{error}</div>}

        {/* 🤖 LLM Loading Spinner */}
        {llmLoading && (
          <div className="flex items-center gap-2 text-gray-700 my-4">
            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></span>
            <span>🤖 Thinking...</span>
          </div>
        )}

        {/* 💬 Show LLM response */}
        {llmResponse && (
          <div className="bg-gray-100 border-l-4 border-blue-500 text-gray-800 p-4 my-4 rounded">
            <p className="font-medium">AI Insights:</p>
            <p>{llmResponse}</p>
          </div>
        )}

        <div className="mt-8">
          {results.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendPage;
