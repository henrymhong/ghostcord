import { stack as Menu } from 'react-burger-menu'
import React from 'react';

class Burger extends React.Component {
  showSettings (event) {
    event.preventDefault();

  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu right isOpen={true} className="bm-menu" className="bm-item-list">
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="profile" className="menu-item" href="/profile">Profile</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Logout</a>
      </Menu>
    );
  }
}


export default Burger;