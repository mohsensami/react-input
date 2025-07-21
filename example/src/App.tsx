import React, { useState } from "react";
import Input from "@mohsensami/input";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <Input
        type="letters"
        value={name}
        onChange={setName}
        placeholder="نام (فقط حروف)"
      />
      <Input
        type="number"
        value={age}
        onChange={setAge}
        placeholder="سن (فقط عدد)"
      />
    </div>
  );
};

export default App;
