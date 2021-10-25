import React, { useState } from "react";
import styled from "styled-components";
import { SWITCH_BUTTONS_STATES } from "../helpers/constants";

const ButtonSwitch = styled.div`
  position: absolute;
  right: 30px;
  top: 220px;
`;

const Button = styled.button`
  padding: 0.7rem 2rem;
  background: #dc48c1;
  color: white;
  font-size: 16px;
  outline: none;
  border: none;
  border: 1px solid #dc48c1;

  &:hover {
    background: white;
    color: #dc48c1;
    cursor: pointer;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const ToggleSwitch = (props) => {
  const [activeAction, setActiveAction] = useState(SWITCH_BUTTONS_STATES.STOP);
  const isMachineMovementOn = activeAction === SWITCH_BUTTONS_STATES.PLAY;
  const isMachineMovementOff = activeAction === SWITCH_BUTTONS_STATES.STOP;
  const isMachineMovementPaused = activeAction === SWITCH_BUTTONS_STATES.PAUSE;

  const handleButtonClick = (action) => {     
    props.onToggleSwitchClick(action === SWITCH_BUTTONS_STATES.PLAY && isMachineMovementOff ? SWITCH_BUTTONS_STATES.PLAY_AFTER_STOP : action);
    setActiveAction(action);
  };

  return (
    <ButtonSwitch>
      <Button disabled={isMachineMovementOn} onClick={() => handleButtonClick(SWITCH_BUTTONS_STATES.PLAY)}>
        {SWITCH_BUTTONS_STATES.PLAY}
      </Button>
      <Button
        disabled={!isMachineMovementOn || isMachineMovementPaused}
        onClick={() => handleButtonClick(SWITCH_BUTTONS_STATES.PAUSE)}
      >
        {SWITCH_BUTTONS_STATES.PAUSE}
      </Button>
      <Button
        disabled={isMachineMovementOff}
        onClick={() => handleButtonClick(SWITCH_BUTTONS_STATES.STOP)}
      >
        {SWITCH_BUTTONS_STATES.STOP}
      </Button>
    </ButtonSwitch>
  );
};

export default ToggleSwitch;
