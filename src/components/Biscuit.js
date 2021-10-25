import React from "react";
import styled from "styled-components";
import doughSVG from "./../images/biscuit-dough.svg";
import rawBiscuitSVG from "./../images/raw-biscuit.svg";
import bakedBiscuitSVG from "./../images/baked-biscuit.svg";

const BiscuitsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 290px;
  width: 40px;
  height: 40px;
`;

const Dough = styled.div`
  z-index: 1;
  position: absolute;
  top: -50px;
  animation: biscuitdough 2s linear infinite;
  animation-play-state: ${(props) =>
    props.shouldPauseAnimation ? "paused" : "running"};

  @keyframes biscuitdough {
    0% {
      transform: scale(.2,.2) translate(0, 100px);
      animation-timing-function: cubic-bezier(0, 0, 0.58, 1);
    }
    15% {
      transform: scale(.5,.5) translate(0, 110px);
      animation-timing-function: cubic-bezier(0, 0, 0.58, 1);
    }
    30% {
      transform: scale(1,1) translate(0, 124px);
    }
    50% {
      transform: translate(-100px, 172px);
    }
    100% {
      transform: translate(-300px, 300px);
    }
  }

  & img {
    width: 50px;
  }
`;

const RawBiscuit = styled.div`
  position: absolute;
  right: 300px;
  top: 250px;
  animation: rawbiscuit 2s linear infinite;
  animation-play-state: ${(props) =>
    props.shouldPauseAnimation ? "paused" : "running"};

  & img {
    width: 45px;
  }

  @keyframes rawbiscuit {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(-190px,90px);
    }
    80% {
      transform: translate(-180px,122px);
    }
    100% {
      transform: translate(50px, 250px);
    }
  }
`;

const BakedBiscuit = styled.div`
  position: absolute;
  bottom: -640px;
  right: 40px;
  animation: bakedbiscuit 2s linear infinite;
  animation-play-state: ${(props) =>
    props.shouldPauseAnimation ? "paused" : "running"};

  & img {
    width: 45px;
  }

  @keyframes bakedbiscuit {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(130px, 40px);
    }
    100% {
      transform: translate(260px, -10px);
    }
  }
`;

export default function Biscuit(props) {
  return (
    <BiscuitsWrapper>
      {props.hasDoughToExtrude && (
        <Dough shouldPauseAnimation={props.isMachineMovementPaused}>
          <img src={doughSVG} alt="dough biscuit" />
        </Dough>
      )}
      {props.hasBiscuitToStamp && (
        <RawBiscuit shouldPauseAnimation={props.isMachineMovementPaused}>
          <img src={rawBiscuitSVG} alt="raw biscuit" />
        </RawBiscuit>
      )}
      {props.hasBiscuitToBake && (
        <BakedBiscuit shouldPauseAnimation={props.isMachineMovementPaused}>
          <img src={bakedBiscuitSVG} alt="baked biscuit" />
        </BakedBiscuit>
      )}
    </BiscuitsWrapper>
  );
}
