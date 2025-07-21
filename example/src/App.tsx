import React, { useState } from "react";
import Input from "@mohsensami/input";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">فرم نمونه</h1>

      <Input
        value={name}
        onChange={setName}
        placeholder="فقط حروف فارسی یا انگلیسی"
        onlyLetters
        maxLength={20}
      />

      <Input
        value={age}
        onChange={setAge}
        placeholder="فقط عدد وارد کنید"
        onlyNumbers
        type="number"
      />

      <p className="mt-4">
        نام: {name} <br />
        سن: {age}
      </p>
    </div>
  );
};

export default App;
