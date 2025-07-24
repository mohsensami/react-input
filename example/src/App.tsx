import React, { useEffect, useState } from "react";
import Input from "@mohsensami/input";

const App = () => {
  const [noEnglish, setNoEnglish] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Input
        type="noEnglish"
        value={noEnglish}
        onChange={setNoEnglish}
        placeholder="noEnglish"
        maxLength={10}
      />
      <Input
        type="number"
        value={number}
        onChange={setNumber}
        formatNumberWithCommas
        placeholder="number"
        maxLength={8}
      />
      <Input
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="password"
        maxLength={8}
      />
    </div>
  );
};

export default App;
