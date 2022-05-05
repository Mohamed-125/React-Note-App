import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPenSquare } from "react-icons/fa";
import "./NotePage.css";
const NotePage = ({ notes, note, setNote, setEditedNoteId }) => {
  const noteIdParams = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (note.length === 0) {
      setNote(
        notes.filter((item) => {
          return parseInt(item.id) === parseInt(noteIdParams.noteId);
        })
      );
    } else {
      setNote(note);
    }
    setEditedNoteId(noteIdParams.noteId);

    return () => {
      setNote([]);
    };
  }, []);

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
