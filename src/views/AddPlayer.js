import React from 'react';
import PropTypes from 'prop-types';
import PlayerForm from '../components/PlayerForm';

function AddPlayer({ setPlayers, user }) {
  return (
    <div>
      <PlayerForm
        user={user}
        formTitle='Add Player'
        setPlayers={setPlayers}
      />
    </div>
  );
}

AddPlayer.propTypes = {
  setPlayers: PropTypes.func.isRequired,
  user: PropTypes.any
};

export default AddPlayer;
