import React from 'react'

const Portfilio_photo = (props) => {
  return (
    <div className='Portfilio_photo'>
        <img src={props.img} className='photo' loading='lazy' />
    </div>
  )
}

export default Portfilio_photo

