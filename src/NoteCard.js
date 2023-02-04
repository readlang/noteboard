import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    left: ${props => props.x || "100"}px;
    top: ${props => props.y || "100"}px;
    width: 200px;
    height: auto;
    border: 1px solid rgb(47, 255, 0);
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
`
const Header = styled.div`
    width: 100%;
    height: 25px;
    background-color: rgb(47, 255, 0);
`
const Body = styled.div`
    width: calc(100% - 20px);
    padding: 10px;
`
const DeleteMenu = styled.button`
    height: 20px;
    width: 20px;
    border-radius: 2px;
    border: 0;
    background-color: rgba(1, 1, 1, 0);
    margin-left: 175px;
    position: relative;
`
const Delete = styled.button`
    position: absolute;
    top: 2px;
    right: 20px;
    background-color: white;
    height: 20px;
    width: 50px;
    border: 1px solid red;
    border-radius: 5px;
    color: red;
`

const TitleInput = styled.input`
    border: 0px;
    font-size: 18px;
    font-weight: bold;
    width: 175px;
`
const TextInput = styled.textarea`
    border: 0px;
    font-size: 16px;
    font-weight: normal;
    resize: vertical;
    width: 175px;
`

function NoteCard({note, editNote}) {
    const [startPos, setStartPos] = useState()
    const [isDraggable, setIsDraggable] = useState(true)
    const [showDelete, setShowDelete] = useState(false)
    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)

    function moveNote(finalX, finalY) {
        let noteCopy = {...note}
        noteCopy.posX = note.posX + finalX - startPos.x
        noteCopy.posY = note.posY + finalY - startPos.y
        editNote(noteCopy)
    }

    function saveNote() {
        let noteCopy = {...note}
        noteCopy.title = title
        noteCopy.text = text
        editNote(noteCopy)
    }

    return(
        <Container className="noteCard" x={note.posX} y={note.posY} draggable = {isDraggable ? "true": "false"}
            onDragStart={(e) => setStartPos({x: e.clientX, y: e.clientY})} 
            onDragEnd={(e) => moveNote(e.clientX, e.clientY) } >
            <Header><DeleteMenu onClick={()=>setShowDelete(!showDelete)}>☰ </DeleteMenu>{showDelete ? <Delete>Delete</Delete> : null}</Header>
            <Body  >
                <TitleInput type="text" value={title} autoFocus
                    onFocus ={() => {setIsDraggable(false); console.log("onselect")}}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={()=>{setIsDraggable(true); console.log("blur"); saveNote()} } 
                ></TitleInput>
                <TextInput value={text}
                    onFocus ={() => {setIsDraggable(false); console.log("onselect")}}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={()=>{setIsDraggable(true); console.log("blur"); saveNote()} } 
                ></TextInput>
                
            </Body>
        </Container>
    )
}

export default NoteCard;