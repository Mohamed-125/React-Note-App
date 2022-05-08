import React, { useState } from "react";
import "./UploadImg.css";
const UploadImg = ({ setImg, img }) => {
  const [isLink, setIsLink] = useState(false);
  const buttonClickHandler = (e) => {
    switch (e.target.id) {
      case "upload from device":
        setIsLink(false);
        break;
      case "use link":
        setIsLink(true);
        break;
      default:
        break;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="uploadImg__button__contener">
        <button
          onClick={buttonClickHandler}
          type="button"
          id="upload from device"
        >
          Upload From Your Device
        </button>
        <button onClick={buttonClickHandler} type="button" id="use link">
          Use Link
        </button>
      </div>
      {!isLink ? (
        <div>
          <form onSubmit={submitHandler}>
            <input
              onChange={(e) => {
                setImg(URL.createObjectURL(e.target.files[0]));
              }}
              type="file"
            ></input>
          </form>
          <img className="addNote__uploadImg" src={img} />
        </div>
      ) : (
        <div>
          <form onSubmit={submitHandler}>
            <input
              style={{ width: "90%", maxWidth: "250px" }}
              onChange={(e) => {
                setImg(e.target.value);
              }}
              type="text"
            />
          </form>
          <img className="addNote__uploadImg" src={img} />
        </div>
      )}
    </div>
  );
};

export default UploadImg;
