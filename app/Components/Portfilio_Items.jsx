import React from 'react'
import Portfolio_item from './Portfolio_item';
const Portfilio_Items = (props) => {
  return (
    <div className='Portfilio_Items container'>
        <Portfolio_item img={"/app.png"} text={"Application"} type={props.type} />
        <Portfolio_item img={"/ai.png"} text={"AI Models"} type={props.type}  />
        <Portfolio_item img={"/bot.png"} text={"Telegram Bot"} type={props.type} />
        <Portfolio_item img={"/web.png"} text={"Websites"} type={props.type}  />      
    </div>
  )
}

export default Portfilio_Items


