import { useRef, useState } from "react";
import "./App.css";

function App() {
  const fileInputRef = useRef(null);

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;

    if (files.length > 0) {
      const formData = new FormData();
      setLoad(true);

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        const response = await fetch(
          "https://google-drive-upload-brana.onrender.com/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log("upload files: ", data.files);
      } catch (error) {
        console.log("error");
      }
    }
  };

  return (
    <div className="App">
      <h1>Google photo upload</h1>
      <input type="file" multiple ref={fileInputRef} />
      <button onClick={handleFileUpload}>Uplaod Files</button>
    </div>
  );
}

export default App;
