import React, { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AddNote from "./pages/AddNote/AddNote";
import NotePage from "./pages/NotePage/NotePage";
import EditNote from "./pages/EditNote/EditPage";
const App = () => {
  const [backgroundColor, setBackgroundColor] = useState("#f7ed59");
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState([]);
  const [editedNoteId, setEditedNoteId] = useState(0);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    } else {
      localStorage.clear();
    }
  }, [notes]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home notes={notes} setNotes={setNotes} />} />
        <Route
          path="/AddNote"
          element={
            <AddNote
              backgroundColor={backgroundColor}
              notes={notes}
              setBackgroundColor={setBackgroundColor}
              setNotes={setNotes}
              edit={false}
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
            <AddNote
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
