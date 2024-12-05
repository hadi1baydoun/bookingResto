import React, { useContext, useState } from 'react';
import './resto.css';
import Header from '../../components/header/Header.jsx';
import Navbar from "../../components/navbar/Navbar.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import MailList from '../../components/mailList/MailList.jsx';
import Footer from '../../components/footer/Footer.jsx';
import useFetch from '../../hooks/useFetch.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import Reserve from '../../components/reserve/Reserve.jsx';
import { id } from 'date-fns/locale';

function Resto(props) {

  const location = useLocation()
  console.log(location)
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {data, loading, error} = useFetch(`/resto/id`);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate()

  const photos = [
    { "src": "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=1200&im_q=highq&im_format=avif" },
    { "src": "https://a0.muscache.com/im/pictures/miso/Hosting-694055224756906854/original/e9fec6f3-b66f-4156-968a-7cc537c06519.jpeg?im_w=1200&im_q=highq&im_format=avif" },
    { "src": "https://i.pinimg.com/236x/af/ec/47/afec47f80d249b03627f8b7567a25340.jpg" },
    { "src": "https://i.pinimg.com/236x/e1/f5/3d/e1f53dd4504e9ecd20f0a9ca06f25849.jpg" },
    { "src": "https://i.pinimg.com/236x/0b/e4/7a/0be47ad5d2427db37badb02293b14fde.jpg" }
  ];

  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(true);
  };
  const handleClick = () => {
    if(user){ 
      setOpenModal(true);

    }else{
      navigate("/login")
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpen(false)} />
            <FontAwesomeIcon
              icon={faCircleArrowLeft} className='arrow'
              onClick={() => setSlideNumber(slideNumber === 0 ? photos.length - 1 : slideNumber - 1)}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight} className='arrow'
              onClick={() => setSlideNumber(slideNumber === photos.length - 1 ? 0 : slideNumber + 1)}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="ReserveNow">Reserve Now !</button>
          <h1 className="hotelTitle">Babel Restaurant</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Zaituna Bay</span>
          </div>
          <span className="hotelDistance">Excellent location in the heart of the city</span>
          <span className="hotelPriceHighlight">Don't waste the offer on our website!!!!</span>
          <div className="hotelImages">
            {photos.map((photo, index) => (
              <div key={index} className="hotelImgWrapper">
                <img onClick={() => handleOpen(index)} src={photo.src} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">In the heart of Beirut</h1>
              <p className="hotelDesc">
                Babel Restaurant offers a unique dining experience that blends traditional
                flavors with modern twists. Our menu features a diverse range of
                Mediterranean-inspired dishes, made from the freshest locally sourced ingredients.
                Whether you're here for a casual meal or a special celebration, Babel promises a
                warm, inviting atmosphere and exceptional service. Join us for a memorable culinary
                journey that delights your taste buds and leaves you craving more.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect Lebanese Food</h1>
              <span>Located in the heart of city</span>
              <h2>
                <b>15$</b> <span>per person</span>
              </h2>
              <button onClick={handleClick}>Reserve Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      {openModal && <Reserve setOpen={setOpenModal} hotelId = {id}/>}
    </div>
  );
}

export default Resto;
