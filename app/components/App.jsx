import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = NoteStore.getState();
  }
    
  componentWillMount() {
    //Unsubscribe from change feed during mounting 
    // to avoid some known memory leaks problems.
    NoteStore.unlisten(this.storeChanged);
  }
  
  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }
  
  storeChanged = (state) => {
    //Initialize property so `this` points to the right context
    this.setState(state);
  };
  
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
  
  
  addNote() { NoteActions.create({task: 'New task'}); }
  
  editNote(id, task) {
    //Don't modify if trying to set value to empty
    if (!task.trim()) {
      return;
    }
    NoteActions.update({id, task});
  };
  
  deleteNote(id) { NoteActions.delete(id) };
  
}
