import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import firebaseConfig from '../helpers/apiKeys';
import 'firebase/auth';
import NavBar from '../components/Navbar';
import Routes from '../helpers/Routes';
import { getPlayers } from '../helpers/data/playerData';

firebase.initializeApp(firebaseConfig);

function App() {
  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0]
        };
        setUser(userInfoObj);
        getPlayers(authed.uid).then((playersArray) => setPlayers(playersArray));
      } else if (user || user === null) {
        setUser(false);
        setPlayers([]);
      }
    });
  }, []);

  return (
    <>
      <Router>
        <NavBar user={user} />
        <Routes
          user={user}
          players={players}
          setPlayers={setPlayers}
        />
      </Router>
    </>
  );
}

export default App;
