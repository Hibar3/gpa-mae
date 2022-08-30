import { PlaceType } from "../../common/types";

export type Props = {
  isLoaded?: boolean;
  value: any;
  onChange: (ref) => void;
  onInputChange: (ref) => void;
  options: readonly PlaceType[];
  renderInput?: (value?: any) => void;
};
