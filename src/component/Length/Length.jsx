import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './Length.css';

const Length = ({title, changeTime, type, time, formatTime, id}) => {  

    return (
      <div className="length">
        <h2 id={id.label}>{title}</h2>
        <div className='formatIcon'>
            <button onClick = {() => changeTime(-60, type)} id={id.decrement}><ArrowDownwardIcon /></button>          
            <h2 id={id.default}>{Math.floor(time/60)}</h2>
            <button onClick = {(e) => changeTime(60, type)} id={id.increment}><ArrowUpwardIcon /></button>         
        </div>       
  
  
      </div>
      
    )
  }

export default Length