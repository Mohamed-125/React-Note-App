import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPenSquare } from "react-icons/fa";
const NotePage = ({ notes, note, setNote, setEditedNoteId }) => {
  const noteIdParams = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (note.length === 0) {
      // if it is the first time the user enters's this note then save it
      //  in line 33 - we save this state value to localStorage
      // to display it when the user relaods the page
      setNote(
        notes.filter((item) => {
          return parseInt(item.id) === parseInt(noteIdParams.noteId);
        })
      );
    }
    if (JSON.parse(localStorage.getItem("note"))) {
      setNote([JSON.parse(localStorage.getItem("note"))]);
    }
    // set the id of this note to state to know which we are editing
    setEditedNoteId(noteIdParams.noteId);

    return () => {
      // remove the note to add the new one when the user click's on one of them
      setNote([]);
      localStorage.removeItem("note");
    };
  }, []);

  // if we are on note save it into the local storage

  useEffect(() => {
    if (note.length > 0) {
      localStorage.setItem("note", JSON.stringify(note[0]));
    }
  }, [note]);

  // navigate to the edit page when the user click on the edit icon
  const editHandler = () => {
    navigate(`/EditNote/${noteIdParams.noteId}`);
  };

  return (
    <div style={{ paddingTop: "3rem" }} className="section__padding">
      <h2>{note[0]?.title}</h2>
      {note[0]?.img ? (
        <img
          style={{ width: "100%", marginBlock: "3rem" }}
          src={note[0]?.img}
        />
      ) : null}
      <p style={{ marginTop: "2rem", overflowWrap: "break-word" }}>
        {note[0]?.desc}
      </p>
      <FaPenSquare
        onClick={editHandler}
        style={{
          fontSize: "3rem",
          borderRadius: "50%",
          position: "fixed",
          bottom: "1rem",
          right: "2rem",
        }}
      />
    </div>
  );
};

export default NotePage;
