export type Props = {
  isLoaded?: boolean;
  position: {
    lat: number;
    lng: number;
  };
  options?: string[];
  renderInput?: (value?: any) => void;
};
