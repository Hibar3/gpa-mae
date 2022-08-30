import { Unsubscribe } from "@reduxjs/toolkit";

export type Props = {
  places?: any[];
  isLoaded: boolean;
  options?: string[];
  subscribe?: Unsubscribe;
  renderInput?: (value?: any) => void;
};