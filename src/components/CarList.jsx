import React from "react";
import CarCard from "./CarCard";

function CarList({ cars, onDeleteCar, onUpdatePrice }) {
  return (
    <ul className="cards">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onDeleteCar={onDeleteCar}
          onUpdatePrice={onUpdatePrice}
        />
      ))}
    </ul>
  );
}

export default CarList;
