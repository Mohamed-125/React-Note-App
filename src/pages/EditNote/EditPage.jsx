import React, { useEffect, useRef, useState } from "react";
import "./EditNote.css";
import { useNavigate, useParams } from "react-router-dom";
import ColorPicker from "../AddNote/ColorPicker/ColorPicker";
import UploadImg from "../AddNote/UploadImg/UploadImg";
const EditNote = ({ setBackgroundColor, note, setEditedNoteId }) => {
  const navigate = useNavigate();
  const noteIdParams = useParams();

  const titleRef = useRef();
  const descRef = useRef();
  const [img, setImg] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    setTimeout(() => {
      navigate(-1);
    }, 0);
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
              ref={titleRef}
              defaultValue={note[0]?.title}
              placeholder="Note Title..."
            />
            <label>Description</label>
            <textarea
              required
              defaultValue={note[0]?.desc}
              type="text"
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
              Upadate Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
