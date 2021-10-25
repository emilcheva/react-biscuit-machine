import React, { useState, useEffect } from "react";
import { ReactComponent as MotorSVG } from "./../images/motor.svg";
import styled from "styled-components";
import useInterval from "react-useinterval";
import { MOTOR_PULSE_TIME } from "../helpers/constants";

const MotorWrapper = styled.div`
  position: absolute;
  width: 60px;
  right: 150px;
  top: 45px;

  & #cogwheel {
    transform-box: fill-box;
    transform-origin: center;
    animation: cogWheelRotate 2s linear infinite;
    animation-play-state: ${(props) =>
      props.shouldPlayAnimation ? "running" : "paused"};
  }

  @keyframes cogWheelRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
`;

export default function Motor(props) {

  const handlePulse = () => {
    props.onSendPulse();
  };

  useInterval(
    handlePulse,
    (props.isMachineMovementOn ||
      (props.isMachineMovementStopped &&
      props.hasBiscuitToBake)) 
      ? MOTOR_PULSE_TIME
      : null
  );

  return (
    <MotorWrapper
      className="motor"
      shouldPlayAnimation={
        props.isMachineMovementOn && !props.isMachineMovementPaused
      }
    >
      <MotorSVG />
    </MotorWrapper>
  );
}
