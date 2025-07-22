import React, { useEffect, useState } from "react";
import Input from "@mohsensami/input";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    console.log(name);
    console.log(age);
  }, [age, name]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <Input
        type="letters"
        value={name}
        onChange={setName}
        placeholder="نام (فقط حروف)"
        maxLength={10}
      />
      <Input
        type="number"
        value={age}
        onChange={setAge}
        placeholder="سن (فقط عدد)"
        maxLength={8}
      />
    </div>
  );
};

export default App;
