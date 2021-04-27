import React, { useState, useEffect } from "react";
import "./MapAndChart.css";
import axios from "axios";
import { sortData } from "./sorting";
import GrapMap from "./GrapMap";

function MapAndChart({ search, countries, storeData, zoom }) {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    async function getChartData() {
      const chartdata = axios
        .get(
          "https://corona.lmao.ninja/v2/countries?today=true&strict=true&query"
        )
        .then((res) => {
          const mapdata = res.data;
          const sortedData = sortData(res.data);
          setChart(sortedData);
        });
    }

    getChartData();
  }, []);

  return (
    <div className="mapAndchart">
      <div className="container">
        <div className="row mapAndchart__row">
          <div className="col-12 col-lg-9 mapAndchart__map">
            <GrapMap
              center={search}
              zoom={zoom}
              countries={countries}
              storeData={storeData}
            />
          </div>
          <div className="col-12 col-lg-3 mapAndchart__chart">
            <h2 className="char__heading">
              Overall Recent Cases of All Countries
            </h2>
            <div className="chard_heading">
              <p>Country</p>
              <p>Cases</p>
            </div>
            <div className="scroll_area">
              {chart.map((info, i) => (
                <div className="mapAndchart__countryNchart" key={info.id}>
                  <p className="mapAndchart__country">{`${i + 1} : ${
                    info.country
                  }`}</p>
                  <p className="mapAndchart__cases">{info.cases}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapAndChart;
