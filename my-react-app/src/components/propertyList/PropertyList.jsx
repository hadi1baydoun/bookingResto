import React from 'react'
import './propertyList.css';
import useFetch from '../../hooks/useFetch';



const properties = [
    {
      id: 1,
      img: "https://eatapp.co/beirut-restaurants/images/burgundy-752-gouraud-street-saifi-restaurant-1.jpg?height=500&width=850",
      title: "Burgundy",
      description: "Mar Maroun, French",
    },
    {
      id: 2,
      img: "https://eatapp.co/beirut-restaurants/images/albergo-rooftop-hotel-albergo-ashrafieh-beirut-district-restaurant-1.jpg?height=500&width=850",
      title: "Albergo Rooftop",
      description: "Hotel, Achrafieh",
    },
    {
      id: 3,
      img: "https://ucarecdn.com/7eaf9aed-3e21-4b82-b2f6-d0223c92c7db/-/scale_crop/870x500/",
      title: "Cocteau",
      description: "Minet el hosn",
    },
    {
        id: 4,
        img: "https://ucarecdn.com/7eaf9aed-3e21-4b82-b2f6-d0223c92c7db/-/scale_crop/870x500/",
        title: "Cocteau",
        description: "Minet el hosn",
      },

      {
        id: 5,
        img: "https://ucarecdn.com/7eaf9aed-3e21-4b82-b2f6-d0223c92c7db/-/scale_crop/870x500/",
        title: "Cocteau",
        description: "Minet el hosn",
      },
    
      
  ];
  
  function PropertyList() {
    const { data, loading, error } = useFetch("/restos/countByType");
  
    // Handle loading state
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Handle error state
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <div className="pList">
        {properties.map((property) => (
          <div className="pListItem" key={property.id}>
            <img
              src={property.img}
              alt={`Image of ${property.title}`}
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>{property.title}</h1>
              <h2>{property.description}</h2>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default PropertyList