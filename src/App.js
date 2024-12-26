// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
// import './App.css';
// import MatchDetails from './MatchDetails';

// const App = () => {
//   const [matchInfo] = useState({
//     matchTitle: "India vs Pakistan",
//     team1: { name: "India" },
//     team2: { name: "Pakistan" },
//     venue: "Dubai International Cricket Stadium",
//     matchStatus: "Live",
//     matchDate: "December 25, 2024",
//     Score: "India: 120/3 (15 overs) | Pakistan: 100/4 (14 overs)",
//     additionalInfo: "India is currently leading the match with 20 runs."
    
//   });

//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate('/match-details');
//   };

//   return (
//     <div className="app">
//       <div className="card-container">
//         <div className="card" onClick={handleCardClick}>
//           <h2>{matchInfo.matchTitle}</h2>
//           <p><strong>Teams:</strong> {matchInfo.team1.name} vs {matchInfo.team2.name}</p>
//           <p><strong>Venue:</strong> {matchInfo.venue}</p>
//           <p><strong>Status:</strong> {matchInfo.matchStatus}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const RootApp = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/match-details" element={<MatchDetails />} />
//     </Routes>
//   </Router>
// );

// export default RootApp;




import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import MatchDetails from './MatchDetails';
import "./App.css";

const App = () => {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      const url = "https://api.cricapi.com/v1/match_info";
      const apiKey = "65610262-566e-454a-8ca4-00b21a828b47";
      const matchId = "820cfd88-3b56-4a6e-9dd8-1203051140da";
      const requestUrl = `${url}?apikey=${apiKey}&offset=0&id=${matchId}`;

      try {
        const response = await fetch(requestUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result.data);
        setMatchData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = () => {
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
      <div className="card" onClick={handleCardClick}>
        <h2>{matchData.name}</h2>
        <p><strong>Match Type:</strong> {matchData.matchType}</p>
        <p><strong>Status:</strong> {matchData.status}</p>
        <p><strong>Venue:</strong> {matchData.venue}</p>
        <p><strong>Date:</strong> {new Date(matchData.date).toLocaleDateString()}</p>
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
