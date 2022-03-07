import React, { useState } from "react";
import axios from "axios";
import {
  MdDone,
  MdEdit,
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
const Message = ({ li, setName, setEdit, setUpdateId }) => {
  const [open, setOpen] = useState(false);

  //DELETE TODOLIST
  const deleteTodo = async (id) => {
    try {
      const list = await axios({
        method: "delete",
        url: `http://localhost:5000/todos/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //open Sidebar when the screen size is below 768px
  const openHandler = (id) => {
    setUpdateId(id);
    setOpen(!open);
  };

  //update the todo-list
  const handleUpdate = (data) => {
    setEdit(data);
    setUpdateId(data.id);
    setName(data.name);
  };
  return (
    <div key={li.id} className="list">
      <h3 className="list-title">{li.name}</h3>
      <button className="list-show" onClick={() => openHandler(li.id)}>
        {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </button>
      <div className={open ? "btn-section-open" : "btn-section"}>
        <button className="list-btn">
          <MdDone onClick={() => deleteTodo(li.id)} />
        </button>
        <button className="list-btn">
          <MdEdit onClick={() => handleUpdate(li)} />
        </button>
        <button className="list-btn">
          <MdDelete onClick={() => deleteTodo(li.id)} />
        </button>
      </div>
    </div>
  );
};

export default Message;
