import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "../../firebase";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import useGetUser from "../crud/useGetUser";
import useGetnews from "../crud/useGetnews";
// import UpdateGames from "./manageProfile/UpdateGames";

function profile() {
  const navigation = useNavigation();
  let user = useGetUser(firebase.auth().currentUser.uid).docs;
  let news = useGetnews().docs;

  const [title, setTitle] = useState(news.title);
  const [body, setBody] = useState(news.title);

  // function to request for a verification code
  const update = () => {
    let add = {
      title: title,
      body: body,
      createdAt: new Date(Date.now()).toString(),
    };
    firebase
      .firestore()
      .collection("news")
      .add(add)
      .then(() => {
        console.log("Item added");
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logged out");
      });
  };
  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.white,
        marginBottom: 60,
      }}
    >
      <View
        style={{
          padding: SIZES.padding * 3,
          height: 60,
          backgroundColor: COLORS.black,
        }}
      >
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Profile</Text>
      </View>
      <View
        style={{ padding: SIZES.padding * 3, backgroundColor: COLORS.black }}
      >
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.white,
            fontSize: 30,
            fontWeight: "900",
            textAlign: "left",
          }}
        >
          {user.name && user.name}
        </Text>
        <View style={{ flexDirection: "row", marginVertical: 20 }}>
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              ...FONTS.h5,
              fontWeight: "900",
              color: COLORS.white,
            }}
          >
            {user && user.province}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              ...FONTS.h5,
              color: COLORS.white,
              fontWeight: "900",
            }}
          >
            {user && user.phone}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingBottom: 20,
          backgroundColor: COLORS.black,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("updateProfile", { user })}
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="user" size={24} color={COLORS.secondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("feedback", { user })}
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="mail" size={24} color={COLORS.secondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => logout()}
          style={{
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="log-out" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            marginLeft: 0,
            flex: 7,
            backgroundColor: COLORS.white,
            justifyContent: "left",
          }}
        >
          <TextInput
            keyboardType="default"
            placeholder="News Title"
            placeholderTextColor={COLORS.Gray}
            style={styles.input}
            onChangeText={setTitle}
          />

          <View style={{ flexDirection: "row" }}>
            <TextInput
              keyboardType="default"
              placeholder="News Body"
              placeholderTextColor={COLORS.Gray}
              style={styles.input}
              onChangeText={setBody}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.black,
              marginBottom: 20,
              marginTop: 40,
              // borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}
            onPress={() => update()}
          >
            <Text
              style={{ color: COLORS.white, textAlign: "right", ...FONTS.h4 }}
            >
              Update News
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,

    padding: SIZES.padding * 2,
  },
  input: {
    height: 20,
    width: "80%",
    border: "1",
    borderColor: "grey",
    borderRadius: 10,
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

export default profile;
