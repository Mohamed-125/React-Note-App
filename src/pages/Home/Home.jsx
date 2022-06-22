import { Notes } from "./Notes";
import React, { useEffect } from "react";
import "./Home.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Search from "../../componets/Search";
import axios from "axios";
const Home = ({
  notes,
  setNotes,
  setSearchWord,
  searchWord,
  setFilteredNotes,
  filteredNotes,
}) => {
  const trashHandler = (e, item) => {
    axios
      .delete(
        `https://62948189a7203b3ed06a58f3.mockapi.io/news/notes/${item.id}`
      )
      .then((res) => setNotes(notes.filter((note) => note.id !== res.data.id)));
  };

  return (
    <div className="section__padding">
      <div style={{ fontSize: "30px" }}>
        <h3>Notes</h3>
      </div>
      <div>
        <Search
          notes={notes}
          setSearchWord={setSearchWord}
          setFilteredNotes={setFilteredNotes}
        />
      </div>
      <Notes
        setSearchWord={setSearchWord}
        filteredNotes={filteredNotes}
        notes={notes}
        trashHandler={trashHandler}
      />
      <div className="home__add_note">
        <Link to="/AddNote">
          <AiFillPlusCircle size="3.3rem" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
