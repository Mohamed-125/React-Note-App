import React from "react";
import { useEffect } from "react";
import "./ColorPicker.css";
const ColorPicker = ({ setBackgroundColor }) => {
  const colorClickHandler = (e) => {
    setBackgroundColor(e.target.getAttribute("backgroundColor"));
    document.querySelectorAll(".color__icon").forEach((item) => {
      item.classList.remove("acitve__color_button");
    });
    e.target.classList.add("acitve__color_button");
  };
  useEffect(() => {
    return () => {
      setBackgroundColor("yellow");
    };
  }, []);
  return (
    <div className="addNote__choose_color">
      <button
        onClick={colorClickHandler}
        style={{ backgroundColor: "#f05b32" }}
        backgroundcolor="#f05b32"
        className="color__icon"
      ></button>
      <button
        onClick={colorClickHandler}
        style={{ backgroundColor: "#fa9746" }}
        backgroundcolor="#fa9746"
        className="color__icon"
      ></button>
      <button
        onClick={colorClickHandler}
        backgroundcolor="#3bf7bc"
        style={{ backgroundColor: "#3bf7bc" }}
        className="color__icon"
      ></button>
      <button
        onClick={colorClickHandler}
        backgroundcolor="#a866ff"
        style={{ backgroundColor: "#a866ff" }}
        className="color__icon"
      ></button>
    </div>
  );
};

export default ColorPicker;
