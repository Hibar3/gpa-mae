export type Props = {
  isLoaded: boolean;
  options?: string[];
  onPlaceChanged: (value?: { lat: number; lng: number }) => void;
  onPressAddress: (input: string) => void;
  renderInput?: (value?: any) => void;
};