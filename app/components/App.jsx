import uuid from 'node-uuid';
import React from 'react';

import Notes from './Notes.jsx';


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
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes notes={notes} 
          onEdit={this.editNote} onDelete={this.deleteNote} />
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
  
  editNote = (id, task) => {
    //Don't modify if trying to set value to empty
    if (!task.trim()) {
      return;
    }
    
    const notes = this.state.notes.map(note => {
      if (note.id === id && task) {
        note.task = task;
      }
      return note;
    });
    this.setState({notes});
  };
  
  deleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  };
  
}
