import React, { useState, useEffect } from "react";
import { getAvailableTables } from "../../utils/getAvailableTables";
import "./reservationForm.css";

const ReservationForm = () => {
  const [numGuests, setNumGuests] = useState("");
  const [preferredSeat, setPreferredSeat] = useState("");
  const [age, setAge] = useState("");
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

  const handleReservation = (e) => {
    e.preventDefault();
    const maxGuestsPerTable = 4;

    // Check age restriction for "near bar"
    if (preferredSeat === "near bar" && age < 18) {
      setMessage("You must be at least 18 years old to reserve seating near the bar.");
      return;
    }

    // Calculate the number of tables needed
    const calculatedTables = Math.ceil(numGuests / maxGuestsPerTable);
    setTablesNeeded(calculatedTables);

    if (numGuests > maxGuestsPerTable * availableTables) {
      setMessage(
        `We currently don't have enough tables to accommodate ${numGuests} guests. Please adjust your reservation.`
      );
      return;
    }

    if (!preferredSeat || !seatingPreferences[preferredSeat]) {
      setMessage("Please select a valid seating preference.");
      return;
    }

    const availableSeats = seatingPreferences[preferredSeat].slice(0, calculatedTables);

    if (availableSeats.length < calculatedTables) {
      setMessage(
        `We don't have enough tables in the ${preferredSeat} area to accommodate your reservation.`
      );
      return;
    }

    setAssignedTableIds(availableSeats);
    setMessage(
      `Your reservation is confirmed! You will need ${calculatedTables} table(s): Table ID(s) ${availableSeats.join(
        ", "
      )}.`
    );
  };

  return (
    <form onSubmit={handleReservation} className="reservation-form">
      <h2>Make a Reservation</h2>

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

      <button type="submit">Reserve Now</button>

      {message && <p>{message}</p>}
      {assignedTableIds.length > 0 && (
        <p>
          Assigned Table ID(s): {assignedTableIds.join(", ")}
        </p>
      )}
    </form>
  );
};

export default ReservationForm;
