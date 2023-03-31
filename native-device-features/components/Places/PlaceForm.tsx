import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { SelectedLocation } from "../../types/types";
import { Button } from "../Button/Button";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { LocationPicker } from "../LocationPicker/LocationPicker";

export const PlaceForm = ({
  onCreatePlace,
}: {
  onCreatePlace: (place: {
    title: string;
    imageUri: string;
    address: string;
    lat: number;
    lng: number;
  }) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  const titleChangeHandler = (text: string) => setTitle(text);

  const imagePickerHandler = (image: string) => setSelectedImage(image);

  const locationPickerHandler = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => setSelectedLocation(location);

  const savePlaceHandler = () => {
    if (selectedLocation) {
      onCreatePlace({
        title,
        imageUri: selectedImage,
        address: selectedLocation?.address,
        lat: selectedLocation?.latitude,
        lng: selectedLocation?.longitude,
      });
    }
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={titleChangeHandler}
          value={title}
        />
      </View>
      <ImagePicker onPickImage={imagePickerHandler} />
      <LocationPicker onPickLocation={locationPickerHandler} />
      <Button onClick={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: { flex: 1, padding: 24 },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
