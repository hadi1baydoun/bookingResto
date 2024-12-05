import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPerson, faUtensils } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [restaurantDest, setRestaurantDest] = useState("");
  const [tables, setTables] = useState({
    Adult: 1,
    Children: 0,
    table: 1,
  });
  const [time, setTime] = useState("10:00 PM");  // Default time

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const handleOptionChange = (field, operation) => {
    setTables((prev) => ({
      ...prev,
      [field]: operation === "increase" ? prev[field] + 1 : Math.max(prev[field] - 1, 0),
    }));
  };

  const totalGuests = tables.Adult + tables.Children;
  const {dispatch} = useContext(SearchContext);
  
  const handleSearch = () => {
    navigate("/resto", {
      state: { restaurantDest, date, options: tables, time }, // Pass the time along with other data
    });
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value); // Update selected time
  };

  return (
    <div className="header">
      <div className={type ==="list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUtensils} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUtensils} />
            <span>To Go</span>
          </div>
        </div>
        { type !== "list" &&
        <>
        <h1 className="headerTitle">Reserve at the best restaurants in Beirut</h1>
        <p className="headerDesc">Discover Exceptional Dining Experiences in the Heart of City</p>
        {!user && 
        <button className="headerBtn" aria-label="Sign In or Register">Sign In / Register</button>}
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faUtensils} className="headerIcon" />
            <input
              type="text"
              placeholder="Where would you like to dine today?"
              className="headerSearchInput"
              onChange={e=>setRestaurantDest(e.target.value)}
            />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
              {format(date[0].startDate, "MM/dd/yyyy")}
            </span>
            {openDate && (
              <DateRange
                editableDateInputs
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
                showDateDisplay={false}  // Show only the selected date
                months={1}
                direction="horizontal"
              />
            )}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
              className="headerSearchText"
              onClick={() => setOpenOptions(!openOptions)}
            >
              {`${totalGuests} Guests - ${tables.Adult} Adults - ${tables.Children} Children`}
            </span>
            {openOptions && (
              <div className="options">
                {["Adult", "Children"].map((field) => (
                  <div className="optionItem" key={field}>
                    <span className="optionText">{field}</span>
                    <div className="optionCounter">
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOptionChange(field, "decrease")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">{tables[field]}</span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOptionChange(field, "increase")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <label>Time</label>
            <select value={time} onChange={handleTimeChange}>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="9:00 PM">9:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="11:00 PM">11:00 PM</option>
              <option value="12:00 AM">12:00 AM</option>

            </select>
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" aria-label="Search for reservations" onClick={handleSearch}>Search</button>
          </div>
        </div>
        </>}
      </div>
    </div>
  );
};

export default Header;
