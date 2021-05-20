import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addPlayer, updatePlayer } from '../helpers/data/playerData';

const PlayerForm = ({
  formTitle,
  name,
  position,
  imageURL,
  firebaseKey,
  user,
  setPlayers
}) => {
  const [player, setPlayer] = useState({
    name: name || '',
    position: position || '',
    imageURL: imageURL || '',
    uid: user.uid,
    firebaseKey: firebaseKey || null
  });

  const handleInputChange = (e) => {
    setPlayer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(player, user.uid).then((playerArray) => setPlayers(playerArray));
    } else {
      addPlayer(player).then((playerArray) => setPlayers(playerArray));
    }
  };

  return (
    <div className='player-form'>
      <Form id='addPlayerForm' autoComplete='off' onSubmit={handleSubmit}>
        <h2>{formTitle}</h2>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            name='name'
            id='name'
            value={player.name}
            type='text'
            placeholder='Enter a Players Name'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="teacher">Position:</Label>
          <Input
            name='position'
            id='position'
            value={player.position}
            type='text'
            placeholder='Enter a Position'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="grade">Image URL:</Label>
          <Input
            name='imageURL'
            id='imageURL'
            value={player.imageURL}
            type='text'
            placeholder='Enter a Image URL'
            onChange={handleInputChange}
          />
        </FormGroup>

        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

PlayerForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setPlayers: PropTypes.func,
  name: PropTypes.string,
  position: PropTypes.string,
  imageURL: PropTypes.string,
  user: PropTypes.any,
  firebaseKey: PropTypes.string
};

export default PlayerForm;
