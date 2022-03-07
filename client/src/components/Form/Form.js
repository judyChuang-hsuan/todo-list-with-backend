import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ name, setName, edit, setEdit, updateId }) => {
  //CREATE NEW TODO
  const postTodo = async () => {
    try {
      axios({
        method: "post",
        url: "http://localhost:5000/todo",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          name: name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //UPDATE T0D0
  const updateTodo = async (id) => {
    try {
      axios({
        method: "put",
        url: `http://localhost:5000/todos/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          id: id,
          name: name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detect the value's of the input
  const handleChange = (e) => {
    setName(e.target.value);
  };

  //handler for submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    postTodo();
    setName("");
  };

  //handler for update the todo list
  const handleUpdate = (e) => {
    e.preventDefault();
    updateTodo(updateId);
    setEdit(null);
    setName("");
  };

  return (
    <>
      {edit ? (
        <form className="form" onSubmit={handleUpdate}>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="update your list"
            required
          ></input>
          <button className="form-btn">UPDATE</button>
        </form>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="type your to-do list"
            required
          />
          <button className="form-btn">ADD</button>
        </form>
      )}
    </>
  );
};

export default Form;
