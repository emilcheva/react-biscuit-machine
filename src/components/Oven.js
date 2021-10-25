import React, { useEffect, useState } from "react";
import useInterval from "react-useinterval";
import styled from "styled-components";
import { OVEN_CONSTS } from "../helpers/constants";
import { ReactComponent as OvenSVG } from "./../images/oven.svg";

const OvenTemperature = styled.span`
  position: absolute;
  right: 30px;
  top: 300px;
`;

const OvenWrapper = styled.div`
  width: 300px;
  position: absolute;
  right: 290px;
  top: 225px;

  #oven-core-light {
    transition: opacity 0.25s ease-in-out;
    opacity: ${(props) => (props.isTermostatOn ? 1 : 0)};
  }

  #oven-light {
    transition: opacity 0.25s ease-in-out;
    opacity: ${(props) => (props.shouldTurnLightsOn ? 1 : 0)};
  }

  #oven-lamp,
  #oven-lamp-top {
    transition: opacity 0.25s ease-in-out;
    fill: ${(props) => (props.shouldTurnLightsOn ? "orange" : "lightgrey")};
  }
`;

const Oven = (props) => {
  const [degrees, setDegrees] = useState(0);
  const [isTermostatOn, setIsTermostatOn] = useState(false);
  let shouldWarmUp = false;
  let shouldCoolDown = false;

  useEffect(() => {
    if (degrees === OVEN_CONSTS.OVEN_MAX_BAKING_TEMP) setIsTermostatOn(true);
    if (degrees === OVEN_CONSTS.OVEN_MIN_BAKING_TEMP) setIsTermostatOn(false);
  }, [degrees]);

  let shouldTemperatureGoUp =
    degrees === OVEN_CONSTS.OVEN_MIN_BAKING_TEMP ||
    (!isTermostatOn &&
      degrees >= OVEN_CONSTS.OVEN_MIN_BAKING_TEMP &&
      degrees < OVEN_CONSTS.OVEN_MAX_BAKING_TEMP);
  let shouldTemperatureGoDown =
    degrees === OVEN_CONSTS.OVEN_MAX_BAKING_TEMP ||
    (isTermostatOn &&
      degrees > OVEN_CONSTS.OVEN_MIN_BAKING_TEMP &&
      degrees <= OVEN_CONSTS.OVEN_MAX_BAKING_TEMP);

  if (props.isMachineMovementOn) {
    shouldWarmUp = true;
  }

  // let cookies in oven be baked before turning off
  if (props.isMachineMovementStopped) {
    if (!props.hasBiscuitToBake) {
      shouldCoolDown = true;
    }
  }

  function warmUp() {
    setDegrees((degrees) => degrees + 10);
    if (degrees === OVEN_CONSTS.OVEN_MIN_BAKING_TEMP) {
      props.handleOvenReady(true);
    }
  }

  function coolDown() {
    setDegrees((degrees) => (degrees - 10 < 0 ? 0 : degrees - 10));

    if (degrees <= OVEN_CONSTS.OVEN_MAX_BAKING_TEMP) {
      props.handleOvenReady(false);
    }
  }

  function calcTemperatureDown() {
    setDegrees((degrees) =>
      degrees - 5 >= OVEN_CONSTS.OVEN_MIN_BAKING_TEMP ? degrees - 5 : degrees
    );
  }

  function calcTemperatureUp() {
    setDegrees((degrees) =>
      degrees + 5 <= OVEN_CONSTS.OVEN_MAX_BAKING_TEMP ? degrees + 5 : degrees
    );
  }

  useInterval(
    calcTemperatureUp,
    shouldTemperatureGoUp ? OVEN_CONSTS.OVEN_TERMOSTAT_TIME : null
  );
  useInterval(
    calcTemperatureDown,
    shouldTemperatureGoDown ? OVEN_CONSTS.OVEN_TERMOSTAT_TIME : null
  );

  // on and off timers
  useInterval(
    coolDown,
    shouldCoolDown && degrees > 0 ? OVEN_CONSTS.OVEN_WARM_COOL_TIME : null
  );
  useInterval(
    warmUp,
    shouldWarmUp && degrees <= OVEN_CONSTS.OVEN_MIN_BAKING_TEMP
      ? OVEN_CONSTS.OVEN_WARM_COOL_TIME
      : null
  );

  return (
    <>
      <OvenTemperature>
        Current Temperature: {degrees}
        <sup>o</sup>C
      </OvenTemperature>
      <OvenWrapper
        isTermostatOn={isTermostatOn} 
        shouldTurnLightsOn={degrees >= OVEN_CONSTS.OVEN_MIN_BAKING_TEMP}
      >
        <OvenSVG />
      </OvenWrapper>
    </>
  );
};

export default Oven;
