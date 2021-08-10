import React, { useState, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SIZES, COLORS, FONTS } from "../../constants";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../../firebase";

const Signin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifire = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");

  const sendVerification = () => {
    firebase
      .firestore()
      .collection("users")
      .where("phone", "==", phoneNumber + "")
      .where("accType", "==", "admin")
      .get()
      .then((doc) => {
        if (doc.empty) {
          // navigation.navigate("Register");
          console.log("Your number is not registered or you are not an admin");
        } else {
          const phoneProvider = new firebase.auth.PhoneAuthProvider();
          phoneProvider
            .verifyPhoneNumber("+26" + phoneNumber, recaptchaVerifire.current)
            .then(setVerificationId);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // do something amazing
        let userId = firebase.auth().currentUser.uid;
        console.log(userId);
      });
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifire}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={false}
      />
      <Text style={styles.titleText2}>Welcome back,</Text>
      <Text style={styles.titleText}>Enter number to continue</Text>
      <TextInput
        // value="Phone Number"
        keyboardType="number-pad"
        placeholder="097X XXX XXX"
        placeholderTextColor={COLORS.Gray}
        style={styles.input}
        autoCompleteType="tel"
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.secondary,
          marginBottom: 0,
          marginTop: 0,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
        onPress={() => sendVerification()}
      >
        <Text style={{ color: COLORS.white, textAlign: "right", ...FONTS.h4 }}>
          Get OTP(One Time Pin)
        </Text>
      </TouchableOpacity>

      <View style={{ height: 20 }}></View>
      <TextInput
        // value="OTP"
        keyboardType="number-pad"
        placeholder="Enter OTP"
        placeholderTextColor="black"
        onChangeText={setCode}
        style={styles.input}
      />
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.black,
          marginBottom: 20,
          marginTop: 40,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
        onPress={() => confirmCode()}
      >
        <Text style={{ color: COLORS.white, textAlign: "right", ...FONTS.h4 }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding * 3,
    justifyContent: "center",
  },
  titleText: {
    ...FONTS.h5,
    color: COLORS.black,
  },
  titleText2: {
    marginBottom: 80,
    ...FONTS.h2,
    color: "black",
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    ...FONTS.h5,
  },
  input: {
    padding: 10,
    borderRadius: 10,
  },
  button: {
    padding: 3,
    margin: 3,
    marginTop: 50,
  },
  buttonLogin: {
    backgroundColor: COLORS.black,
    borderRadius: 10,
    paddingVertical: 20,
    marginVertical: 10,
  },
});
export default Signin;
