import {Circle, Popup} from 'react-leaflet';
import React,{useContext} from 'react'

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });

  return sortedData;
};



// https://corona.lmao.ninja/v2/countries?today=true&strict=true&query

const casesTypeColors = {
  cases : {   
    hex: "#CC1034",
    multiplier: 400
  },
    recovered : {   
    hex: "#7dd71d",
    multiplier: 1200
  },
    deaths : {   
    hex: "#fb4443",
    multiplier: 2000
  }
}


 


 



export const showDataOnMap = (data, casesType='cases') =>(
  data.map(country =>(
    <Circle
    center={[country.countryInfo.lat,country.countryInfo.long]}
    color={casesTypeColors[casesType].hex}
    radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
    >
        <Popup>

              <div className='popup__container'>
               <img src={country.countryInfo.flag}  className='bc__img'/>
                 <div className='popup__country'> {country.country}</div>
             <div className='popup__cases'>Cases : {country.cases}</div>
              <div className='popup__recovered'>recovered : {country.recovered}</div>
              <div className='popup__deaths'>deaths : {country.deaths}</div>
              </div>
             
             
            
        </Popup>
    </Circle>

  ))
)




 






