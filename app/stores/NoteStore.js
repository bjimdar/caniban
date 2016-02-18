import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class noteStore {
  constructor() {
    this.bindActions(NoteActions);
    this.notes = [];
  }

  create(note) {
    const notes = this.notes;
    note.id = uuid.v4();
    this.setState({ notes: notes.concat(note) });
  };

  update(updatedNote) {
    const notes = this.notes.map(note => {
      if (note.id === updatedNote.id) {
        // Object.assign is used here to patch up the note data.
        // It mutates the target (first param).
        // In order to avoid that, we're using {} at its target 
        //  and applying our data onto it.
        // Example: {}, {a: 5, b: 3}, {a: 17}   -->  {a: 17, b:3}
        // You can pass as many objects to the method as you want.
        return Object.assign({}, note, updatedNote);
      }
      return note;
    });

    this.setState({ notes });
  };

  delete(id) {
    let remainingNotes = this.notes.filter(note => note.id !== id);
    this.setState({ notes: remainingNotes });
  };

}

export default alt.createStore(noteStore, 'NoteStore');
