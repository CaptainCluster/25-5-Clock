/**
 * @author       CaptainCluster
 * @link         https://github.com/CaptainCluster
 * @repository   25+5-Clock
 * @license      GNU-General-Public-License-v3.0
 *
 * @description  This file wraps up every single component with Container
 * 
 * @credits      The source for the audio element provided by FreeCodeCamp
 */
import React, { useState, useEffect, useRef } from 'react';
import LengthControl from './length_control';
import Timer from './timer';
import TimerControl from './timer_control';

/**
 * @returns {JSXComponent} A container containing all the JSX components
 */
export default function Container() {
    const [breakTime, setBreakTime]         = useState(5);
    const [sessionTime, setSessionTime]     = useState(25);
    const [sessionMode, setSessionMode]     = useState(true);

    const [timerStarted, setTimerStarted]   = useState(false);  
    const [timerSeconds, setTimerSeconds]   = useState(0);
    const [timerMinutes, setTimerMinutes]   = useState(sessionTime);
    const [timerLabel, setTimerLabel]       = useState("Session");

    const audioRef = useRef(null);

    /**
     * useEffect for aligning sessionTime value with timerMinutes. As
     * timerMinutes consists of the minutes in the timer, it must get
     * the amount of minutes from sessionTime.
     */
    useEffect(() => {
        setTimerMinutes(sessionTime);
    }, [sessionTime]);

    /**
     * useEffect for changing the label that shows whether the countdown
     * is either about a session or a break.
     */
    useEffect(() => {
        if(sessionMode){
            setTimerLabel("Session");
            setTimerMinutes(sessionTime);
        } else {
            setTimerLabel("Break time");
            setTimerMinutes(breakTime);
        }
    }, [sessionMode, sessionTime, breakTime]);
    
    /**
     * Sets a boolean for timerStarted. This boolean, when set for it, 
     * determines whether the timer counts down or does not. 
     */
    const startStopTimer = () => {
        if(timerStarted){
            setTimerStarted(false);
            return
        }
        setTimerStarted(true);
    }    
    
    //Defining data objects for each of the LengthControl components
    const lengthControlData = [
        {idInitiator: "break",   display: "Break Length",   labelTime: breakTime,   setTime: setBreakTime},
        {idInitiator: "session", display: "Session Length", labelTime: sessionTime, setTime: setSessionTime}
    ];

    /**
     * 
     * @returns {array} lengthControlArray The array that contains the 
     * lengthControl components.
     */
    const generateLengthControls = () => {
        const lengthControlLimit = 2;
        const lengthControlArray = [];

        for(let i = 0; i < lengthControlLimit; i++){     
            lengthControlArray.push(

            <LengthControl 
                /**
                 *  @description Props for LengthControl
                 * 
                 *  idInitiator         First part of the necessary IDs in the components (must be specifically named to pass the tests)
                 *  displayString       When adjusting the times, a label for what time is adjusted adds clarity. This is why this 
                 *                      prop is used. (either "Break Length" or "Session Length")
                 *  labelTime           The set time value (either breakTime or sessionTime)
                 *  setTime             To set a related useState (breakTime or sessionTime)
                 *  timerStarted        useState (boolean) to determine if the timer countdown is ongoing or paused
                 *  setTimerSeconds     Setting the seconds for the timer (format mm:ss)
                 *  setTimerMinutes     Setting the minutes for the timer (format mm:ss)
                 */
                idInitiator={lengthControlData[i].idInitiator}  displayString={lengthControlData[i].display}
                labelTime={lengthControlData[i].labelTime}      setTime={lengthControlData[i].setTime} 
                timerStarted={timerStarted}                     setTimerSeconds={setTimerSeconds}               
                setTimerMinutes={setTimerMinutes}
            />);
        }
        return lengthControlArray;
    }

    return (
        <div className="container">
            <div id="app">
                <h1 id="header">25 + 5 Clock</h1>
                <div id="control-panel">{generateLengthControls()}</div>

                <Timer 
                /**
                 * @description Props for Timer
                 * 
                 * timerStarted     useState (boolean) to determine if the timer countdown is ongoing or paused
                 * timerSeconds     useState (integer) for the seconds of the format of the timer (mm:ss)
                 * setTimerSeconds  Setting the seconds for the timer (format mm:ss)
                 * timerMinutes     useState (integer) for the minutes of the format of the timer (mm:ss)
                 * setTimerMinutes  Setting the minutes for the timer (format mm:ss)
                 * sessionMode      useState (boolean) to determine whether the timer counts down the session or
                 *                  the break
                 * setSessionMode   Setting a boolean for the sessionMode
                 * timeMode         Text label to show the user whether the timer is ready to count down on a 
                 *                  session or a break
                 * audioRef         audioRef for the beep sound
                 */
                timerStarted={timerStarted}         timerSeconds={timerSeconds}
                setTimerSeconds={setTimerSeconds}   timerMinutes={timerMinutes} 
                setTimerMinutes={setTimerMinutes}   sessionMode={sessionMode} 
                setSessionMode={setSessionMode}     timeMode={timerLabel}
                audioRef={audioRef}/>

                <TimerControl 
                /**
                 * @description Props for TimerControl
                 * 
                 * setSessionTime   For adjusting the time of the sessions.
                 * setBreakTime     For adjusting the time of the breaks.
                 * startStopTimer   Const function that either starts or stops the countdown, the result is the
                 *                  opposite of the current state
                 * setTimerSeconds  Setting the seconds for the timer (format mm:ss)
                 * setTimerMinutes  Setting the minutes for the timer (format mm:ss)
                 * setTimerStarted  For setting the timer false (pause) on reset
                 * setSessionMode   On reset, sessionMode boolean is returned to default in order to guarantee
                 *                  the next countdown is a session
                 * audioRef         audioRef for the beep sound
                 */
                setSessionTime={setSessionTime}     setBreakTime={setBreakTime}
                startStopTimer={startStopTimer}     setTimerSeconds={setTimerSeconds} 
                setTimerMinutes={setTimerMinutes}   setTimerStarted={setTimerStarted} 
                setSessionMode={setSessionMode}     audioRef={audioRef}
                />
            </div>
            <audio id="beep" ref={audioRef} onEnded={startStopTimer} src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
    );
}