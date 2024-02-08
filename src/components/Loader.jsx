import Stamp from "./Stamp";

export default function Loader() {
  return (
    <>
      <div className="loader_background"></div>
      <div className="loader">
        <div className="loader_container">
          <div className="lds-heart">
            <div></div>
          </div>
          <Stamp />

          <div className="loader_txt">
            slike se uploduju molimo vas sačekajte
          </div>
        </div>
      </div>
    </>
  );
}
