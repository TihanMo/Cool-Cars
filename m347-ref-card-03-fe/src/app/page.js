"use client"

import { useState, useEffect } from "react";
import CarForm from "@/app/carform/page";
import Link from "next/link";

export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  }, []);

  function buttonHandler() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`)
      .then((response) => response.json())
      .then((data) => setCars(data));
  }

  return (
    <div className="App">
      <h1>My Frontend - The very beginning</h1>
      <button onClick={buttonHandler}>load cars</button>
      <br />
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand + " " + car.model + " (" + car.horsePower + ")"}
          </li>
        ))}
      </ul>
      <Link href="/carform">add a new car</Link>
    </div>
  );
}
