import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import {
  getAuth,
  createUserWithEmailAndPassword,
  firestore,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import app from "../../firebase";
import DocotorFormScreen from "../screens/DoctorFormScreen";


const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore();

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("doctor"); // Default to "doctor"

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Registered new user:", user.email);
      if (userType === "doctor") {
        // Save doctor data to the "therapists" collection
        console.log("Added document for doctor:", user.email);
        // Navigate to home screen for doctors
        navigation.navigate("DoctorFormScreen");
      } else {
        // Navigate to information screen for patients
        navigation.navigate("InformationForm");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const navigateLogin = () => {
    navigation.navigate("LoginScreen");
  };
  const combinedfunction = () => {
    handleSignUp();
    navigateLogin();
  };

  

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Register your account!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Select User Type:</Text>
        <TouchableOpacity
          style={
            userType === "doctor"
              ? styles.radioButtonSelected
              : styles.radioButton
          }
          onPress={() => setUserType("doctor")}
        >
          <Text style={styles.radioText}>Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            userType === "patient"
              ? styles.radioButtonSelected
              : styles.radioButton
          }
          onPress={() => setUserType("patient")}
        >
          <Text style={styles.radioText}>Patient</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.button}
          buttonStyle={[styles.button, styles.buttonOutline]}
          onPress={combinedfunction}
          title="Register"
          titleStyle={styles.buttonOutlineText}
        />
        <View style={styles.textContainer}>
          <Text>Already have an account?</Text>
          <Button
            type="clear"
            title="Log In"
            titleStyle={styles.text}
            onPress={navigateLogin}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "50%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "green",
    borderWidth: 1,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontSize: 16,
    fontWeight: "700",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 15,
  },
  radioContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  radioButtonSelected: {
    borderWidth: 1,
    borderColor: "#0782F9",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  radioText: {
    fontSize: 16,
  },
});

export default SignUpScreen;