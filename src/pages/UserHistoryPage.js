import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserHistory } from '../api/api';

export default function UserHistoryPage() {
  const { userId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getUserHistory(userId).then(res => setHistory(res.history));
  }, [userId]);

  return (
    <div>
      <h2>Your Event History</h2>
      <ul>
        {history.map(event => (
          <li key={event.id}>
            {event.title} - {event.category} - {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
