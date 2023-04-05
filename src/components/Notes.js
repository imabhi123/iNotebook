import React, { useContext, useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote,editNote} = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  let history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
    getNote();
    }
    else {
      console.log(localStorage.getItem('token'))
      history("/login");
    }
    // eslint-disable-next-line 
  }, [])
  const updateNote = (currNote) => {
    ref.current.click();
    setNote({id:currNote._id, etitle:currNote.title,edescription:currNote.description,etag:currNote.tag});
    props.showAlert("Note Updated","successful");
  }
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });
  const handleClick = (e) => {
    console.log("updating the note",note)
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  return (
    <div>
      <AddNote showAlert={props.showAlert}/>
      <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">title</label>
          <input type="text" className="form-control" onChange={onChange} id="etitle" name='etitle' value={note.etitle} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">Description</label>
          <input type="text" className="form-control" onChange={onChange} id="edescription" name='edescription' value={note.edescription}minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">Tag</label>
          <input type="text" className="form-control" onChange={onChange} id="etag" name='etag' value={note.etag}/>
        </div>
      </form> 
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div  className="container mx-24">
          {notes.length===0&&'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem note={note} updatenote={updateNote} key={note._id} />;
        })}
      </div>
    </div>
  )
}

export default Notes
