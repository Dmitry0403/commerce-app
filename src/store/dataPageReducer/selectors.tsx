import { RootState } from "../store";

export const getDataPage = (state: RootState) => state.dataPage;

export const getButtonStatus = (state: RootState) => state.dataPage.stateButton;
