import useFetch from '../../hooks/useFetch'
import './featuredProperties.css'
import React from 'react'

export default function FeaturedProperties() {

    const {data, loading, error} = useFetch("/resto/?featured=true&limit=4");
  return (
    <div className='fp'>
        <div className="fpItem">
        <img src="https://ucarecdn.com/b19837ea-bc6f-4683-a999-355a1552fad1/-/scale_crop/870x500/" 
        alt="" 
        className="fpImg" />
        <span className="fpName">The Happy Prince </span>
        <span className="fpCity">Mar Mkhael</span>
        <span className="fpPrice">Starting from 20$</span>
        <div className="fpRating">
            <button>9.2</button>
            <span>Excellent</span>
        </div>
        </div>
        <div className="fpItem">
        <img src="https://ucarecdn.com/d0222ba3-7f19-4a1e-bf83-0bf66392aa09/-/scale_crop/870x500/" 
        alt="" 
        className="fpImg" />
        <span className="fpName">The Happy Prince </span>
        <span className="fpCity">Mar Mkhael</span>
        <span className="fpPrice">Starting from 20$</span>
        <div className="fpRating">
            <button>8.8</button>
            <span>Excellent</span>
        </div></div>
        <div className="fpItem">

        <img src="https://ucarecdn.com/1c7fb08b-8e06-4b02-ad43-8ecc3f2d6170/-/scale_crop/870x500/" 
        alt="" 
        className="fpImg" />
        <span className="fpName">The Happy Prince </span>
        <span className="fpCity">Mar Mkhael</span>
        <span className="fpPrice">Starting from 20$</span>
        <div className="fpRating">
            <button>9</button>
            <span>Excellent</span>
        </div>
        </div>

        <div className="fpItem">
        <img src="https://ucarecdn.com/064ff1b1-7799-44c6-a7b7-f648029e81cc/-/scale_crop/870x500/" 
        alt="" 
        className="fpImg" />
        <span className="fpName">The Happy Prince </span>
        <span className="fpCity">Mar Mkhael</span>
        <span className="fpPrice">Starting from 20$</span>
        <div className="fpRating">
            <button>8.8</button>
            <span>Excellent</span>
        </div></div>
       
      
    </div>
  )
}
