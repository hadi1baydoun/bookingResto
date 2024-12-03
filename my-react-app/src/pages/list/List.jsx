import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import SearchItem from '../../components/SearchItem/SearchItem';
import './list.css';


import '../../components/SearchItem/searchItem.css';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import useFetch from '../../hooks/useFetch.js';

function List(props) {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.restaurantDest || '');
  const [date, setDate] = useState(location.state.date || [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options || {
    minCharge: 0,
    adults: 1,
    children: 0,
    tables: 1,
  });


  const {data, loading, error , refetch} = useFetch(`/restos?city=${destination}`)

  const handleOptionChange = (key, value) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lstTitle">Search</h1>
            <div className="lstItem">
              <label>Restaurant</label>
              <input 
                type="text" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
              />
            </div>

            <div className="lstItem">
              <label>Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>

            <div className="lstItem">
              <label>Options</label>
              <div className="lsOptions">
              
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min charge <small>per person</small>
                </span>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  value={options.minCharge}
                  onChange={(e) => handleOptionChange('minCharge', +e.target.value)}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Adults</span>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  value={options.adults}
                  onChange={(e) => handleOptionChange('adults', +e.target.value)}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Children</span>
                <input
                  type="number"
                  min={0}
                  className="lsOptionInput"
                  value={options.children}
                  onChange={(e) => handleOptionChange('children', +e.target.value)}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Tables</span>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  value={options.tables}
                  onChange={(e) => handleOptionChange('tables', +e.target.value)}
                />
              </div>
            </div>
            <button className='lstSearch'>Search</button>
          </div>
          
          </div>
          <div className="listResult">
          <SearchItem/>  
          <SearchItem/>
          <SearchItem/>
          <SearchItem/>
          
          </div>
           
        </div>
      </div>
    </div>
  );
}

export default List;
