import React from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

const MatchDetails = () => {
  const location = useLocation();
  const matchData = location.state?.matchData;

  if (!matchData) {
    return <div className="app">No match details available.</div>;
  }

  return (
    <div className="app">
      <div className="details-container">
        <h2>{matchData.name}</h2>
        <p><strong>Match Type:</strong> {matchData.matchType}</p>
        <p><strong>Status:</strong> {matchData.status}</p>
        <p><strong>Venue:</strong> {matchData.venue}</p>
        <p><strong>Date:</strong> {new Date(matchData.date).toLocaleDateString()}</p>
        <p><strong>Toss Winner:</strong> {matchData.tossWinner} ({matchData.tossChoice})</p>
        <p><strong>Match Winner:</strong> {matchData.matchWinner}</p>

        <h3>Scores:</h3>
        {matchData.score.map((inning, index) => (
          <div key={index}>
            <p><strong>{inning.inning}</strong></p>
            <p>Runs: {inning.r}, Wickets: {inning.w}, Overs: {inning.o}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchDetails;
