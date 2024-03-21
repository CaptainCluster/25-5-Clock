/**
 * @author       CaptainCluster
 * @link         https://github.com/CaptainCluster
 * @repository   25+5-Clock
 * @license      GNU-General-Public-License-v3.0
 * 
 * @description  The timer for the program
 */

import React, { useEffect } from 'react'

/**
 * @param {boolean} timerStarted                Determines whether the countdown is ongoing or not (paused or not)
 * @param {integer} timerSeconds                useState (integer) for the seconds of the format of the timer (mm:ss)
 * @param {useState-setter} setTimerSeconds     Setting the seconds for the timer (format mm:ss)
 * @param {integer} timerMinutes                useState (integer) for the minutes of the format of the timer (mm:ss)
 * @param {useState-setter} setTimerMinutes     Setting the minutes for the timer (format mm:ss)
 * @param {boolean} sessionMode                 useState (boolean) to determine whether the timer counts down the session 
 *                                              or the break
 * @param {useState-setter} setSessionMode      Setting a boolean for the sessionMode
 * @param {string} timeMode                     Text label to show the user whether the timer is ready to count down on a 
 *                                              session or a break
 * @param {audioRef} audioRef                   audioRef for the beep sound
 * 
 * @returns {JSXComponent}                      The Timer component that shows the format and the countdown process
 */
export default function Timer({
    timerStarted,       timerSeconds, 
    setTimerSeconds,    timerMinutes, 
    setTimerMinutes,    sessionMode, 
    setSessionMode,     timeMode, 
    audioRef, 
}) {   
    /**
     * useEffect for the countdown process of the timer
     * 
     * Uses the following props:
     *      timerStarted    Making sure the countdown process only starts if timerStarted is true
     *      timerSeconds    Modifying the seconds of the timer
     *      timerMinutes    Modifying the minutes of the timer
     */
    useEffect(() => {
        let countdown;
        timerAudioCheck();
        if (timerStarted) {
            countdown = setInterval(() => {
                if(timerSeconds === 0 && timerMinutes === 0){   //If the timer is 00:00, which means it has finished
                    sessionModeChanger();   //From a session to a break, or vice versa
                    clearInterval(countdown);
                } else if(timerSeconds === 0 && timerMinutes !== 0){    //Going from a minute to another
                    setTimerSeconds(59);    
                    setTimerMinutes(timerMinutes - 1);
                }
                else {
                    setTimerSeconds(timerSeconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(countdown);
        }
        return () => clearInterval(countdown);
    }, [timerStarted, timerSeconds, timerMinutes]);

    /**
     * @description sessionModeChange  going from a session to a break or vice versa, based
     *              on if the timer has run out of time
     * 
     * Uses the following props:
     *      sessionMode     A boolean that determines if we are on either the middle of a session or a break
     */
    const sessionModeChanger = () => {
        if(sessionMode){
            setSessionMode(false);
        } else{
            setSessionMode(true);
        }
    }

    /**
     * @description timerAudioCheck     Triggers a beep audio when the time is up
     * 
     * Uses the following props:
     *      audioRef    audioRef for the audio source. Needed to play the effect.
     */
    const timerAudioCheck = () => {
        if(timerFormat() == "00:00"){
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    }

    /**
     * timerFormat      Merges the minutes and seconds into the timer, in a desired format.
     * 
     * @returns {string} The format the timer is in (min:ss)
     *      Example: 23:42
     */
    const timerFormat = () => {
        if(timerMinutes < 10 && timerSeconds < 10) {
            return "0" + timerMinutes.toString() + ":0" + timerSeconds.toString();
        } else if(timerSeconds < 10) {
            return timerMinutes.toString() + ":0" + timerSeconds.toString();
        } else if(timerMinutes < 10) {
            return "0" + timerMinutes.toString() + ":" + timerSeconds.toString();            
        } 
        return timerMinutes.toString() + ":" + timerSeconds.toString();
    }

    return (
        <div className="timer">
            <div className="timer-wrapper">
                <div id="timer-label">{timeMode}</div>
                <div id="time-left">{timerFormat()}</div>
            </div>
        </div>
    );
}