import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './reserve.css'

import React from 'react'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Reserve = ({setOpen, restoId}) => {
  return (
    <div className='reserve'>
      <div className="rContainer">
      <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => setOpen(false)} />

      </div>
    </div>
  )
}

export default Reserve

