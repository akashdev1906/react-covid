import React, { useState, useEffect } from 'react';

const ConCard = () => {

    const [countriesData, setCountriesData] = useState([]);

    
  useEffect(() => {
    getCountriesData();
  }, []);

  const getCountriesData = async () => {
    try {
      let data = await fetch(
        `https://coronavirus.m.pipedream.net/countries`
      );
      let countriesData = await data.json();
      console.log(countriesData);
      setCountriesData(countriesData.rawData); // Set countriesData to the entire array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
     <div className="container">
        <div className="row">
          
       

        {countriesData.map((country, index) => (
          
          <div className="col-md-4 mb-5 mt-5" key={index} >
          <div className="card" style={{ width: "18rem" }} >
          <img src="https://images.unsplash.com/photo-1583324113626-70df0f4deaab?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="100%" height="200px" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"><span className="bold">Country : </span>{country.Country_Region}</h5>
            <p className="card-text"><span className="bold">State : </span>{country.Combined_Key.split(',')[0]}</p>

            <p className="card-text"><span className="bold">Confirmed Cases : </span>{country.Confirmed}</p>
            <p className="card-text"><span className="bold">Deaths : </span>{country.Deaths}</p>
            
          </div>
        </div>
        </div>


        ))}
      </div>
      </div>
    </>
  )
}

export default ConCard