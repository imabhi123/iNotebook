import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context=useContext(noteContext)
  const {deleteNote}=context;
  const {editNote}=context;
    const {note,updatenote}=props;
  return (
      <div className="col-md-3">
        <div className="card my-3">
        <div className='card-body'>
            <h2 className='card-title'>{note.title}</h2>
            <p className='card-text'>{note.description}</p>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-2"onClick={()=>{updatenote(note)}}></i>
        </div>
      </div>
      </div>
  )
}

export default Noteitem
