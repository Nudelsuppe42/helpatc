import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import useSWR from "swr";

const Home: NextPage = () => {
  const { data, error } = useSWR("http://localhost:8080?whazzup=true");
  return (
    <div>
      <nav>
        <div className="navContainer">
          <span className="navBrand">
            <a href="/">
              <div className="menuLogo"></div>
            </a>
          </span>
        </div>
      </nav>
      <div className="container">
        <div
          className="sliderContainer"
          style={{
            backgroundImage: "url(/slider_bg.png)",
          }}
        >
          <h1>IVAO ATC TOOL</h1>
          <h5>Theo Reuter</h5>

        </div>
        <div className="section">
          <p>IVAO</p>
          <div className="sectionElement" style={{ width: "200px" }}>
            <p>gg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
