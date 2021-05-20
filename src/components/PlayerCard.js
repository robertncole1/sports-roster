import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import PlayerForm from './PlayerForm';
import { deletePlayer } from '../helpers/data/playerData';

const PlayerCard = ({
  firebaseKey,
  imageURL,
  name,
  position,
  setPlayers,
  user
}) => {
  const [editing, setEditing] = useState(false);
  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deletePlayer(firebaseKey, user.uid)
          .then((playerArray) => setPlayers(playerArray));
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Position: {position}</CardSubtitle>
        </CardBody>
        <img width="100%" src={imageURL} alt="Card image cap" />
        <Button color="danger" onClick={() => handleClick('delete')}>Delete Player</Button>
        <Button color="info" onClick={() => handleClick('edit')}>
          {editing ? 'Close Form' : 'Edit Player'}
        </Button>
        {
          editing && <PlayerForm
          user={user}
          formTitle='Edit Player'
          setPlayers={setPlayers}
          firebaseKey={firebaseKey}
          name={name}
          imageURL={imageURL}
          position={position}
          />
        }
      </Card>
    </div>
  );
};

PlayerCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  setPlayers: PropTypes.func,
  user: PropTypes.any
};

export default PlayerCard;
