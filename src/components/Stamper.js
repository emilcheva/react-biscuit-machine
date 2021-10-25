import styled from "styled-components";
import { ReactComponent as StamperSVG } from "./../images/stamper.svg";

const StamperPusher = styled.div`
  width: 180px;
  position: absolute;
  left: 170px;
  top: 70px;
  z-index: 2;
  
  & #pusher{
    z-index: 2;
    transform-origin: bottom;
    transform: scale(1.2, 1);
  }

  &.push #pusher {
    animation: stamp 2s linear infinite;
    animation-play-state: ${(props) =>
     props.shouldPauseAnimation ? "paused" : "running"};
  }

  @keyframes stamp {
    from {
      transform: scale(1.2, 1) translateY(0px);
    }
    to {
        transform: scale(1.2, 3) translateY(40px);
    }
  }
`;

export default function Stamper(props) {
  const shouldPlayAnimation = props.isMachineMovementPaused || props.hasDoughToExtrude

  return (
    <StamperPusher shouldPauseAnimation={props.isMachineMovementPaused} className={shouldPlayAnimation ? 'push' : ''} >
      <StamperSVG />
    </StamperPusher>
  );
}
