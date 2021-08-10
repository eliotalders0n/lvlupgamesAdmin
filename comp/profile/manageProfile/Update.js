import React, { useState } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import firebase from "../../../firebase";
import { SIZES, FONTS, COLORS } from "../../../constants";
import { useNavigation } from "@react-navigation/native";

const Update = ({ route }) => {
  const data = route.params.item;
  console.log(data.id);
  const navigation = useNavigation();

  const [title, setTitle] = useState(data.title);
  const [genre, setGenre] = useState(data.genre);
  const [poster, setPoster] = useState(data.poster);
  const [downloadSize, setDownloadSize] = useState(data.downloadSize);
  const [status, setStatus] = useState(data.status);

  // function to request for a verification code
  const updateGame = () => {
    // do something amazing

    let asd = {
      title: title,
      genre: genre,
      createdAt: new Date(Date.now()).toString(),
      status: parseInt(status),
      poster: poster,
      downloadSize: downloadSize,
    };
    firebase
      .firestore()
      .collection("games")
      .doc(data.id)
      .update(asd)
      .then(() => {
        navigation.navigate("Home");
      });

    console.log("update happened");
  };
  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.white,
        padding: SIZES.padding * 3,
        flex: 1,
      }}
    >
      <Text style={{ ...FONTS.h2, marginBottom: 30 }}>
        Lets edit some games
      </Text>
      <View style={styles.miniContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          keyboardType="default"
          placeholder="*Hell Blade Senuas Sacrifice"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setTitle}
          defaultValue={data && data.title}
        />

        <Text style={styles.label}>Status</Text>
        <TextInput
          keyboardType="default"
          placeholder="250"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setStatus}
          defaultValue={data && data.status}
        />
      </View>

      <View style={styles.miniContainer}>
        <Text style={styles.label}>Genre</Text>
        <TextInput
          keyboardType="default"
          placeholder="Racing | Shooter | Fighting"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setGenre}
          defaultValue={data && data.genre}
        />
      </View>

      <View style={styles.miniContainer}>
        <Text style={styles.label}>Download Size</Text>
        <TextInput
          keyboardType="default"
          placeholder="72"
          placeholderTextColor="rgb(135, 135, 135)"
          style={styles.input}
          onChangeText={setDownloadSize}
          defaultValue={data && data.downloadSize}
        />
      </View>

      <Text style={styles.label}>Poster URL</Text>
      <TextInput
        keyboardType="default"
        placeholder="url link"
        placeholderTextColor="rgb(135, 135, 135)"
        autoCompleteType="tel"
        style={styles.input}
        onChangeText={setPoster}
        defaultValue={data && data.poster}
      />

      <TouchableOpacity style={styles.buttonLogin} onPress={() => updateGame()}>
        <Text style={styles.buttonText}>Update Game</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,

    padding: SIZES.padding * 2,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  label: {
    ...FONTS.h5,
    marginVertical: 5,
  },
  buttonLogin: {
    backgroundColor: COLORS.black,
    borderRadius: 10,
    paddingVertical: 20,
    marginVertical: 5,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    ...FONTS.h5,
  },
  buttonLoginText: {
    color: COLORS.black,
    textAlign: "center",
    ...FONTS.h5,
  },
  buttonLogin_: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    marginVertical: 5,
  },
});
export default Update;
