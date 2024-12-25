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
        setMatchData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, []);

  if (loading) {
    return <div className="app">Loading match details...</div>;
  }

  if (error) {
    return <div className="app">Error: {error}</div>;
  }

  return (
    <div className="app">
      <div className="card">
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

export default App;




// import React, { useState, useEffect } from 'react';
// import './App.css';

// const App = () => {
//   const [matchDetails, setMatchDetails] = useState(null); // To store match details
//   const [error, setError] = useState(null); // To handle errors if any

//   // Fetch data when component mounts
//   useEffect(() => {
//     const url = 'https://cricket-live-line1.p.rapidapi.com/match/4837';
//     const options = {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': 'ad70c29469msh6371c97555696b9p1745c9jsn8b96c755ce25',
//         'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com'
//       }
//     };

//     // Async function to fetch match details
//     const fetchMatchDetails = async () => {
//       try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//           throw new Error('Failed to fetch match details');
//         }
//         const data = await response.json();
//         setMatchDetails(data); // Update state with fetched data
//       } catch (err) {
//         setError(err.message); // Set error message if something goes wrong
//       }
//     };

//     fetchMatchDetails(); // Call fetch function
//   }, []); // Empty dependency array ensures it runs only once on mount

//   return (
//     <div className="app">
//       <h1>Cricket Match Details</h1>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       {matchDetails ? (
//         <div className="card">
//           <h2>{matchDetails.matchTitle}</h2>
//           <p><strong>Teams:</strong> {matchDetails.team1.name} vs {matchDetails.team2.name}</p>
//           <p><strong>Venue:</strong> {matchDetails.venue}</p>
//           <p><strong>Status:</strong> {matchDetails.status}</p>
//           <p><strong>Score:</strong> {matchDetails.score}</p>
//         </div>
//       ) : (
//         <p>Loading match details...</p>
//       )}
//     </div>
//   );
// };

// export default App;

















// import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import './App.css';
// import MatchDetails from './MatchDetails';

// const App = () => {
//   const matchInfo = {
//     matchTitle: "India vs Pakistan",
//     team1: { name: "India" },
//     team2: { name: "Pakistan" },
//     venue: "Dubai International Cricket Stadium",
//     matchStatus: "Live",
//     matchDate: "December 25, 2024",
//     score: "India: 120/3 (15 overs) | Pakistan: 100/4 (14 overs)",
//     additionalInfo: "India is currently leading the match with 20 runs."
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Switch>
//           {/* Home page with clickable card */}
//           <Route exact path="/">
//             <div className="card-container">
//               <Link to="/match-details">
//                 <div className="card">
//                   <h2>{matchInfo.matchTitle}</h2>
//                   <p><strong>Teams:</strong> {matchInfo.team1.name} vs {matchInfo.team2.name}</p>
//                   <p><strong>Venue:</strong> {matchInfo.venue}</p>
//                   <p><strong>Status:</strong> {matchInfo.matchStatus}</p>
//                 </div>
//               </Link>
//             </div>
//           </Route>

//           {/* Match details page */}
//           <Route path="/match-details">
//             <MatchDetails matchInfo={matchInfo} />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;
