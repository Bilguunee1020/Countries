"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/independent?status=true"
      );
      const response = await res.json();
      setData(response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data.length < 1) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <div className="main">
        <h1>All Countries</h1>
      </div>
      <div className="header">
        <h2 className="txt">195 Countries in the world right now</h2>
        <input className="search" placeholder="Search here..." />
  </div>
      <div className="container">
        {data.map((country) => (
          <div className="country_card" key={country.cca3}>
            <img
              src={country.flags.png}
              alt={`Flag of {country.name.common}`}
              className="flag"
            />
            <h2 className="name">{country.name.common}</h2>
            <p className="region">{country.region}</p>
            <p className="population">
              Population: {country.population.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
