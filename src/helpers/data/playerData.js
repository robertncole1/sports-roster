import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addPlayer = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/players.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/players/${response.data.name}.json`, body)
        .then(() => {
          getPlayers(obj.uid).then((playerArray) => resolve(playerArray));
        });
    }).catch((error) => reject(error));
});

const deletePlayer = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/players/${firebaseKey}.json`)
    .then(() => getPlayers(uid).then((playerArray) => resolve(playerArray)))
    .catch((error) => reject(error));
});

const updatePlayer = (players, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/players/${players.firebaseKey}.json`, players)
    .then(() => getPlayers(uid).then(resolve))
    .catch((error) => reject(error));
});

export {
  addPlayer, getPlayers, deletePlayer, updatePlayer
};
