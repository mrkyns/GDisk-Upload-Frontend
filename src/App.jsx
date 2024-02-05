import { useRef, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import Moto from "./components/Moto";

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

  const handleFileChange = () => {
    setStatus("");
  };

  return (
    <div className="App">
      <div className="app_window">
        <Logo />
        <h1>Podelite svoje uspomene sa nama</h1>
        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button onClick={handleFileUpload}>Uplaod Files</button>
        </div>
      </div>
      <div className="app_signiture">designed and created by mrkydesign</div>
      {load ? <Loader /> : <span></span>}
      <h1>{status}</h1>
    </div>
  );
}

export default App;
