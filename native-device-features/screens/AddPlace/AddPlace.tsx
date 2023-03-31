import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { PlaceForm } from "../../components/Places/PlaceForm";
import { insertPlace } from "../../util/database";

type Props = NativeStackScreenProps<RootStackParamList, "AddPlace">;

export const AddPlace = ({ navigation }: Props) => {
  const createPlaceHandler = async (place: {
    title: string;
    imageUri: string;
    address: string;
    lat: number;
    lng: number;
  }) => {
    await insertPlace(place);

    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};
