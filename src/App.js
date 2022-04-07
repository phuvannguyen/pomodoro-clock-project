import React, {useState} from 'react';
import Length from './component/Length/Length';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import song from "./media/beepsound.mp3"

import './App.css';


function App() {
  const [displayTime, setDisplayTime] = useState(25*60);
  const [displayBreakTime, setDisplayBreakTime] = useState(5*60);
  const [displaySessionTime, setDisplaySessionTime] = useState(25*60);
  const [timeOn, setTimeOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakAudio, setBreakAudio] = useState(new Audio(song));

  const playBreakAudio = () => {
    try {
      breakAudio.currentTime = 0;      
      breakAudio.play();
      
    } catch (error) {
      console.log(error)
      
    }
    
  
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time /60);
    const seconds = time % 60;
    return ((minutes < 10 ? "0" +  minutes : minutes) + ":" + (seconds < 10 ? "0" +  seconds : seconds))
  };

  const handlechangeTime = (amount, type) => {
    
    if (type == "break") {
      if (displayBreakTime <= 60 && amount < 0) {
        return
      };
      setDisplayBreakTime((val) => val + amount)

    } else {
      if (displaySessionTime <= 60 && amount < 0) {
        return
      };
      setDisplaySessionTime((val) =>  val + amount);
      if (!timeOn) {
        setDisplayTime(displaySessionTime + amount)

      }

    };   
    
  };

  const controlTime = () => {
     let second = 1000;
     let day = new Date().getTime();     
     let nextDay = new Date().getTime() + second;
     let onBreakVarible = onBreak;
     if (!timeOn) {
       let interval = setInterval(() => {
        day = new Date().getTime();
        if (day > nextDay) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVarible) {
              playBreakAudio();
              onBreakVarible = true;
              setOnBreak(true);
              return displayBreakTime;             

            } else if (prev <= 0 && onBreakVarible) {
              playBreakAudio();
              onBreakVarible = false;
              setOnBreak(false);
              return displaySessionTime;

            }
            return prev - 1;
          });
          nextDay += second;        
 
        };        
       }, 30);
       localStorage.clear();
       localStorage.setItem("interval-id", interval);
       
     };
     
     if (timeOn) {
       clearInterval(localStorage.getItem("interval-id"))

     }
     
     setTimeOn(!timeOn);

  };

  const resetTime = () => {
    setDisplayTime(25*60);
    setDisplaySessionTime(25*60);
    setDisplayBreakTime(5*60)
  }

  return (
    <div className="App">
      <div className="settingTime">
      <Length id ={{label: "break-label", decrement: "break-decrement",increment:"break-increment", default:"break-length"}} title={"Break Length"} type={"break"} time={displayBreakTime} formatTime= {formatTime} changeTime={handlechangeTime}/>
      <Length id={{label:"session-label", decrement: "session-decrement", increment:"session-increment", default:"session-length"}} title={"Session Length"} type={"session"} time={displaySessionTime} formatTime= {formatTime} changeTime={handlechangeTime}/>

      </div>
      <h3 id="timer-label">{onBreak ? "Break" : "Session"}</h3>
      <h1 id="time-left">{formatTime(displayTime)}</h1>
      <div>
        <button onClick={controlTime} id="start_stop">
          {timeOn ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
        </button>      
        <button onClick={resetTime} id="reset">
          <AutorenewIcon />
        </button>

      </div>
      
    </div>
  );
};

export default App;
