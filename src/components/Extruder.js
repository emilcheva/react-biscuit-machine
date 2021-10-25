import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ExtruderSVG } from './../images/extruder.svg';

const ExtruderWrapper = styled.div`
  left: 480px;
  top: -100px;
  width: 180px;
  position: absolute;
  z-index: 2;
`;

export default function Extruder() {
  return (
    <ExtruderWrapper>
      <ExtruderSVG />
    </ExtruderWrapper>
  );
}