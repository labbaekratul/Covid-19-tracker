import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, GeoJSON,onEachFeature,} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import gobalImg from "./img/global.png";
import axios from "axios";
import "./GrapMap.css";
import mapData from "./data/countries.json";
import {showDataOnMap} from './sorting'

function GrapMap({ center, zoom, storeData, countries }) {
  // const a = [34.80746, -40.4796];
  const [gobals, setGobals] = useState([]);
  
  


  

  const countryStyle={
    fillColor: "whitesmoke",
    fillOpacity: 0.8,
    color: "orange",
    weight: 1,
  }

 
 const onEachCountry = (country, layer) =>{
    const countryName= country.properties.ADMIN;
    layer.bindPopup(countryName);
    layer.on({
      click: (event)=>{
        event.target.setStyle({
          color: "green",
          fillColor: "gray",
        })
      }
    })

  }


  useEffect(() => {
    async function getdatas() {
      const inform = await axios.get(`https://corona.lmao.ninja/v2/all?today`);
      setGobals(inform.data);
    }

    getdatas();
  }, []);


  const num = 500000;
  const img = gobalImg;
  const fillRedOptions = { fillColor: "green",
fillOpacity: 0.4};

  console.log(storeData == undefined ? img : storeData.flag);
  
  //map logo toggler

  return (
    <div className="map">
      <div className="map_box">
        <MapContainer
          center={
            storeData == undefined
              ? [34.80746, -40.4796]
              : [storeData.lat, storeData.long]
          }
          zoom={zoom}
          scrollWheelZoom={false}
        > 
             <GeoJSON style={countryStyle} data={mapData.features} onEachFeature={onEachCountry} />
             
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
            {showDataOnMap (countries)
            
            
            }

       
          {/* <Marker
              
            position={
              storeData == undefined
                ? [34.80746, -40.4796]
                : [storeData.lat, storeData.long]   
            }
          
          > */}
         
          <Popup
            className="map__info__div"
            position={
              storeData == undefined
                ? [34.80746, -40.4796]
                : [storeData.lat, storeData.long]
            }
          >
            <img
              className="map__flag"
              src={storeData == undefined ? img : storeData.flag}
            />
            <small className="map__info">
              Country :
              {center.country ? center.country : 'Global'}
            </small>
            <br />
            <small className="map__info">
              Cases : {center.cases ? center.cases : gobals.cases}
            </small>
            <br />
             <small className="map__info">
              Recovered : {center.cases ? center.recovered : gobals.recovered}
            </small>
            <br />
            <small className="map__info">
              Deaths : {center.deaths ? center.deaths : gobals.deaths}
            </small>
          </Popup>
          {/* </Marker> */}
        </MapContainer>
      </div>
    </div>
  );
}

export default GrapMap;
