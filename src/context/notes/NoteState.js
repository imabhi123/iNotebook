import { useState } from 'react'
import NoteContext from './noteContext'
const NoteState=(props)=>{
  const host="http://localhost:5000"
    const notesInitial=[]
      const [notes,setNotes]=useState(notesInitial);
      //get All Notes
      const getNote=async()=>{
        //API call
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
          method:'GET',
          headers:{
            'Content-Type':'Application/json',
            'auth-token':localStorage.getItem('token')
          }
        })
        const json=await response.json();
        setNotes(json);
      }
      //Add a Note
      const addNote=async(title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/addnote`,{
          method:'POST',
          headers:{
            'Content-Type':'Application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        })
        const note=await response.json();
        setNotes(notes.concat(note));
      }
      //Delete a Note
      const deleteNote=async(id)=>{
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers:{
            'Content-Type':'Application/json',
            'auth-token':localStorage.getItem('token')
          },
        })
        const newNote=notes.filter((note)=>{
        return  note._id!==id;
        })
        setNotes(newNote);
      }
      //edit note
      const editNote=async(id,title,description,tag)=>{
        const response=await fetch(`${host}/api/notes//updatenote/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'Application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        })
        const json=response.json();
        let newNotes=JSON.parse(JSON.stringify(notes))
        for(let i=0;i<newNotes.length;i++){
          const element=newNotes[i];
          if(element._id===id){
            newNotes[i].title=title;
            newNotes[i].description=description;
            newNotes[i].tag=tag;
            break;
          }
        }
        setNotes(newNotes)
      }
return(
    <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNote}}>
        {props.children}
    </NoteContext.Provider>
)
}
export default NoteState;