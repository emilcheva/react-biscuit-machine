import React from 'react';
import styled from 'styled-components'
import { ReactComponent as ConveyerSVG } from './../images/conveyer.svg';

const ConveyerBelt = styled.div`
position: relative;
width 900px;
`

export default function Conveyer() {
  return <ConveyerBelt>
    <ConveyerSVG />
  </ConveyerBelt>;
}
