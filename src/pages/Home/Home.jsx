import React, { useEffect } from "react";
import "./Home.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const Home = ({ notes, setNotes }) => {
  const trashHandler = (e, item) => {
    setNotes(
      notes.filter((note) => {
        return note.id !== item.id;
      })
    );
  };

  useEffect(() => {
    if (notes.length === 0 && JSON.parse(localStorage.getItem("notes"))) {
      setNotes(JSON.parse(localStorage.getItem("notes")));
    }
  }, []);
  return (
    <div className="section__padding">
      <div style={{ fontSize: "30px" }}>
        <h3>Notes</h3>
      </div>
      {Object.keys(notes).length > 0 ? (
        <div style={{ display: "flex" }} className="home__content_contener">
          <div className="notes__contener">
            {notes.map((item) => {
              return (
                <div
                  className="note__div_contener"
                  style={{ position: "relative" }}
                >
                  <Link to={`/note/${item.id}`}>
                    <div
                      key={item.id}
                      id={item.id}
                      style={{
                        backgroundColor: `${item.backgroundColor}`,
                        padding: "1rem",
                        paddingTop: "2rem",
                      }}
                      className="note__div"
                    >
                      <h3 style={{ marginBottom: "1rem" }}>{item.title}</h3>
                      <p
                        style={{
                          height: "68px",
                          overflowWrap: "break-word",
                          overflow: "hidden",
                        }}
                      >
                        {item.desc}
                      </p>
                      {item.img ? (
                        <img
                          style={{
                            position: "absolute",
                            bottom: "70px",
                            left: "50%",
                            transform: "translate(-50%)",
                            width: "80%",
                            objectFit: "cover",
                            minWidth: "210px",
                            height: "50%",
                            maxHeight: "150px",
                            objectPosition: "center",
                            minHeight: "110px",
                            borderRadius: "10px",
                          }}
                          src={item.img}
                        />
                      ) : null}
                    </div>
                  </Link>
                  <FaTrashAlt
                    onClick={(e) => {
                      trashHandler(e, item);
                    }}
                    className="home__trash_icon"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p style={{ marginBlock: "30px" }}>
          there is no notes create your first one!!
        </p>
      )}
      <div className="home__add_note">
        <Link to="/AddNote">
          <AiFillPlusCircle size="3.3rem" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
