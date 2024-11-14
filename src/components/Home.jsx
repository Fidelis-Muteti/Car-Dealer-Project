import React, { useEffect, useState } from "react";
import NewCarForm from "./NewCarForm";
import CarList from "./CarList";
import Search from "./Search";

function Home() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

 
  useEffect(() => {
    fetch("https://json-sever-xcgn.onrender.com/cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

 
  function handleAddCar(newCar) {
    setCars([...cars, newCar]);
  }

 
  function handleDeleteCar(id) {
    setCars(cars.filter((car) => car.id !== id));
  }

 
  function handleUpdatePrice(updatedCar) {
    setCars(
      cars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
    );
  }

  
  const displayedCars = cars.filter((car) =>
    `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <h1>Welcome to F&M car Dealers</h1>
      <NewCarForm onAddCar={handleAddCar} />
      <Search onSearchChange={setSearchTerm} />
      <CarList
        cars={displayedCars}
        onDeleteCar={handleDeleteCar}
        onUpdatePrice={handleUpdatePrice}
      />
    </main>
  );
}

export default Home;
