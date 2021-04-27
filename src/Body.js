import React from "react";
import "./Body.css";
import img1 from "../src/img/undraw_medical_care_movn.png";
import img2 from "../src/img/undraw_medicine_b1ol.png";
import img3 from "../src/img/undraw_rising_8svm.png";
import MapAndChart from "./MapAndChart";
function Body({ datas, search, countries, storeData, zoom }) {
  const date = new Date();

  return (
    <div className="body">
      <div className="container">
        <div className="row body_card">
          <div className="col-12 col-md-4 report-box">
            <div className="single_card card1">
              <img src={img2} className="single_card__img" />
              <div className="card_deatils">
                <p>Total Infected</p>
                <h2>{search.cases || datas.cases}</h2>
                <p>Today Infected</p>
                <h3>{search.todayCases || datas.todayCases}</h3>
                <p> {date.toUTCString()}</p>
                <h4>Continent : {search.continent || "Global"}</h4>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 report-box">
            <div className="single_card card2">
              <img src={img1} className="single_card__img" />
              <div className="card_deatils">
                <p>Total Recovered</p>
                <h2>{search.recovered || datas.recovered}</h2>
                <p>Today Recovered</p>
                <h3>{search.todayRecovered || datas.todayRecovered}</h3>
                <p> {date.toUTCString()}</p>
                <h4>Number of tests : {search.tests || datas.tests}</h4>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 report-box">
            <div className="single_card card3">
              <img src={img3} className="single_card__img" />
              <div className="card_deatils">
                <p>Total Deaths</p>
                <h2>{search.deaths || datas.deaths}</h2>
                <p>Today Deaths</p>
                <h3>
                  {search.todayDeaths ||
                    `${datas.todayDeaths} global / ( ${
                      search.country ? search.country : "Unkown"
                    } = 0)`}
                </h3>
                <p> {date.toUTCString()}</p>
                <h4>
                  One death per people :
                  {search.oneDeathPerPeople || datas.oneDeathPerPeople}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MapAndChart
        search={search}
        countries={countries}
        storeData={storeData}
        zoom={zoom}
      />
    </div>
  );
}

export default Body;
