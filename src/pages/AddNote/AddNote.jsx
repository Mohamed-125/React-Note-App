import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNote.css";
import ColorPicker from "./ColorPicker/ColorPicker";
import UploadImg from "./UploadImg/UploadImg";
const AddNote = ({
  backgroundColor,
  setBackgroundColor,
  notes,
  setNotes,
  edit,
  setNote,
  note,
  editedNoteId,
}) => {
  const titleRef = useRef();
  const descRef = useRef();
  const navigate = useNavigate();
  const [img, setImg] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (edit) {
      const data = {
        title: titleRef?.current.value,
        desc: descRef?.current.value,
        img,
        backgroundColor,
        id: editedNoteId,
      };

      const noteObject = note[0];

      setNote([Object.assign({}, noteObject, data)]);

      const edditedNote = notes.findIndex(
        (item) => parseInt(item.id) === parseInt(editedNoteId)
      );

      notes[edditedNote] = data;
      setNotes([...notes]);
    } else {
      setNotes([
        ...notes,
        {
          title: titleRef?.current.value,
          desc: descRef?.current.value,
          img,
          backgroundColor,
          id: Math.random() * 1000,
        },
      ]);
    }

    setTimeout(() => {
      navigate("/");
    }, 0);

    if (!edit) {
      return () => {
        setBackgroundColor("#f7ed59");
      };
    }
  };

  return (
    <div className="section__padding">
      <div>
        <h2 style={{ fontSize: "30px" }}>Add Note</h2>
      </div>
      <div className="addNote__content_contener">
        <div>
          <ColorPicker setBackgroundColor={setBackgroundColor} />
        </div>
        <div className="addNote__inputs">
          <form className="addNote__form" onSubmit={submitHandler}>
            <label>Title</label>
            <input
              required
              type="text"
              defaultValue={edit ? note[0]?.title : null}
              ref={titleRef}
              placeholder="Note Title..."
            />
            <label>Description</label>
            <textarea
              required
              type="text"
              defaultValue={edit ? note[0]?.desc : null}
              placeholder="Note description..."
              ref={descRef}
            />
            <UploadImg img={img} setImg={setImg} />
            <button
              style={{
                position: "absolute",
                right: "0rem",
                bottom: "1px",
                border: "none",
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                padding: "0.5rem 2rem",
                borderRadius: "20px",
              }}
            >
              {edit ? " Edit Note" : "Create Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
