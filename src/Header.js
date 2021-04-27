import React, { useState, useEffect } from "react";
import "./Header.css";
import img from "./img/undraw_medical_research_qg4d.png";
import axios from "axios";
import Body from "./Body";
import covid from "./img/covid-19.png";

function Header({ countries }) {
  const [search, setSearch] = useState([null]);
  const [select, setSelect] = useState("");
  const [datas, setDatas] = useState([]);
  const [storeData, setStoreData] = useState();
  const [mapZoom, setMapZoom] = useState(2);

  const all = "all";

  useEffect(() => {
    async function getdata() {
      const data = await axios.get(`https://corona.lmao.ninja/v2/all?today`);

      setDatas(data.data);
    }
    getdata();
  }, []);

  useEffect(() => {
    async function getSearch() {
      const data = await axios.get(
        `https://corona.lmao.ninja/v2/countries/${select}?today=true&strict=true&query`
      );

      setSearch(data.data);
      setStoreData(data.data.countryInfo);
    }
    getSearch();
  }, [select, all]);

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-12 header__title">
            <h1 className="header__title_h1">
              COVID-19
              <span>
                <img src={covid} className="covid_logo" />
              </span>
              TRACKER
            </h1>
            <img src={img} className="header__img" />
            <div className="box">
              <select onChange={(e) => setSelect(e.target.value)}>
                <option value={""}>World-wide</option>
                {countries.map((data) => (
                  <option value={data.country} key={data.id}>
                    {data.country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <Body
        datas={datas}
        search={search}
        countries={countries}
        storeData={storeData}
        zoom={mapZoom}
      />
    </div>
  );
}

export default Header;
