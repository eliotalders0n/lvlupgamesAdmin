import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SIZES, FONTS, COLORS } from "../../constants";
import useGetAllGames from "../crud/useGetAllGames";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import firebase from "../../firebase";

const Explore = ({ item }) => {
  let games = useGetAllGames().docs;
  //   console.log(datas.id);
  const navigation = useNavigation();

  function DeleteItem(key) {
    firebase
      .firestore()
      .collection("games")
      .doc(key)
      .delete()
      .then(() => {
        console.log("deleted");
        navigation.goBack();
      });
  }

  const renderGames = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Update", { item })}
      key={item.id}
      style={{
        paddingVertical: 10,
        height: 280,
        borderRadius: 10,
        margin: 5,
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          width: "100%",
          marginTop: -20,
          paddingVertical: 10,
          marginLeft: 0,
          borderRadius: 10,
          backgroundColor: COLORS.white,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: 220,
            borderRadius: 10,
            resizeMode: "cover",
          }}
          source={{
            uri: item.poster,
          }}
        />
        <Text
          style={{ paddingHorizontal: 20, ...FONTS.h5, color: COLORS.black }}
        >
          {item.title}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              paddingHorizontal: 20,
              flex: 1,
              ...FONTS.h6,
              color: COLORS.black,
            }}
          >
            {item.downloadSize} GB
          </Text>
          <Text
            style={{
              paddingHorizontal: 20,
              ...FONTS.h6,
              flex: 1,
              textAlign: "right",
              color: COLORS.secondary,
            }}
          >
            ZMW {item.downloadSize * 6}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => DeleteItem(item.id)}
          style={{
            flex: 1,
            padding: SIZES.padding * 2,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: COLORS.black,
            marginHorizontal: 5,
          }}
        >
          <Feather name="x" color="white" size={24} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View
        style={{
          padding: SIZES.padding * 2,
          height: "100%",
          backgroundColor: COLORS.white,
          marginBottom: 50,
        }}
      >
        <Text style={{ ...FONTS.h2, padding: SIZES.padding }}>
          Update Games{" "}
        </Text>
        <Text
          style={{
            ...FONTS.h5,
            color: COLORS.primary,
            paddingHorizontal: SIZES.padding,
          }}
        >
          All games in our database
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddGames")}
          style={{
            flex: 1,
            marginHorizontal: 5,
            marginTop: 20,
            borderRadius: 10,
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
              color: "orange",
              paddingHorizontal: SIZES.padding,
            }}
          >
            Add Game
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 30 }}>
          {games && (
            <FlatList
              data={games}
              vertical
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderGames}
              contentContainerStyle={{}}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};
export default Explore;
