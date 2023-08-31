import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function StepperBasic(props: {
  steps: any;
  children: any;
  activeStep: any;
  setActiveStep: any;
}) {
  const steps = props.steps;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  props.setActiveStep(activeStep);
  return (
    <>
      <Box sx={{ width: "100%" }} className={` `}>
        <Stepper activeStep={activeStep}>
          {steps.map((label: any, index: number) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {props.children}
            <div className={` absolute bottom-5 right-5`}>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className=" bg-gray-600  px-4 py-2 mx-2 rounded-lg hover:shadow-lg duration-300 text-white hover:bg-gray-700 "
                >
                  BACK
                </button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <button
                    className="bg-red-400 px-4 py-2 mx-2 rounded-lg hover:shadow-lg duration-300 text-white hover:bg-red-500 "
                    onClick={handleSkip}
                  >
                    SKIP
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className=" bg-green-600  px-4 py-2 mx-2 rounded-lg hover:shadow-lg duration-300 text-white hover:bg-green-700 "
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </button>
              </Box>
            </div>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}
