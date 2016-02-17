import uuid from 'node-uuid';
import React from 'react';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      notes: [
        { id: uuid.v4(), task: 'Play with WebPack features'},
        { id: uuid.v4(), task: 'Get React up and running' },
        { id: uuid.v4(), task: 'Buy a Pumpkin-spiced Latte'} ]
      
    };
  }
  
  render() {
    const notes = this.state.notes;
    
    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <ul>{ 
          notes.map(note => 
            <li key={note.id}>{note.task}</li> 
          )
        }</ul>
      </div>
    );
  }
  
  addNote = () => {
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id: uuid.v4(), 
          task: 'New Task placeholder'
        }
      ]
    }, 
    () => console.log('task added'));
    
  };
  
}
