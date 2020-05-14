import React from 'react';
import NavBarComponent from "../../navBar/navBar";
import '../videoroom.css';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <div>
      <NavBarComponent />
      <form className="room-form" onSubmit={handleSubmit}>
        <h2 className="lobby-title">Enter a room</h2>
        <div>
          <label htmlFor="name">Nickname:</label>
          <input
            type="text"
            id="field"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>

        <div>
          <label htmlFor="room">Room:</label>
          <input
            type="text"
            id="room"
            value={roomName}
            onChange={handleRoomNameChange}
            required
          />
        </div>
        <button className="room-btn"type="submit">Enter</button>
      </form>
    </div>

  );
};

export default Lobby;