import './searchItem.css';
import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ id }) => {
  return (
    <div className="searchItem">
      <img
        src="https://i.pinimg.com/236x/86/6c/d2/866cd2867f9f2b7e6e3594fb1b8230dd.jpg"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">Babel Restaurant</h1>
        <span className="siDistance">Zaituna Bay</span>
        <span className="siTaxiOp">Free Wifi</span>
        <span className="siSubtitle">
          Lebanese cuisine elevated through mature culinary creations.
        </span>
        <span className="siFeatures">
          Total Branches . 8 located in Lebanon . 4 in Dubai!!
        </span>
        <span className="siCancelOp">Free Cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later , so look the great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>8.6</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">12$</span>
          <span className="siTaxOp">Discount on Weekdays</span>
          {/* Use Link to navigate to /resto/:id */}
          <Link to={`/resto/${id}`} style={{ textDecoration: "none" }}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
