/**
 * @author       CaptainCluster
 * @link         https://github.com/CaptainCluster
 * @repository   25+5-Clock
 * @license      GNU-General-Public-License-v3.0
 * 
 * @description  This file contains the capabilities for adjusting a length of a specified 
 *               time to be counted down (like the break).
 */

import React from 'react'

/**
 * @param {string} idInitiator          Used to start each necessary ID, with only one parameter needed 
 * @param {string} displayString        String displayed to the user to show them what the length is 
 *                                      associated with
 * @param {integer} labelTime           The time (in minutes) of type of counted down time that is being
 *                                      adjusted
 * @param {useState-setter} setTime     Used to set a new time for the labelTime prop
 * @param {boolean} timerStarted        Determines whether the countdown is ongoing or not (paused or not)
 * 
 * The following two are for the (mm:ss) timer format. They are used to set the values for them.
 * @param {useState-setter} setTimerSeconds     
 * @param {useState-setter} setTimerMinutes
 * 
 * @returns {JSXComponent}  LengthControl component that can be used to adjust a specified
 *                          type of countdown.
 */
export default function LengthControl({ 
    idInitiator,    displayString, 
    labelTime,      setTime, 
    timerStarted,   setTimerSeconds, 
    setTimerMinutes
}) {
    /**
     * @description decreaseSession, an arrow function for decreasing the sessionTime, while
     *              also resetting the timer for consistency.
     * 
     * Uses the following props:
     *  idInitiator     Used to make sure the LengthControl is not regarding breaks to avoid
     *                  undesired behavior
     *  labelTime       Used to make sure the limits are respected, especially to pass the 
     *                  mandatory FreeCodeCamp tests
     *  timerStarted    Restricting the ability to adjust changes if the timer is not paused
     */
    const decreaseSession = () => {
        if(1 < labelTime && labelTime <= 60 && !timerStarted){
            if(idInitiator === "session") {
                setTime(labelTime - 1);
                setTimerSeconds(0);
                setTimerMinutes(labelTime);
                return;
            }
            setTime(labelTime - 1);
        }
    }
    /**
     * @description increaseSession, an arrow function for increasing the sessionTime, while
     *              also resetting the timer for consistency.
     * 
     * The prop functionality is exactly the same as in the decreaseSession arrow function
     */
    const increaseSession = () => {
        if(1 <= labelTime && labelTime < 60 && !timerStarted){
            if(idInitiator === "session") {
                setTime(labelTime + 1);
                setTimerSeconds(0);
                setTimerMinutes(labelTime);
                return;
            }
            setTime(labelTime + 1);
        }
    }

    return(
        <div id="length-control">
            <div id={`${idInitiator}-label`}>
                {displayString}
                <div    id={`${idInitiator}-length`}>{labelTime}</div>
                <button id={`${idInitiator}-decrement`} onClick={decreaseSession}>-</button>
                <button id={`${idInitiator}-increment`} onClick={increaseSession}>+</button>
            </div>
        </div>
    );
}