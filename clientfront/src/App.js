import React, { useState } from 'react';
import axios from 'axios';

function TrainSearch() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);

  const handleSearch = () => {
    axios.get(`http://localhost:5000/search?source=${source}&destination=${destination}`)
      .then(res => {
        setTrains(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleSort = () => {
    const sortedTrains = [...trains].sort((a, b) => (a.fare > b.fare) ? 1 : -1);
    setTrains(sortedTrains);
  }

  return (
    <div
      style={{
        alignItems: "center",
        height: "100%",
        padding:"0px"

      }}
    >
      <h2>Train Search</h2>
      <label>Source:</label>
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value=""></option>
        <option value="banglore">banglore</option>
        <option value="mumbai">mumbai</option>
        <option value="vellore">vellore</option>
        <option value="mysuru">mysuru</option>
        <option value="manglore">manglore</option>
        <option value="chennai">chennai</option>
        // here we add more options for other stations
      </select>
      <label>Destination:</label>
      <select value={destination} onChange={(e) => setDestination(e.target.value)}>
        <option value=""></option>
        <option value="banglore">banglore</option>
        <option value="mumbai">mumbai</option>
        <option value="vellore">vellore</option>
        <option value="mysuru">mysuru</option>
        <option value="manglore">manglore</option>
        <option value="chennai">chennai</option>
        // Add more options for other stations
      </select>
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleSort}>Sort by Price</button>
      <br></br>
      <br></br>
      <table border={3} >
        <thead>
          <tr>
            <th>Name</th>
            <th>Starting from</th>
            <th>Departure Time</th>
            <th>Reaching</th>
            <th>Arrival Time</th>
            <th>Diatance</th>
            <th>Fare (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(train => (
            <tr key={train._id}>
              <td>{train.name}</td>
              <td>{train.route[0]}</td>
              <td>{train.schedule[0]}</td>
              <td>{train.route[1]}</td>
              <td>{train.schedule[1]}</td>
              <td>{train.distance}</td>
              <td>{(train.distance * 1.25).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainSearch;