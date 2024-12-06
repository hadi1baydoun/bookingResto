import React, { useState, useEffect } from "react";
import { getAvailableTables } from "../../utils/getAvailableTables";
import "./reservationForm.css";
import Header from "../header/Header"; // Assuming Header component exists
import Navbar from "../navbar/Navbar"; // Assuming Navbar component exists
import MailList from "../mailList/MailList"; // Assuming MailList component exists
import Footer from "../footer/Footer"; // Assuming Footer component exists

const ReservationForm = () => {
  const [numGuests, setNumGuests] = useState("");
  const [preferredSeat, setPreferredSeat] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [rating, setRating] = useState(""); // New state for rating
  const [message, setMessage] = useState("");
  const [tablesNeeded, setTablesNeeded] = useState(0);
  const [availableTables, setAvailableTables] = useState(0);
  const [assignedTableIds, setAssignedTableIds] = useState([]);

  const seatingPreferences = {
    "near bar": [2, 3, 4], // Example table IDs near the bar
    "smoking area": [8, 9, 10], // Example table IDs in the smoking area
    outdoor: [14, 15, 16], // Example table IDs outdoors
  };

  useEffect(() => {
    // Fetch available tables when the component loads
    const fetchTables = () => {
      const tables = getAvailableTables();
      setAvailableTables(tables);
    };
    fetchTables();
  }, []);

  const isValidTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;

    const openingTime = 9 * 60; // 9 a.m. in minutes
    const closingTime = 25 * 60; // 1 a.m. (next day) in minutes

    return totalMinutes >= openingTime && totalMinutes <= closingTime;
  };

  const handleReservation = (e) => {
    e.preventDefault();
    const maxGuestsPerTable = 4;

    // Validate time
    if (!isValidTime(time)) {
      setMessage("Reservations are only allowed between 9 a.m. and 1 a.m.");
      return;
    }

    // Check age restriction for "near bar"
    if (preferredSeat === "near bar" && age < 18) {
      setMessage("You must be at least 18 years old to reserve seating near the bar.");
      return;
    }

    // Calculate the number of tables needed
    const calculatedTables = Math.ceil(numGuests / maxGuestsPerTable);
    setTablesNeeded(calculatedTables);

    if (numGuests > maxGuestsPerTable * availableTables) {
      setMessage(` `);
      return;
    }

    if (!preferredSeat || !seatingPreferences[preferredSeat]) {
      setMessage("Please select a valid seating preference.");
      return;
    }

    const availableSeats = seatingPreferences[preferredSeat].slice(0, calculatedTables);

    if (availableSeats.length < calculatedTables) {
      setMessage("We don't have enough tables in the ${preferredSeat} area to accommodate your reservation.");
      return;
    }

    setAssignedTableIds(availableSeats);
    setMessage(`Your reservation is confirmed! You will need ${calculatedTables} table(s): Table ID(s) ${availableSeats.join(", ")}.`);
  };

  return (
    <div>
      <Header /> {/* Header Component */}
      

      <form onSubmit={handleReservation} className="reservation-form">
        <h2>Make a Reservation</h2>

        <ul>
          <li>Underage customers cannot reserve near the bar.</li>
          <li>Reservations with a maximum of 4 guests must reserve 1 table.</li>
          <li>Each table is composed of 4 chairs.</li>
          <li>Reservations with more than 4 guests will have joined tables.</li>
        </ul>

        <div>
          <label htmlFor="date">Reservation Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="time">Reservation Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="numGuests">Number of Guests:</label>
          <input
            type="number"
            id="numGuests"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="age">Your Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="preferredSeat">Preferred Seating:</label>
          <select
            id="preferredSeat"
            value={preferredSeat}
            onChange={(e) => setPreferredSeat(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="near bar">Near the Bar</option>
            <option value="smoking area">Smoking Area</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>

        <div>
          <label htmlFor="rating">Rate Your Experience (1-5):</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Select a rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <button type="submit">Reserve Now</button>

        {message && <p>{message}</p>}
        {assignedTableIds.length > 0 && (
          <p>
            Assigned Table ID(s): {assignedTableIds.join(", ")}
          </p>
        )}
      </form>

      <MailList /> {/* MailList Component */}
      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default ReservationForm;
