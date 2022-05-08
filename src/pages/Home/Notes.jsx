import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Notes({ notes, setSearchWord, filteredNotes, trashHandler }) {
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify([...notes]));
  }, [notes]);
  return (
    <div>
      {notes.length > 0 ? (
        <div
          style={{
            display: "grid",
          }}
          className="home__content_contener"
        >
          <div className="notes__contener">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((item) => {
                return (
                  <div
                    className="note__div_contener"
                    style={{
                      position: "relative",
                    }}
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
                        <h3
                          style={{
                            marginBottom: "1rem",
                          }}
                        >
                          {item.title}
                        </h3>
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
                        setSearchWord([""]);
                      }}
                      className="home__trash_icon"
                    />
                  </div>
                );
              })
            ) : (
              <p style={{ marginBottom: "2rem" }}>no note with this name</p>
            )}
          </div>
        </div>
      ) : (
        <p
          style={{
            marginBlock: "30px",
          }}
        >
          there is no notes create your first one!!
        </p>
      )}
    </div>
  );
}
