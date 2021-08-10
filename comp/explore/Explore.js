import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import useGetGames from "../crud/useGetGames";

function Explore() {
  const navigation = useNavigation();
  let games = useGetGames(0).docs;

  const renderNextgames = ({ item }) => (
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
          paddingVertical: 10,
          height: 300,
          borderRadius: 10,
          margin: 5,
          width: SIZES.width - 50,
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
        <View
          style={{
            width: "100%",
            marginTop: -40,
            paddingVertical: 10,
            marginLeft: 0,
            borderRadius: 10,
            backgroundColor: COLORS.white,
          }}
        >
          <Text
            style={{ paddingHorizontal: 20, ...FONTS.h5, color: COLORS.black }}
          >
            {item.title}
          </Text>
          <Text
            style={{ paddingHorizontal: 20, ...FONTS.h6, color: COLORS.black }}
          >
            {item.genre}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{ flex: 1, marginBottom: 50, backgroundColor: COLORS.white }}
    >
      <View
        style={{
          padding: SIZES.padding * 2,
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ marginTop: 10 }}>
          <Text style={{ ...FONTS.h2, padding: SIZES.padding }}>
            Coming Soon
          </Text>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.primary,
              paddingHorizontal: SIZES.padding,
            }}
          >
            All games to be added to library
          </Text>
          {games && (
            <FlatList
              data={games}
              vertical
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderNextgames}
              contentContainerStyle={{}}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default Explore;
