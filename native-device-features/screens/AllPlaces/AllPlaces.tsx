import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { RootStackParamList } from "../../App";
import { PlacesList } from "../../components/Places/PlacesList";
import { Place } from "../../types/types";
import { fetchPlaces } from "../../util/database";

type Props = NativeStackScreenProps<RootStackParamList, "AllPlaces">;

export const AllPlaces = ({ route }: Props) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setPlaces(places);
    };

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
};
