import React from "react";
import styled from "styled-components";
const happyGif = "https://c.tenor.com/OxSgThi02RYAAAAC/gerizzly1.gif";
const waitingGif = "https://c.tenor.com/OwA7ERMWqLAAAAAC/patience-cookie.gif";
const excitedGif = "https://c.tenor.com/PXxNu3_P7x4AAAAC/chef-baking.gif";
const sadGif = "https://c.tenor.com/lFpC4lpy7hkAAAAC/cookie-monster-scared.gif";

const Gif = styled.div`
  & img {
    margin-top: 10px;
    width: 100%;
    height: 300px;
    object-fit: contain;
  }

  & h2 {
    color: #dc48c1;
    margin-top: 20px;
  }
`;

export default function GifSwitcher(props) {
  const hasReadyBiscuitsAfterStop = props.isMachineMovementStopped && props.bakedBiscuitsInBasket;
  const noReadyBiscuitsAfterStop = props.isMachineMovementStopped && !props.bakedBiscuitsInBasket

  return (
    <Gif className="gif">
      {props.isMachineMovementOn && (
        <div>
          <h2>Cookie Monster needs this recipe</h2>
          <img src={excitedGif} alt="cookie monster cooking started" />
        </div>
      )}
      {props.isMachineMovementPaused && (
        <div>
          <h2> ... </h2>
          <img src={waitingGif} alt="cookie monster waits for cookies" />
        </div>
      )}
      { hasReadyBiscuitsAfterStop && 
        <div>
          <h2>Cookie Monster Enjoys Baked Biscuits right from the basket!</h2>
          <img src={happyGif} alt="cookie monster enjoys baked biscuit" />
        </div>
      }
      { noReadyBiscuitsAfterStop &&
        <div>
          <h2>No baked biscuits in the basket ! Can we try again? </h2>
          <img src={sadGif} alt="cookie monster dissapointed" />
        </div>
      }
    </Gif>
  );
}
