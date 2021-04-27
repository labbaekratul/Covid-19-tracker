import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.css";
import axios from "axios";
import "leaflet/dist/leaflet.css";





function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function getCountries() {
      const { data } = await axios.get(
        `https://corona.lmao.ninja/v2/countries?today=true&strict=true&query`
      );

      setCountries(data);
    }
    getCountries();
  }, []);

  return (
    <div className="App">
      
          <Header countries={countries} />
    
     
    </div>
  );
}

export default App;
