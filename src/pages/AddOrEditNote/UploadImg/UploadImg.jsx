import React, { useState, useEffect } from "react";
import "./UploadImg.css";
const UploadImg = ({ setImg, img }) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
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
    </div>
  );
};

export default UploadImg;
