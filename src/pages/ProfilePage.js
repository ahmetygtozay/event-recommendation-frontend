import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import EventCard from "../components/EventCard";

const ProfilePage = () => {
  const { userId } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${parseInt(userId)}/recommendations`);
        if (!res.ok) throw new Error("Failed to fetch recommendations.");
        const data = await res.json();
        setRecommendations(data.recommendations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Saved Recommendations</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      
      {recommendations.length === 0 && !loading ? (
        <p className="text-gray-500">No recommendations saved yet.</p>
      ) : (
        <div className="space-y-6">
          {recommendations.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 shadow-sm bg-white">
              {/* Query and time info */}
              <div className="mb-2 text-sm text-gray-600 italic">
                Recommended for: <span className="font-medium">{event.query}</span> <br />
                On: {new Date(event.recommended_at).toLocaleString()}
              </div>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
