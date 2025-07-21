import React, { useState } from "react";
import Input from "@mohsensami/input";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

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
      <Input
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="رمز عبور"
      />
    </div>
  );
};

export default App;
