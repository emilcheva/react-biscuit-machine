import React from "react";
import styled from "styled-components";
import doughSVG from "./../images/biscuit-dough.svg";
import stampedBiscuitSVG from "./../images/raw-biscuit.svg";
import bakedBiscuitSVG from "./../images/baked-biscuit.svg";

const Header = styled.h2`
  margin-top: 20px;
  color: rebeccapurple;
`;

export default function BiscuitsList(props) {
  const hasBakedBiscuitsInBasket = props.bakedBiscuitsInBasketCount > 0;

  return (
    <div>
      { hasBakedBiscuitsInBasket && (
        <h3>Baked Biscuits In Basket ({props.bakedBiscuitsInBasketCount}):</h3>
      )}
      { hasBakedBiscuitsInBasket && [...Array(props.bakedBiscuitsInBasketCount)].map((e, i) => (
        <img width="45" src={bakedBiscuitSVG} alt="ready biscuits" key={i} />
      ))}

      {props.isMachineMovementStopped && (
        <div>
          <Header>Total materials on the Conveyer up to now:</Header>
          <h3>Dough ({props.doughCount}):</h3>
          {[...Array(props.doughCount)].map((e, i) => (
            <img width="50" src={doughSVG} alt="dough on conveyer" key={i} />
          ))}
          <h3>Stamped Dough ({props.stampedBiscuitsCount}):</h3>
          {[...Array(props.stampedBiscuitsCount)].map((e, i) => (
            <img
              width="45"
              src={stampedBiscuitSVG}
              alt="stamped dough on conveyer"
              key={i}
            />
          ))}
          <h3>
            Baked Biscuits not in the basket (
            {props.bakedBiscuitsOnConveyerCount}):
          </h3>
          {[...Array(props.bakedBiscuitsOnConveyerCount)].map((e, i) => (
            <img width="45" src={bakedBiscuitSVG} alt="raw biscuits" key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
