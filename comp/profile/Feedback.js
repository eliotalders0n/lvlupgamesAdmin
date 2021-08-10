import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import useGetFeedback from "../crud/useGetFeedback";

function Feedback() {
  let navigation = useNavigation();
  let feed = useGetFeedback().docs;
  console.log(feed);

  const renderFeedback = ({ item }) => (
    <TouchableOpacity
      // onPress={() => navigation.navigate("userProfile", { item })}
      style={{
        paddingVertical: 15,
        marginVertical: 5,
        marginHorizontal: 5,
        paddingHorizontal: 0,
        justifyContent: "center",
        alignItems: "center",
        borderColor: COLORS.secondary,
        borderRadius: 10,
        backgroundColor: COLORS.black,
      }}
    >
      <View>
        <Text
          style={{ paddingHorizontal: 20, color: COLORS.white, ...FONTS.h4 }}
        >
          {item.feedback}
        </Text>
        <Text
          style={{ paddingHorizontal: 20, color: COLORS.white, ...FONTS.h5 }}
        >
          {item.createdAt}
        </Text>
        <Text
          style={{
            paddingHorizontal: 20,
            borderRadius: 10,
            color: COLORS.secondary,
            ...FONTS.h5,
          }}
        >
          {item.type}
        </Text>
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
        }}
      >
        <View style={{ marginTop: 30 }}>
          <Text style={{ ...FONTS.h4, marginBottom: 20 }}>Recent</Text>
          {feed && (
            <FlatList
              data={feed.slice(0, 10)}
              vertical
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderFeedback}
              contentContainerStyle={{}}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default Feedback;
