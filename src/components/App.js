import React, { Component } from 'react';
import ListEvents from './../containers/ListEvents';

class App extends Component {
  render() {
    return (
      <div className="Events">
        <span>Мероприятия</span>
        <ListEvents />
      </div>
    );
  }
}
export default App;
