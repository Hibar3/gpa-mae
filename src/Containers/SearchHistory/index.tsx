import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { PlaceType, Props } from "./props";
import AutoComplete from "../../components/Autocomplete";
import SearchList from "../../components/SearchList";
import store from "../../configureStore";
import { fetchGeoSuccess, fetchPlacesSuccess } from "../../redux/actions";
import { getAutocomplete } from "../../api";

const autocompleteService = { current: null };

export const SearchHistory: React.FC<Props> = (props) => {
  const { isLoaded, subscribe } = props;
  const [value, setValue] = useState<PlaceType | null | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const loaded = useRef(false);
  const dispatch = useDispatch();
  const searchHistory: { places: PlaceType[] } =
    store.getState()?.searches?.places;
  console.log("searchHistory", store.getState()?.searches);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-map-script")) {
      console.log("loading", isLoaded);
    }
    loaded.current = isLoaded;
  }

  //======EVENTS
  const onInputChange = (input) => setInputValue(input);
  const onChange = (newValue?: PlaceType | null) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
    dispatch(
      fetchPlacesSuccess({
        description: newValue?.description,
        place_id: newValue?.place_id,
      })
    );
    dispatch(
      fetchGeoSuccess({
        address: newValue?.description,
        placeId: newValue?.place_id,
      })
    );
  };

  //======EFFECTS
  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    getAutocomplete(
      autocompleteService.current,
      { input: inputValue },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];
          if (value) newOptions = [value];
          if (results) newOptions = [...newOptions, ...results];
          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, dispatch]);

  return (
    <div>
      <AutoComplete
        isLoaded={isLoaded}
        value={value}
        options={options}
        onChange={onChange}
        onInputChange={onInputChange}
      />
      <SearchList places={searchHistory?.places} />
    </div>
  );
};

export default SearchHistory;
