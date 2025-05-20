import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="border rounded p-4 mb-4 shadow-sm hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{event.category}</span>
        <span>{event.location}</span>
      </div>
    </div>
  );
};

export default EventCard;
