import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPerson, faUtensils } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";
import List from "../../pages/list/List";

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
  });

  const navigate = useNavigate()

  const handleOptionChange = (field, operation) => {
    setTables((prev) => ({
      ...prev,
      [field]: operation === "increase" ? prev[field] + 1 : Math.max(prev[field] - 1, 0),
    }));
  };

  const totalGuests = tables.Adult + tables.Children;

  const handleSearch = ()=>{
    navigate("/resto", {state:{restaurantDest, date, openOptions}})

  }

  return (
    <div className="header">
      <div className= {type ==="list" ? "headerContainer listMode" : "headerContainer"}>
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
        <button className="headerBtn" aria-label="Sign In or Register">Sign In / Register</button>
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
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
            </span>
            {openDate && (
              <DateRange
                editableDateInputs
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
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
            <button className="headerBtn" aria-label="Search for reservations" onClick={handleSearch}>Search</button>
          </div>
        </div>
        </>}
      </div>
    </div>
  );
};

export default Header;
