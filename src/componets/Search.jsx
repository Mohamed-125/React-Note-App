import React, { useState, useEffect, useRef } from "react";
import { TiDelete } from "react-icons/ti";
const Search = ({
  setNotes,
  notes,
  setSearchWord,
  searchWord,
  setFilteredNotes,
}) => {
  const ref = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const deleteHandler = () => {
    ref.current.value = "";
    setSearchWord([""]);
    setFilteredNotes(notes);
  };

  return (
    <form
      style={{ position: "relative", display: "flex", alignItems: "center" }}
      onSubmit={submitHandler}
    >
      <input
        onChange={() => {
          setSearchWord([ref?.current?.value.trim().toUpperCase()]);
        }}
        ref={ref}
      />
      <TiDelete
        onClick={deleteHandler}
        style={{ fontSize: "1.6rem", positon: "absolute", right: "0.5rem" }}
      />
    </form>
  );
};

export default Search;
