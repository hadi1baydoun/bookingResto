import React from 'react'
import './featured.css';
import useFetch from '../../hooks/useFetch';



const Featured = () => {
  
  const { data, loading, error } = useFetch(
    "/restos/couhtByCity?cities=beirut,jbeil,batroun"
);

  return (
    <div className="featured">
    {loading ? (
      "Loading please wait"
    ) : (
      <>
        <div className="featuredItem">
          <img 
            src="https://www.hospitalitynewsmag.com/wp-content/uploads/2022/07/roaster-Dubai.jpg" 
            alt="Roadster Diner" 
            className="featuredImg" 
          />
          <div className="featuresTitles">
            <h1>beirut</h1>
            <h2>{data[0]} American Food</h2>
          </div>
        </div>
  
        <div className="featuredItem">
          <img 
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/41/b3/78/babel-restaurant-inside.jpg?w=1200&h=-1&s=1" 
            alt="Babel" 
            className="featuredImg" 
          />
          <div className="featuresTitles">
            <h1>jbeil</h1>
            <h2>{data[1]}Lebanese Food</h2>
          </div>
        </div>
  
        <div className="featuredItem">
          <img 
            src="https://images.squarespace-cdn.com/content/v1/63f52cb70db2e54d5c3fa9c6/fd088cf1-c2d9-4f1d-b179-72286bba52b1/IMG_6093.jpg" 
            alt="Sushi Star" 
            className="featuredImg" 
          />
          <div className="featuresTitles">
            <h1>batroun</h1>
            <h2>{data[2]}Chinese Food</h2>
          </div>
        </div>
      </>
    )}
  </div>
  
  )
}

export default Featured
