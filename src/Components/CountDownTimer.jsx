import React, { useEffect, useState, useRef } from 'react';
import timerAlert from './timerAlert.wav';

const CountDownTimer = () => {
  const inputDays = useRef(null);
  const inputHours = useRef(null);
  const inputMinutes = useRef(null);
  const inputSeconds = useRef(null);
  const [infoBtn, setInfoBtn] = useState(false)
  const [timerState, setTimerState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [startActive, setStartActive] = useState(false);
  const [pauseActive, setPauseActive] = useState(false);
  const timerRef = useRef(null);

  const handleStartClick = () => {
    const d = inputDays.current.value ? parseInt(inputDays.current.value) : 0;
    const h = inputHours.current.value ? parseInt(inputHours.current.value) : 0;
    const m = inputMinutes.current.value ? parseInt(inputMinutes.current.value) : 0;
    const s = inputSeconds.current.value ? parseInt(inputSeconds.current.value) : 0;

    if (isNaN(d) || isNaN(h) || isNaN(m) || isNaN(s)) {
      alert("Invalid input. Please enter numbers only.");
      return;
    }

    if (h > 24) {
      alert("Hours should be less than or equal to 24");
      return;
    }

    if (m > 60) {
      alert("Minutes should be less than 60");
      return;
    }

    if (s > 60) {
      alert("Invalid seconds");
      return;
    }

    if (d === 0 && h === 0 && m === 0 && s === 0) {
      alert("Please enter some input to start the timer");
      return;
    }

    setTimerState({ days: d, hours: h, minutes: m, seconds: s });
    setStartActive(true);
    setPauseActive(false);
  };

  const handlePauseClick = () => {
    clearInterval(timerRef.current);
    setPauseActive(true);
  };

  const handleResumeClick = () => {
    setPauseActive(false);
    startTimer();
  };

  const handleResetClick = () => {
    clearInterval(timerRef.current);
    setTimerState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setStartActive(false);
    setPauseActive(false);
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      let { days, hours, minutes, seconds } = timerState;
      
      if (seconds > 0) {
        seconds -= 1;
      } else if (minutes > 0) {
        minutes -= 1;
        seconds = 59;
      } else if (hours > 0) {
        hours -= 1;
        minutes = 59;
        seconds = 59;
      } else if (days > 0) {
        days -= 1;
        hours = 23;
        minutes = 59;
        seconds = 59;
      } else {
        new Audio(timerAlert).play()
        clearInterval(timerRef.current);
        setStartActive(false);
        // alert("Timer is finished");
      }

      setTimerState({ days, hours, minutes, seconds });
    }, 1000);
  };

  useEffect(() => {
    if (startActive && !pauseActive) {
      startTimer();
    }
    return () => clearInterval(timerRef.current); // Clear the interval on unmount
  }, [startActive, pauseActive, timerState]);
  const handleInfoBtn = () => {
    setInfoBtn(!infoBtn)
  }
  return (
    <div className="sub-main">
      <div className=' info-div text-center d-flex  justify-content-end ' >
        {
          infoBtn &&       
          <div className='info-text d-flex align-items-center p-2'>
          <p className='mt-3'>One complete cycle of Animation takes exactly 1 minute</p>
        </div>
        }
        <button onClick={handleInfoBtn} className='text-center btn btn-outline-dark d-flex align-items-center pt-3 justify-content-center'><h4 className=''>i</h4></button>
      </div>  
      <div className=" time d-flex flex-column justify-content-center align-items-center h-100">
        <div className="outer-one d-flex justify-content-center align-items-center">

          <div className="inner-one">
            <div className={`${startActive ? "container" : ""}`}>
              <div className="liquid"></div>
              <div className="liquid"></div>
              <div className="liquid"></div>
              <div className="liquid"></div>
            </div>
            <svg>
              <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                <feColorMatrix values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 20 -10
                " />
              </filter>
            </svg>
          </div>
        </div>
        {!startActive && (
          <div className="set-countdown d-flex justify-content-evenly w-100 px-3 pt-5 text-center">
            <div className="days">
              <input
                ref={inputDays}
                type="text"
                className="text-center m-1"
                id="days"
                placeholder="00"
              />
              <p>Days</p>
            </div>
            <div className="hrs">
              <input
                ref={inputHours}
                type="text"
                className="text-center m-1"
                id="hours"
                placeholder="00"
              />
              <p>Hours</p>
            </div>
            <div className="minutes">
              <input
                ref={inputMinutes}
                type="text"
                className="text-center m-1"
                id="minutes"
                placeholder="00"
              />
              <p>Minutes</p>
            </div>
            <div className="seconds">
              <input
                ref={inputSeconds}
                type="text"
                className="text-center m-1"
                id="seconds"
                placeholder="00"
              />
              <p>Seconds</p>
            </div>
          </div>
        )}

        {startActive && (
          <div className="start-countdown d-flex text-center pt-5">
            <div className="days p-2">
              <h1>{timerState.days >= 10 ? timerState.days : `0${timerState.days}`}</h1>
              <p>Days</p>
            </div>
            <div className="hrs p-2">
              <h1>{timerState.hours >= 10 ? timerState.hours : `0${timerState.hours}`}</h1>
              <p>Hours</p>
            </div>
            <div className="minutes p-2">
              <h1>{timerState.minutes >= 10 ? timerState.minutes : `0${timerState.minutes}`}</h1>
              <p>Minutes</p>
            </div>
            <div className="seconds p-2">
              <h1>{timerState.seconds >= 10 ? timerState.seconds : `0${timerState.seconds}`}</h1>
              <p>Seconds</p>
            </div>
          </div>
        )}


        <div className="btns m-3">
          <button className={`start-btn m-2 ${startActive ? 'd-none' : ''}`} onClick={handleStartClick}>
            Start
          </button>
          {!pauseActive && startActive && (
            <button className="pause-btn m-2" onClick={handlePauseClick}>
              Pause
            </button>
          )}
          {pauseActive && (
            <button className="resume-btn m-2" onClick={handleResumeClick}>
              Resume
            </button>
          )}
          {startActive && (
            <button className="reset-btn m-2" onClick={handleResetClick}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;
