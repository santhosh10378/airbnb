import { useState } from "react";

const useMultiStepForm = (totalSteps, initialStep = 0) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const nextStep = () => {
    setCurrentStep((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const goToStep = (step) => {
    setCurrentStep((prev) => (step >= 0 && step < totalSteps ? step : prev));
  };

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isLastStep,
    isFirstStep,
  };
};

export default useMultiStepForm;
