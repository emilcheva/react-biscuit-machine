import { SWITCH_BUTTONS_STATES } from "./constants";

export const VISUAL_STEPS = [
  { step: "extrude", value: false },
  { step: "stamp", value: false },
  { step: "bake", value: false },
  { step: "basket", value: false },
];

function findCurrentStepIndex(machineState) {
  return VISUAL_STEPS.findIndex((o) => o.step === machineState);
}

function isPreviousStepOn(machineState) {
  let currentStepIndex = findCurrentStepIndex(machineState);
  console.log(VISUAL_STEPS[currentStepIndex - 1].value);
  return VISUAL_STEPS[currentStepIndex - 1].value;
}

function resetVisualStepsToFirst() {
  for (let index = 0; index <= VISUAL_STEPS.length - 1; index++) {
    index === 0
      ? (VISUAL_STEPS[index].value = true)
      : (VISUAL_STEPS[index].value = false);
  }
}

function updateVisualSteps(machineState, switchState) {
  // turn on all previous steps on "play" || if 'play-after-stop' and needs to update visual step
  if (
    switchState === SWITCH_BUTTONS_STATES.PLAY ||
    switchState === SWITCH_BUTTONS_STATES.PLAY_AFTER_STOP
  ) {
    let currentIndex = findCurrentStepIndex(machineState);
    for (let index = 0; index <= currentIndex; index++) {
      VISUAL_STEPS[index].value = true;
    }
  }
  // turn off all previous steps on 'stop'
  else if (switchState === SWITCH_BUTTONS_STATES.STOP) {
    let currentIndex = findCurrentStepIndex(machineState);
    for (let index = 0; index <= currentIndex; index++) {
      VISUAL_STEPS[index].value = false;
    }
  }
}

export function getNextVisualStep(machineMovement, switchState) {
  if (
    switchState === SWITCH_BUTTONS_STATES.PLAY_AFTER_STOP &&
    machineMovement !== "extrude"
  ) {
    if (!isPreviousStepOn(machineMovement)) {
      // reset all steps except 'extrude'
      resetVisualStepsToFirst();
      // current step is 'extrude', so next shold be 'stamp'
      return VISUAL_STEPS[1].step;
    }
  }

  // prepare for next step
  updateVisualSteps(machineMovement, switchState);
  // calc and return next visual step
  let currentIndex = findCurrentStepIndex(machineMovement);
  const nextIndex =
    currentIndex === VISUAL_STEPS.length - 1 ? 0 : currentIndex + 1;
  return VISUAL_STEPS[nextIndex].step;
}

export let shouldExtrude = (currentState) =>
  currentState ? VISUAL_STEPS.find((o) => o.step === "extrude").value : false;
export let shouldStamp = (currentState) =>
  currentState ? VISUAL_STEPS.find((o) => o.step === "stamp").value : false;
export let shouldBake = (currentState) =>
  currentState ? VISUAL_STEPS.find((o) => o.step === "bake").value : false;
export let shouldMoveToBasket = (currentState) =>
  currentState ? VISUAL_STEPS.find((o) => o.step === "basket").value : false;
