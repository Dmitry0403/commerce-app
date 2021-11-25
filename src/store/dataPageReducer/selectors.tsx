import { RootState } from "../store";

export const takeDataPage = (state: RootState) => state.dataPage;

export const takeButtonStatus = (state: RootState) => state.dataPage.stateButton;
