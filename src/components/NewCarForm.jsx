import React, { useState } from "react";

function NewCarForm({ onAddCar }) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    image: "",
    price: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newCar = {
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      image: formData.image,
      price: parseFloat(formData.price)
    };

    fetch("https://json-sever-xcgn.onrender.com/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCar)
    })
      .then((response) => response.json())
      .then((data) => {
        onAddCar(data);
        setFormData({ make: "", model: "", year: "", image: "", price: "" });
      });
  }

  return (
    <div className="new-car-form">
      <h2>New Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="make"
          placeholder="Car make"
          value={formData.make}
          onChange={handleChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Car model"
          value={formData.model}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default NewCarForm;
