import { FormControl, MenuItem, Select, Card, CardContent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import InfoBox from '../covidTracker/InfoBox';
import Map from '../covidTracker/Map';
import Table from '../covidTracker/Table';
import '../covidTracker/App2.css';
import '../covidTracker/Table.css';
import { sortData } from '../covidTracker/util';
import LineGraph from '../covidTracker/LineGraph';
import "leaflet/dist/leaflet.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function CovidTrackerPage() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");


  useEffect (() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, []);
  
  useEffect (() => {
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data, casesType);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
          //console.log("CHECK THIS", tableData);
      });      
    };    
    getCountriesData();
  }, [casesType]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
          isRed
          active={casesType ==="cases"}
          onClick={e => setCasesType("cases")}
          title="Coronavirus Cases"
          cases={countryInfo.todayCases}
          total={countryInfo.cases}
          />
          <InfoBox
          active={casesType ==="recovered"}
          onClick={e => setCasesType("recovered")}
          title="Recovered"
          cases={countryInfo.todayRecovered}
          total={countryInfo.recovered}
          />
          <InfoBox
          isRed
          active={casesType ==="deaths"}
          onClick={e => setCasesType("deaths")}
          title="Deaths"
          cases={countryInfo.todayDeaths}
          total={countryInfo.deaths}
          />
        </div>  
        
        <Map
        casesType={casesType}
        countries={mapCountries}
        center={mapCenter}
        zoom={mapZoom}
        />
      
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Total {capitalizeFirstLetter(casesType)} by Country</h3>
          <Table countries={tableData} casesType={casesType} />
          <h3 className="linegraph__space">Worldwide New {capitalizeFirstLetter(casesType)}</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>        
      </Card>     
    </div>
    
  );
}

export default CovidTrackerPage;
