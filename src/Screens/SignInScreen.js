import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth } from "../firebase";

const SignInScreen = ({ navigation }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState(null);

  const handleSignIn = () => {
    const { email, password } = values; // Destructure email and password from values
    auth
      .signInWithEmailAndPassword(email, password) // Correct method: signInWithEmailAndPassword
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
        setLoginStatus("Sign in successful!"); // Update login status
        // Add any further actions upon successful login if needed
      })
      .catch((error) => {
        alert(error.message);
        setLoginStatus("Sign in failed!"); // Update login status in case of an error
      });
  };

  return (
    <View style={styles.loginSignup}>
      <View style={styles.form}>
        <Text style={styles.formH2}>Sign In</Text>
        {loginStatus && (
          <Text style={styles.successMessage}>{loginStatus}</Text>
        )}
        <TextInput
          placeholder="Enter Email"
          value={values.email}
          onChangeText={(text) => setValues({ ...values, email: text })}
          style={styles.formInput}
        />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={true}
          value={values.password}
          onChangeText={(text) => setValues({ ...values, password: text })}
          style={styles.formInput}
        />
        <TouchableOpacity onPress={handleSignIn} style={styles.formButton}>
          <Text>Sign In</Text>
        </TouchableOpacity>
        <Text>If you do not have an account, click Sign Up button</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.formButton}
        >
          <Text style={styles.formLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;
