import React, { useState } from "react";

function CarCard({ car, onDeleteCar, onUpdatePrice }) {
  const [isSoldOut, setIsSoldOut] = useState(false);

  function handleToggleAvailability() {
    setIsSoldOut(!isSoldOut);
  }

  function handleDelete() {
    fetch(`http://localhost:3000/cars${car.id}`, {
      method: "DELETE"
    }).then(() => onDeleteCar(car.id));
  }

  function handlePriceUpdate(e) {
    const newPrice = parseFloat(e.target.value);
    fetch(`http://localhost:3000/cars${car.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price: newPrice })
    })
      .then((response) => response.json())
      .then((updatedCar) => {
        onUpdatePrice(updatedCar);
      });
  }

  return (
    <li className="card">
      <img src={car.image} alt={`${car.make} ${car.model}`} />
      <h4>{car.make} {car.model} ({car.year})</h4>
      <p>Price: ${car.price}</p>
      <input
        type="number"
        step="0.01"
        defaultValue={car.price}
        onBlur={handlePriceUpdate}
      />
      <button onClick={handleToggleAvailability} className={isSoldOut ? "" : "primary"}>
        {isSoldOut ? "Sold Out" : "Available"}
      </button>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
    </li>
  );
}

export default CarCard;
