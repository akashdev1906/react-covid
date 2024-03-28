import React, { useState, useEffect } from 'react';

const ConBtn = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [selectedCountryData, setSelectedCountryData] = useState(null);

  useEffect(() => {
    getCountriesData();
  }, []);

  const getCountriesData = async () => {
    try {
      let data = await fetch(`https://coronavirus.m.pipedream.net/countries`);
      let countriesData = await data.json();
      console.log("btn Loading");
      setCountriesData(countriesData.rawData);
      const uniqueNames = Array.from(new Set(countriesData.rawData.map(country => country.Country_Region)));
      setUniqueCountries(uniqueNames);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = (country) => {
    // Find data for the clicked country
    const clickedCountryData = countriesData.find(countryData => countryData.Country_Region === country);
    // Update selected country data
    setSelectedCountryData(clickedCountryData);
  };

  return (
    <>
      {/* Display buttons for unique country names */}
      {uniqueCountries.map((country, index) => (
        <div className="btn mt-5 mb-5" key={index}>
          <button className="btn btn-primary mx-2 my-2" onClick={() => handleClick(country)}>
            {country}
          </button>
        </div>
      ))}
      {/* Display data for the selected country */}
      {selectedCountryData && (
        <div>
          <h2>{selectedCountryData.Country_Region}</h2>
          <p>Confirmed cases: {selectedCountryData.Confirmed}</p>
          <p>Deaths: {selectedCountryData.Deaths}</p>
          <p>Recovered: {selectedCountryData.Recovered}</p>
          {/* Add more data as needed */}
        </div>
      )}
    </>
  );
};

export default ConBtn;
