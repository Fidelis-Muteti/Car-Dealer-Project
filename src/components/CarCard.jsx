import React, { useState } from "react";

function CarCard({ car, onDeleteCar, onUpdatePrice }) {
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    make: car.make,
    model: car.model,
    year: car.year,
    price: car.price,
    image: car.image
  });

  function handleToggleAvailability() {
    setIsSoldOut(!isSoldOut);
  }

  function handleDelete() {
    fetch(`http://localhost:3000/cars/${car.id}`, {
      method: "DELETE"
    }).then(() => onDeleteCar(car.id));
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/cars/${car.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
        image: formData.image
      })
    })
      .then((response) => response.json())
      .then((updatedCar) => {
        onUpdatePrice(updatedCar);
        setIsEditing(false);
      });
  }

  return (
    <li className="card">
      <img src={car.image} alt={`${car.make} ${car.model}`} />
      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="edit-form">
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleInputChange}
            placeholder="Make"
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            placeholder="Model"
          />
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="Year"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h4>{car.make} {car.model} ({car.year})</h4>
          <p>Price: ${car.price}</p>
          <button onClick={handleToggleAvailability} className={isSoldOut ? "" : "primary"}>
            {isSoldOut ? "Sold Out" : "Available"}
          </button>
          <button onClick={handleEditClick} className="edit-button">
            Edit
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default CarCard;
