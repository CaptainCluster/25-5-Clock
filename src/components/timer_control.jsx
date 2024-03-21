/**
 * @author       CaptainCluster
 * @link         https://github.com/CaptainCluster
 * @repository   25+5-Clock
 * @license      GNU-General-Public-License-v3.0
 * 
 * @description  Methods for controlling the timer
 */

import React from 'react'

/**
 * 
 * @param {useState-setter} setSessionTime  Setting the session time to default (25)
 * @param {useState-setter} setBreakTime    Setting the break time to default (5)
 * @param {function}        startStopTimer  Functionality for the start/stop button
 * @param {useState-setter} setTimerSeconds Setting the seconds to the default value (0)
 * @param {useState-setter} setTimerMinutes Setting the minutes to the default value (25)
 * @param {useState-setter} setTimerStarted Putting timer on pause upon reset
 * @param {useState-setter} setSessionMode  For setting the session (potentially from break) to session
 * @param {audioRef}        audioRef        audioRef for the beep sound
 * @returns 
 */
export default function TimerControl({
    setSessionTime,     setBreakTime, 
    startStopTimer,     setTimerSeconds, 
    setTimerMinutes,    setTimerStarted,
    setSessionMode,     audioRef
}) {

    /**
     * @description resetTimer, the procedure for resetting the timer to defaults
     * 
     * Uses all of the props.
     */
    const resetTimer = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
        }
        setTimerStarted(false);
        setSessionMode(true);
        setSessionTime(25);
        setBreakTime(5);
        setTimerMinutes(25);
        setTimerSeconds(0);
    }
    return(
        <div id="timer-control">
            <button id="start_stop" onClick={startStopTimer}>Start</button>
            <button id="reset" onClick={resetTimer}>Reset</button>
        </div>
    );
}