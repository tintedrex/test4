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










import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await fetch(
          'https://api.cricapi.com/v1/match_info?apikey=65610262-566e-454a-8ca4-00b21a828b47&offset=0&id=820cfd88-3b56-4a6e-9dd8-1203051140da',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com',
              'x-rapidapi-key': '65610262-566e-454a-8ca4-00b21a828b47',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMatchInfo(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching match info:', err);
        setError('Failed to fetch the match information.');
        setLoading(false);
      }
    };

    fetchMatchInfo();
  }, []);

  if (loading) {
    return <p>Loading match information...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="app">
      <div className="card">
        <h2>Match Information</h2>
        {matchInfo && (
          <div>
            <p><strong>Match:</strong> {matchInfo.matchTitle}</p>
            <p><strong>Teams:</strong> {matchInfo.team1.name} vs {matchInfo.team2.name}</p>
            <p><strong>Venue:</strong> {matchInfo.venue}</p>
            <p><strong>Status:</strong> {matchInfo.matchStatus}</p>
          </div>
        )}
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
