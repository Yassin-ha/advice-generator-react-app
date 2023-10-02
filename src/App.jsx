import "./App.css";
import dice from "../public/icon-dice.svg";
import desktopDivider from "../public/pattern-divider-desktop.svg";
import MobileDivider from "../public/pattern-divider-mobile.svg";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const url = "https://api.adviceslip.com/advice";
function App() {
  const [loading, setLoading] = useState(true);
  const [RandomAdvice, setAdvice] = useState(null);
  const [reFetchData, setReFetchData] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAdvice(data.slip);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setReFetchData(false);
  };

  useEffect(() => {
    fetchData();
  }, [reFetchData]);

  if (loading) {
    return <Loading />;
  }

  const { id, advice } = RandomAdvice;
  return (
    <main>
      <section className="card">
        <div className="container">
          <h5 className="card-title">advice #{id}</h5>
          <q>{advice}</q>

          <div className="icon">
            <picture>
              <source media="(min-width: 768px)" srcSet={desktopDivider} />
              <img src={MobileDivider} />
            </picture>
          </div>
          <button
            className="btn"
            onClick={() => {
              setReFetchData(true);
            }}
          >
            <img src={dice} alt="logo" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
