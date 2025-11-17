import React from 'react'
import Portfolio_item from './Portfolio_item';
const Portfilio_Items = (props) => {
  return (
    <div className='Portfilio_Items container'>
        <Portfolio_item img={"/app.avif"} text={"Application"} type={props.type} />
        <Portfolio_item img={"/ai.avif"} text={"AI Models"} type={props.type}  />
        <Portfolio_item img={"/bot.avif"} text={"Telegram Bot"} type={props.type} />
        <Portfolio_item img={"/web.avif"} text={"Websites"} type={props.type}  />      
    </div>
  )
}

export default Portfilio_Items


