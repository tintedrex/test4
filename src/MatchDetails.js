import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

const MatchDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const matchData = location.state?.matchData;

  if (!matchData) {
    return <div className="app">No match details available.</div>;
  }

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="app">
      <div className="details-container">
        <h2>{matchData.seriesName}</h2>
        <h2>{matchData.team1.teamName} <strong>vs</strong> {matchData.team2.teamName}</h2>
        <p><strong>Match Description:</strong> {matchData.matchDesc}</p>
        <p><strong>Match Format:</strong> {matchData.matchFormat}</p>
        <p><strong>Status:</strong> {matchData.status}</p>
        <p><strong>Venue:</strong> {matchData.venueInfo.ground}, {matchData.venueInfo.city}</p>
        <p><strong>Date:</strong> {new Date(parseInt(matchData.startDate)).toLocaleDateString()}</p>

        <h3>Scores:</h3>
        {matchData.matchScore && (
          <div className="score-details">
            {matchData.matchScore.team1Score?.inngs1 && (
              <div>
                <h4>{matchData.team1.teamName} - 1st Innings</h4>
                <p>Runs: {matchData.matchScore.team1Score.inngs1.runs}</p>
                <p>Wickets: {matchData.matchScore.team1Score.inngs1.wickets}</p>
                <p>Overs: {matchData.matchScore.team1Score.inngs1.overs}</p>
              </div>
            )}
            {matchData.matchScore.team1Score?.inngs2 && (
              <div>
                <h4>{matchData.team1.teamName} - 2nd Innings</h4>
                <p>Runs: {matchData.matchScore.team1Score.inngs2.runs}</p>
                <p>Wickets: {matchData.matchScore.team1Score.inngs2.wickets}</p>
                <p>Overs: {matchData.matchScore.team1Score.inngs2.overs}</p>
              </div>
            )}
            {matchData.matchScore.team2Score?.inngs1 && (
              <div>
                <h4>{matchData.team2.teamName} - 1st Innings</h4>
                <p>Runs: {matchData.matchScore.team2Score.inngs1.runs}</p>
                <p>Wickets: {matchData.matchScore.team2Score.inngs1.wickets}</p>
                <p>Overs: {matchData.matchScore.team2Score.inngs1.overs}</p>
              </div>
            )}
            {matchData.matchScore.team2Score?.inngs2 && (
              <div>
                <h4>{matchData.team2.teamName} - 2nd Innings</h4>
                <p>Runs: {matchData.matchScore.team2Score.inngs2.runs}</p>
                <p>Wickets: {matchData.matchScore.team2Score.inngs2.wickets}</p>
                <p>Overs: {matchData.matchScore.team2Score.inngs2.overs}</p>
              </div>
            )}
          </div>
        )}
        
        <button onClick={handleBackClick} className="back-button">Back</button>
      </div>
    </div>
  );
};

export default MatchDetails;