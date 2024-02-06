import { useContext, useRef, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import LogoMobile from "./components/LogoMobile";
import UploadIcon from "./components/UploadIcon";
import { ViewportContext } from "./context/ViewportContext";

function App() {
  const { width } = useContext(ViewportContext);
  const breakepoint = 570;
  const fileInputRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState("Podelite svoje uspomene sa nama");

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;
    fileInputRef.current.files.length < 1
      ? setStatus("Prvo morate izabrati slike za upload.")
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
        setStatus("Slike su uploadovane!");
      } catch (error) {
        console.log("error");
        setStatus("Nešto nije uredu, probajte ponovo.");
      }
    }
  };

  const handleFileChange = () => {
    setStatus("Podelite svoje uspomene sa nama");
  };

  return (
    <div className="App">
      <div className="app_window">
        <div className="logo">
          {width > breakepoint ? <Logo /> : <LogoMobile />}
          <span>03.08.2024</span>
        </div>
        <h1>{status}</h1>
        <div className="data_input">
          <div className="input_container">
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <button onClick={handleFileUpload}>
            Uplaod <UploadIcon />
          </button>
        </div>
      </div>
      <div className="app_signiture">designed and created by mrkydesign</div>
      {load ? <Loader /> : <span></span>}
    </div>
  );
}

export default App;
