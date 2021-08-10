import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SIZES, FONTS, COLORS } from "../../constants";
import useGetInquiries from "../crud/useGetInquiries";
import firebase from "../../firebase";
import { ScrollView } from "react-native-gesture-handler";

function Inquiries() {
  function updateStatus(id, status) {
    firebase
      .firestore()
      .collection("inquiries")
      .doc(id)
      .update({ status: status })
      .then(() => {
        console.log("status updated");
      })
      .catch((e) => {
        console.log("Error", e);
      });
  }

  let inquiries = useGetInquiries().docs;

  const renderInquiries = ({ item }) => (
    <View
      style={{
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: COLORS.white,
      }}
    >
      <Text style={{ ...FONTS.h4, color: COLORS.secondary }}>{item.title}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            flex: 1,
            textAlign: "left",
            ...FONTS.h5,
            color: COLORS.darkgray,
          }}
        >
          {item.genre}
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            ...FONTS.h5,
            color: COLORS.black,
            fontWeight: "900",
          }}
        >
          ZMW {item.price}
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
            textAlign: "right",
            flex: 1,
            ...FONTS.h5,
            color: COLORS.dark,
          }}
        >
          {item.createdAt.slice(0, 11)}
        </Text>
      </View>
      <Text>{item.status}</Text>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: COLORS.lightGray,
          flexDirection: "row",
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={styles.button1}
          onPress={() => updateStatus(item.id, "completed")}
        >
          <Text style={styles.buttonText1}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => updateStatus(item.id, "rejected")}
        >
          <Text style={styles.buttonText2}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Pending = () => {
    return (
      <ScrollView
        style={{
          flex: 1,
          padding: SIZES.padding * 2,
          backgroundColor: COLORS.white,
        }}
      >
        <Text style={{ ...FONTS.h2, padding: SIZES.padding }}>Downloads</Text>

        <View style={{ padding: SIZES.padding, height: SIZES.height }}>
          {inquiries.length !== 0 ? (
            <FlatList
              data={inquiries}
              vertical
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderInquiries}
              contentContainerStyle={{}}
            />
          ) : (
            <Text style={{ ...FONTS.h3, textAlign: "center" }}>
              Its quiet in here. Request for a game from us.
            </Text>
          )}
        </View>
      </ScrollView>
    );
  };

  return Pending();
}

const styles = StyleSheet.create({
  button1: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
    ...FONTS.h4,
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    padding: SIZES.padding,
  },
  buttonText1: {
    color: COLORS.white,
    textAlign: "center",
  },
  button2: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
    ...FONTS.h4,
    textAlign: "center",
    borderRadius: 5,

    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
  },
  buttonText2: {
    color: COLORS.white,
    textAlign: "center",
  },
});

export default Inquiries;
