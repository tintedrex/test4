import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MatchDetails from './MatchDetails';

const App = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent";
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ed5c3bb15fmsh19695825d57e787p140af3jsn8d0108bf9cd7',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);

        const extractedMatches = [];
        result.typeMatches.forEach(typeMatch => {
          typeMatch.seriesMatches.forEach(seriesMatch => {
            if (seriesMatch.seriesAdWrapper && seriesMatch.seriesAdWrapper.matches) {
              seriesMatch.seriesAdWrapper.matches.forEach(match => {
                extractedMatches.push({
                  ...match.matchInfo,
                  matchScore: match.matchScore
                });
              });
            }
          });
        });

        setMatches(extractedMatches);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (matchData) => {
    navigate('/match-details', { state: { matchData } });
  };

  if (loading) {
    return <div className="app">Loading match details...</div>;
  }

  if (error) {
    return <div className="app">Error: {error}</div>;
  }

  return (
    <div className="app">
      <div className="card-container">
        {Array.isArray(matches) && matches.length > 0 ? (
          matches.map((match, index) => (
            <div key={index} className="card" onClick={() => handleCardClick(match)}>
              <h2>{match.seriesName}</h2>
              <h2>{match.team1.teamName} <strong>vs</strong> {match.team2.teamName}</h2>
              <p><strong>Match Description:</strong> {match.matchDesc}</p>
              <p><strong>Match Format:</strong> {match.matchFormat}</p>
              <p><strong>Status:</strong> {match.status}</p>
              <p><strong>Venue:</strong> {match.venueInfo.ground}, {match.venueInfo.city}</p>
              <p><strong>Date:</strong> {new Date(parseInt(match.startDate)).toLocaleDateString()}</p>
              
            </div>
          ))
        ) : (
          <div>No matches available</div>
        )}
      </div>
    </div>
  );
};

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/match-details" element={<MatchDetails />} />
    </Routes>
  </Router>
);

export default AppRouter;