export type Props = {
  places?: PlaceType[];
  onPressAddress: (input: string) => void;
};

export interface PlaceType {
  description: string;
  place_id?: string;
}
