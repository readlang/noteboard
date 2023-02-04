import { useState } from "react";
import styled from "styled-components";
import NoteCard from "./NoteCard";

const headerHeight = 50;

const HeaderBar = styled.div`
  width: 100%;
  height: ${headerHeight}px;
  background-color: rgb(47, 255, 0);
`
const HeaderBarContent = styled.div`
  padding: 10px 40px;
  color: rgb(36, 36, 36);
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Canvas = styled.div`
  position: relative;
  height: calc(100vh - ${headerHeight}px);
  background-color: hsl(0, 0%, 98%);
`
const AddButton = styled.button`
  position: absolute;
  left: 40px;
  top: 40px;
  height: 38px;
  width: 38px;
  border-radius: 40px;
  background-color: hsla(0, 0%, 100%, 1);
  border: 2px solid rgb(0 122 255);
  color: rgb(0 122 255);
`
const SaveButton = styled.button`
  height: 20px;
  width: auto;
  border-radius: 5px;
  background-color:  rgb(255, 255, 255);
  border: 1px solid rgb(0 122 255);
  color: black;
`

function App() {

  const exampleNote = {
    id: 1,
    title: "Example Note",
    text: "This is the text area.",
    posX: 300,
    posY: 300,
  }

  const [notes, setNotes] = useState([exampleNote])

  function addNote() {
    const newId = notes[notes.length-1].id+1
    const newNote = {
      id: newId,
      title: `New note ${newId}`,
      text: "Click to change text.",
      posX: 100,
      posY: 100,
    } 
    setNotes([...notes, newNote])
  }

  function editNote(edittedNote) {
    let copyNotes = [...notes]
    copyNotes[copyNotes.findIndex(item => item.id === edittedNote.id)] = edittedNote
    setNotes(copyNotes)
  }

  // function deleteNote() {
    
  // }

  function saveToLocal() {
    localStorage.setItem('NBnotes', JSON.stringify(notes) )
  }

  function getFromLocal() {
    const jsonData = localStorage.getItem('NBnotes')

    if (jsonData) {
      try {
        let retrievedData = JSON.parse(jsonData)
        setNotes(retrievedData)
      } catch (error) {
        console.log("There was a error retrieving the data.  Error shown below.  Use 'save to local' to overwrite corrupt data.")
        console.error("NoteBoard error: Data saved to local is corrupt -", error)
      }
    } else {
      console.log("No saved data to retrieve.")
    }
  }

  return (
    <div>
      <HeaderBar>
        <HeaderBarContent>
          <h2>StickyBoard</h2>
          <div>
            <SaveButton onClick={saveToLocal}>Save to local</SaveButton> &nbsp;
            <SaveButton onClick={getFromLocal}>Load from local</SaveButton>
          </div>
        </HeaderBarContent>
      </HeaderBar>

      <Canvas>
        <AddButton onClick={addNote}><h1>+</h1></AddButton>
        {notes.map( (note, index) => 
          <NoteCard key={`${index}-${note.title}`} note={note} editNote={editNote}/> 
        )}

        <br/> <br/> <br/> <br/> <br/> <br/> <br/> 
        <h1>hello</h1>
        <h2>hello</h2>
        <h3>hello</h3>
        <h4>hello</h4>
        <h5>hello</h5>
        <h6>hello</h6>
        
      </Canvas>
    </div>
  );
}

export default App;