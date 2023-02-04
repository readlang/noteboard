import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    left: ${props => props.x || "100"}px;
    top: ${props => props.y || "100"}px;
    width: 200px;
    height: auto;
`
const Header = styled.div`
    width: 100%;
    height: 20px;
    background-color: rgb(47, 255, 0);
    border-radius: 10px 10px 0 0;
`
const Body = styled.div`
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid rgb(47, 255, 0);
    border-radius: 0 0 10px 10px;
`

function NoteCard({note, editNote}) {
    const [startPos, setStartPos] = useState()

    function moveNote(finalX, finalY) {
        let copyNote = {...note}
        copyNote.posX = note.posX + finalX - startPos.x
        copyNote.posY = note.posY + finalY - startPos.y
        editNote(copyNote)
    }

    return(
        <Container className="noteCard" x={note.posX} y={note.posY} draggable = "true"
            onDragStart={(e) => setStartPos({x: e.clientX, y: e.clientY})} 
            onDragEnd={(e) => moveNote(e.clientX, e.clientY) } >
            <Header />
            <Body>
                <h3>{note.title} </h3>
                <p>{note.text} </p>
            </Body>
        </Container>
    )
}

export default NoteCard;