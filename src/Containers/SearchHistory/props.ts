import { Unsubscribe } from "@reduxjs/toolkit";

export type Props = {
  places?: any[];
  isLoaded: boolean;
  options?: string[];
  subscribe?: Unsubscribe;
  onPlaceChanged: (value?: { lat: number; lng: number }) => void;
  renderInput?: (value?: any) => void;
};