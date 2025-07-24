import React, { useEffect, useState } from "react";
import Input from "@mohsensami/input";

const App = () => {
  const [noEnglish, setNoEnglish] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    console.log(noEnglish);
    console.log(number);
  }, [noEnglish, number]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <Input
        type="noEnglish"
        value={name}
        onChange={setNoEnglish}
        placeholder="noEnglish"
        maxLength={10}
      />
      <Input
        type="number"
        value={number}
        onChange={setNumber}
        placeholder="سن (فقط عدد)"
        maxLength={8}
      />
    </div>
  );
};

export default App;
