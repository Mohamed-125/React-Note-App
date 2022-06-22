import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddOrEditNote.css";
import ColorPicker from "./ColorPicker/ColorPicker";
import UploadImg from "./UploadImg/UploadImg";
import axios from "axios";
const AddOrEditNote = ({
  backgroundColor,
  setBackgroundColor,
  notes,
  setNotes,
  edit,
  setNote,
  note,
  editedNoteId,
  setImg,
  img,
}) => {
  // this component is the most complex one is this project
  // this component is for editing or adding new note
  // if the edit is true that's means that we are editing
  // if false that's mean that we are adding new note

  // refs
  const titleRef = useRef();
  const descRef = useRef();

  // navigte to go back to the previous page

  const navigate = useNavigate();

  // submit handler to add or edit component

  const submitHandler = (e) => {
    e.preventDefault();
    if (edit) {
      // to set the note which we are at to save it in the local storage and prevent it from
      // disappering when reload
      const data = {
        title: titleRef?.current.value,
        content: descRef?.current.value,
        img,
        backgroundColor,
        id: editedNoteId,
      };

      const noteObject = note[0];
      axios.put(
        `https://62948189a7203b3ed06a58f3.mockapi.io/news/notes/${editedNoteId}`,
        data
      );
      setNote([Object.assign({}, noteObject, data)]);

      // to set the eddited note and to change it

      const edditedNote = notes.findIndex(
        (item) => parseInt(item.id) === parseInt(editedNoteId)
      );
      notes[edditedNote] = data;
      setNotes([...notes]);
    }

    // if we are not edditing then add the note to the other notes
    else {
      let data = {
        title: titleRef?.current.value,
        content: descRef?.current.value,
        img,
        backgroundColor,
      };
      axios
        .post(`https://62948189a7203b3ed06a58f3.mockapi.io/news/notes`, data)
        .then((res) => setNotes([...notes, res.data]));
      // setNotes([...notes, data]);
    }

    // to navigate when the adding or eddting procces end
    setTimeout(() => {
      navigate("/");
    }, 0);
    // to make the default background if the user didn't select one
    // which is degree of yellow

    if (!edit) {
      return () => {
        setBackgroundColor("#f7ed59");
      };
    }
  };

  // to save the img when editing the note

  useEffect(() => {
    if (edit && note.length > 0) {
      setImg(note[0].img);
    }

    return () => {
      setImg("");
      setNote([]);
      localStorage.removeItem("note");
    };
  }, []);

  return (
    <div className="section__padding">
      <div>
        <h2 style={{ fontSize: "30px" }}>Add Note</h2>
      </div>
      <div className="addNote__content_contener">
        <div>
          {/* the upload colorPicker  component  */}

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
              defaultValue={edit ? note[0]?.content : null}
              placeholder="Note description..."
              ref={descRef}
            />

            {/* the upload img component  */}

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

export default AddOrEditNote;
