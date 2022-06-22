import React, { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AddOrEditNote from "./pages/AddOrEditNote/AddOrEditNote";
import NotePage from "./pages/NotePage/NotePage";
import axios from "axios";
const App = () => {
  const [backgroundColor, setBackgroundColor] = useState("#f7ed59");
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState([]);
  const [editedNoteId, setEditedNoteId] = useState(0);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchWord, setSearchWord] = useState([]);
  const [img, setImg] = useState("");

  useEffect(() => {
    axios
      .get("https://62948189a7203b3ed06a58f3.mockapi.io/news/notes")
      .then((data) => setNotes(data.data));
  }, []);

  // when the search word change
  useEffect(() => {
    if (searchWord[0]) {
      setFilteredNotes(
        notes.filter((item) => {
          if (searchWord[0] === "") {
            return item;
          } else if (
            item.title.toLowerCase().includes(searchWord[0].toLowerCase())
          ) {
            return item;
          }
        })
      );
    }
  }, [searchWord]);

  // save the notes to the local storage

  useEffect(() => {
    console.log(notes);
    setFilteredNotes(notes);
  }, [notes]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setFilteredNotes={setFilteredNotes}
              filteredNotes={filteredNotes}
              notes={notes}
              setNotes={setNotes}
              setSearchWord={setSearchWord}
              searchWord={searchWord}
            />
          }
        />
        <Route
          path="/AddNote"
          element={
            <AddOrEditNote
              backgroundColor={backgroundColor}
              notes={notes}
              setBackgroundColor={setBackgroundColor}
              setNotes={setNotes}
              edit={false}
              setImg={setImg}
              img={img}
              setNote={setNote}
              editedNoteId={editedNoteId}
            />
          }
        />
        <Route
          path={`/note/:noteId`}
          element={
            <NotePage
              setEditedNoteId={setEditedNoteId}
              note={note}
              setNote={setNote}
              notes={notes}
            />
          }
        />
        <Route
          path={`/EditNote/:noteId`}
          element={
            <AddOrEditNote
              setImg={setImg}
              img={img}
              backgroundColor={backgroundColor}
              notes={notes}
              setBackgroundColor={setBackgroundColor}
              setNotes={setNotes}
              note={note}
              setNote={setNote}
              editedNoteId={editedNoteId}
              edit={true}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
