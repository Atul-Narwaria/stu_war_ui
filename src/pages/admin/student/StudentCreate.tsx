import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import StepperBasic from "../../../components/stepper/StepperBasic";

export default function StudentCreate() {
  const step = ["Basic Info", "Address", "Documents"];
  const [ActiveStep, setActiveStep] = useState(0);
  return (
    <>
      <Breadcrumb name="Create Student"></Breadcrumb>
      <div className="p-3 bg-white my-4 rounded-lg shadow-md">
        <StepperBasic
          steps={step}
          activeStep={ActiveStep}
          setActiveStep={setActiveStep}
        >
          <form action="">{ActiveStep === 0 ? <h1>test</h1> : null}</form>
        </StepperBasic>
      </div>
    </>
  );
}
