import { useState } from "react";

import "./App.css";
import { Modal } from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <button onClick={() => setShowModal(true)}>modal</button>
      <Modal
        header="title"
        onClose={() => setShowModal(false)}
        showModal={showModal}
        size="xl"
      >
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit iure vel
          fuga, tenetur excepturi doloremque commodi voluptatem officiis
          blanditiis maxime magnam consequatur asperiores quidem. Et, error
          officiis. Nostrum, laborum ad?
        </p>
      </Modal>
    </>
  );
}

export default App;
