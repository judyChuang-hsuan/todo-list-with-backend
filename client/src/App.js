import { useState } from "react";
import Form from "./components/Form/Form";
import List from "./components/List/List";
function App() {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(null);
  //decide which todo we choose
  const [updateId, setUpdateId] = useState(0);

  return (
    <div className="main">
      <h1>What's your plan today?</h1>
      <Form
        name={name}
        setName={setName}
        edit={edit}
        setEdit={setEdit}
        updateId={updateId}
      />
      <List
        name={name}
        setName={setName}
        setEdit={setEdit}
        setUpdateId={setUpdateId}
      />
    </div>
  );
}

export default App;
