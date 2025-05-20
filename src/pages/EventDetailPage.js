import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api/api';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEventById(id).then(setEvent);
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
    </div>
  );
}
