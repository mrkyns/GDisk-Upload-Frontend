import { useRef, useState } from "react";
import "./App.css";

function App() {
  const fileInputRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState();

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;
    fileInputRef.current.files.length < 1
      ? setStatus("You need to select images first")
      : setStatus("");

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
        setLoad(false);
        setStatus("Images uploaded");
      } catch (error) {
        console.log("error");
        setStatus("Something went wrong");
      }
    }
  };

  return (
    <div className="App">
      <h1>Google photo upload</h1>
      <input type="file" multiple accept="image/*" ref={fileInputRef} />
      <button onClick={handleFileUpload}>Uplaod Files</button>
      {load ? <h1>upload in progres</h1> : <span></span>}
      <h1>{status}</h1>
    </div>
  );
}

export default App;
