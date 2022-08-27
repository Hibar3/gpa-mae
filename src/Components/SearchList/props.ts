export type Props = {
  places?: PlaceType[];
};

export interface PlaceType {
  description: string;
  place_id?: string;
}
