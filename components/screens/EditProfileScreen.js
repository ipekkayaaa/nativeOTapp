import React, { useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, DatePickerIOS } from "react-native";
import { firestore } from "../../firebase"; // Import your Firebase configuration

export default function EditProfileScreen({ navigation }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    phoneNumber: "",
    weight: "",
    height: "",
    medicalCondition: "",
  });

  const [datePickerVisible, setDatePickerVisible] = useState(false); // State for date picker visibility
  const [chosenDate, setChosenDate] = useState(new Date()); // State for selected date

  const handleSaveProfile = async () => {
    try {
      const userId = "the_user_id"; // Replace with the actual user's ID
      const userRef = firestore.collection("users").doc(userId);

      // Update the user's profile information in Firestore
      await userRef.update({
        firstName: values.firstName,
        lastName: values.lastName,
        birthday: chosenDate, // Update the chosen date
        phoneNumber: values.phoneNumber,
        weight: values.weight,
        height: values.height,
        medicalCondition: values.medicalCondition,
      });

      // After successfully updating the profile, navigate back to the ProfileScreen or any other desired screen.
      navigation.goBack(); // Assuming you want to navigate back to the previous screen.
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={values.firstName}
        onChangeText={(text) => setValues({ ...values, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={values.lastName}
        onChangeText={(text) => setValues({ ...values, lastName: text })}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text>Birthday: {chosenDate.toDateString()}</Text>
      </TouchableOpacity>
      {datePickerVisible && (
        <DatePickerIOS
          style={styles.datePicker}
          date={chosenDate}
          onDateChange={(date) => setChosenDate(date)}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={values.phoneNumber}
        onChangeText={(text) => setValues({ ...values, phoneNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={values.weight}
        onChangeText={(text) => setValues({ ...values, weight: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={values.height}
        onChangeText={(text) => setValues({ ...values, height: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Medical Condition"
        value={values.medicalCondition}
        onChangeText={(text) => setValues({ ...values, medicalCondition: text })}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveProfile}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#C5C2B7",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#38362d",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  datePicker: {
    width: "100%",
  },
});