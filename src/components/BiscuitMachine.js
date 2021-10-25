import { useBiscuitMachine } from "./../utils/useBiscuitMachine";
import styled from "styled-components";
import Biscuit from "./Biscuit";
import Extruder from "./Extruder";
import Oven from "./Oven";
import Stamper from "./Stamper";
import Conveyer from "./ConveyerBelt";
import Motor from "./Motor";
import ToggleSwitch from "./ToggleSwitch";
import BiscuitsList from "./BiscuitsList";
import GifSwitcher from "./GifSwitcher";

const Header = styled.h1`
  text-transform: uppercase;
  text-align: center;
  color: rebeccapurple;
  font-size: 2rem;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const MachineWrapper = styled.div`
  width: 900px;
  height: 900px;
  margin: 100px 100px 0;
  position: relative;
`;

const BiscuitMachine = () => {
  const {
    machineState,
    ovenReady,
    bakedBiscuitsInBasket,
    doughOnConveyer,
    bakedBiscuitsOnConveyer,
    stampedDoughOnConveyer,
    setButtonState,
    setOvenReady,
    onMotorPulse,
  } = useBiscuitMachine();
  const { isExtruding, isBaking, isStamping } = machineState;
  const hasBiscuitToBake = isExtruding || isBaking || isStamping;

  return (
    <>
      <Header>Biscuit Machine</Header>
      <FlexWrapper>
        <MachineWrapper>
          <Conveyer />
          <Motor
            isOvenReady={ovenReady}
            isMachineMovementOn={machineState.on}
            hasBiscuitToBake={hasBiscuitToBake}
            onSendPulse={onMotorPulse}
            isMachineMovementPaused={machineState.pause}
            isMachineMovementStopped={machineState.off}
          />
          <Extruder />
          <Stamper
            hasDoughToExtrude={isExtruding}
            isMachineMovementOn={machineState.on}
            isMachineMovementPaused={machineState.pause}
          />
          <Biscuit
            hasDoughToExtrude={isExtruding}
            hasBiscuitToStamp={isStamping}
            hasBiscuitToBake={isBaking}
            isMachineMovementPaused={machineState.pause}
          />
          <Oven
            isMachineMovementOn={machineState.on}
            isMachineMovementStopped={machineState.off}
            hasBiscuitToBake={isBaking}
            handleOvenReady={() => setOvenReady(true)}
          />
          <div>
            <ToggleSwitch
              onToggleSwitchClick={(toggleState) => setButtonState(toggleState)}
              isMachineMovementOn={machineState.on}
              isMachineMovementPaused={machineState.pause}
              isMachineMovementStopped={machineState.off}
            />
          </div>
        </MachineWrapper>
        <div>
          <div>
            <BiscuitsList
              bakedBiscuitsInBasketCount={bakedBiscuitsInBasket}
              doughCount={doughOnConveyer}
              stampedBiscuitsCount={stampedDoughOnConveyer}
              bakedBiscuitsOnConveyerCount={bakedBiscuitsOnConveyer}
              isMachineMovementStopped={machineState.off}
            />
          </div>
          <GifSwitcher
            isMachineMovementOn={machineState.on}
            isMachineMovementPaused={machineState.pause}
            isMachineMovementStopped={machineState.off}
            bakedBiscuitsInBasket={bakedBiscuitsInBasket}
          />
        </div>
      </FlexWrapper>
    </>
  );
};

export default BiscuitMachine;
