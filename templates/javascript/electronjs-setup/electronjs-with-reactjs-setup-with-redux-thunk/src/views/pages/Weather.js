import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactWeather, { useOpenWeather } from 'react-open-weather';

function App() {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '279d89af44cb53ba0364a9564832aaf4',
    lat: '28.535517',
    lon: '77.391029',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  return (
    <div className="App">
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel="New Delhi"
        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
        showForecast
      />
    </div>
  );
}

export default App;