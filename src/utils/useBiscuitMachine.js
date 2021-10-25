import { useState, useEffect } from "react";
import { getNextVisualStep } from "../helpers/biscuit-machine";
import { SWITCH_BUTTONS_STATES } from "../helpers/constants";
import {
  shouldExtrude,
  shouldBake,
  shouldMoveToBasket,
  shouldStamp,
} from "../helpers/biscuit-machine";

export const useBiscuitMachine = () => {
  const [machineMovement, setMachineMovement] = useState("extrude");
  const [buttonState, setButtonState] = useState(null);
  const [ovenReady, setOvenReady] = useState(false);
  const [bakedBiscuitsInBasket, setBakedBiscuitsInBasket] = useState(0);
  const [doughOnConveyer, setDoughOnConveyer] = useState(0);
  const [stampedDoughOnConveyer, setStampedDoughOnConveyer] = useState(0);
  const [bakedBiscuitsOnConveyer, setBakedBiscuitsOnConveyer] = useState(0);

  const isExtruding = shouldExtrude(machineMovement);
  const isStamping = shouldStamp(machineMovement);
  const isBaking = shouldBake(machineMovement);
  const isMovingToBasket = shouldMoveToBasket(machineMovement);

  const machineState = {
    on:
      buttonState === SWITCH_BUTTONS_STATES.PLAY ||
      buttonState === SWITCH_BUTTONS_STATES.PLAY_AFTER_STOP,
    off: buttonState === SWITCH_BUTTONS_STATES.STOP,
    pause: buttonState === SWITCH_BUTTONS_STATES.PAUSE,
    isExtruding,
    isStamping,
    isBaking,
  };

  function onMotorPulse() {
    const newState = getNextVisualStep(machineMovement, buttonState);
    setMachineMovement(newState);
  }

  useEffect(() => {
    if (machineState.off) {
      if (isExtruding) setDoughOnConveyer(doughOnConveyer + 1);
      if (isStamping) setStampedDoughOnConveyer(stampedDoughOnConveyer + 1);
      if (isBaking) setBakedBiscuitsOnConveyer(bakedBiscuitsOnConveyer + 1);
    }
  }, [buttonState, machineMovement]);

  useEffect(() => {
    if (isMovingToBasket) setBakedBiscuitsInBasket(bakedBiscuitsInBasket + 1);
  }, [machineMovement]);

  return {
    ovenReady,
    machineState,
    doughOnConveyer,
    bakedBiscuitsInBasket,
    stampedDoughOnConveyer,
    bakedBiscuitsOnConveyer,
    setButtonState,
    setOvenReady,
    onMotorPulse,
  };
};
