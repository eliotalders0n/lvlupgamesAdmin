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
import useGetTrendingGames from "../crud/useGetTrendingGames";

function TopViewed() {
  let trending = useGetTrendingGames().docs;

  const renderTrending = ({ item }) => (
    <View
      style={{
        paddingVertical: 10,
        borderRadius: 10,
        margin: 5,
        flexDirection: "row",
        backgroundColor: COLORS.white,
      }}
    >
      <Image
        style={{
          width: 90,
          height: 90,
          borderRadius: 10,
          resizeMode: "cover",
        }}
        source={{
          uri: item.poster,
        }}
      />
      <View
        style={{
          marginLeft: 0,
          flex: 7,
          backgroundColor: COLORS.white,
          justifyContent: "center",
        }}
      >
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
            {" "}
            {item.downloadSize} GB
          </Text>
          <Text
            style={{
              paddingHorizontal: 20,
              flex: 1,
              textAlign: "right",
              ...FONTS.h6,
              color: COLORS.black,
            }}
          >
            {item.views} Views
          </Text>
        </View>
      </View>
    </View>
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
        <Text style={{ ...FONTS.h2, padding: SIZES.padding }}>Trending</Text>
        <View style={{}}>
          <Text style={{ ...FONTS.h5, padding: SIZES.padding }}>
            Top Viewed
          </Text>
          {trending && (
            <FlatList
              data={trending}
              vertical
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderTrending}
              contentContainerStyle={{}}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default TopViewed;
