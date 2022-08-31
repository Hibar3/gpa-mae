export type Props = {
  isLoaded?: boolean;
  style?: React.CSSProperties;
  position: {
    lat: number;
    lng: number;
  };
  options?: string[];
  renderInput?: (value?: any) => void;
};
