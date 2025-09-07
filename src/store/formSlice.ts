import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllFormData } from "@/types/formTypes";

interface FormState {
  data: AllFormData;
  currentStep: number;
  hasUnsaved: boolean;
}

const initialState: FormState = {
  data: {},
  currentStep: 1,
  hasUnsaved: false,
};

type StepData = Partial<AllFormData[keyof AllFormData]>;

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setStepData: (state, action: PayloadAction<{ step: number; data: StepData }>) => {
      state.data[`step${action.payload.step}`] = action.payload.data;
      state.hasUnsaved = true;
    },
    goNextStep: (state, action?: PayloadAction<number>) => {
      state.currentStep = action?.payload ?? Math.min(state.currentStep + 1, 5);
    },
    goPrevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 1);
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    submitForm: (state, action: PayloadAction<AllFormData>) => {
      state.data = action.payload;
      state.hasUnsaved = false;
    },
    resetForm: (state) => {
      state.data = {};
      state.currentStep = 1;
      state.hasUnsaved = false;
    },
  },
});

export const { setStepData, goNextStep, goPrevStep, setCurrentStep, submitForm, resetForm } =
  formSlice.actions;

export default formSlice.reducer;
