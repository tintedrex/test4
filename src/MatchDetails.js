import React from 'react';
import './App.css';

const MatchDetails = () => {
  const matchDetails = {
    matchTitle: "India vs Pakistan",
    team1: { name: "India" },
    team2: { name: "Pakistan" },
    venue: "Dubai International Cricket Stadium",
    matchStatus: "Live",
    matchDate: "December 25, 2024",
    score: "India: 120/3 (15 overs) | Pakistan: 100/4 (14 overs)",
    additionalInfo: "India is currently leading the match with 20 runs."
  };

  return (
    <div className="details-container">
      <h2>{matchDetails.matchTitle} - Match Details</h2>
      <p><strong>Teams:</strong> {matchDetails.team1.name} vs {matchDetails.team2.name}</p>
      <p><strong>Venue:</strong> {matchDetails.venue}</p>
      <p><strong>Status:</strong> {matchDetails.matchStatus}</p>
      <p><strong>Match Date:</strong> {matchDetails.matchDate}</p>
      <p><strong>Score:</strong> {matchDetails.score}</p>
      <p><strong>Additional Info:</strong> {matchDetails.additionalInfo}</p>
    </div>
  );
};

export default MatchDetails;
