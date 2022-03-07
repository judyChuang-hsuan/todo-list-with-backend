import React, { useState, useEffect } from "react";
import axios from "axios";
import Message from "../Message/Message";

const List = ({ setName, setEdit, setUpdateId }) => {
  const [list, setList] = useState([]);

  //FETCH TODOLIST
  const fetchTodo = async (url) => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch the data
  useEffect(() => {
    fetchTodo("http://localhost:5000/todos");
  }, []);
  return (
    <div className="list-section">
      {list.map((li) => (
        <Message
          key={li.id}
          li={li}
          setName={setName}
          setEdit={setEdit}
          setUpdateId={setUpdateId}
        />
      ))}
    </div>
  );
};

export default List;
