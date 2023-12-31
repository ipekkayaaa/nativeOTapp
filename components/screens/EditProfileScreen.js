import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs, addDoc, where, query, updateDoc, doc } from "firebase/firestore";
import { firestore, auth } from "../../firebase";

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

  const user = auth.currentUser;

  const colRefProfile = collection(firestore, 'patients');

  useEffect(() => {
    if (user) {
      const q = query(colRefProfile, where("userId", "==", user.uid));
      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  }, [user, colRefProfile]);

  const handleChangeText = (key, text) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: text,
    }));
  };

  const handleSaveProfile = () => {
    const q = query(colRefProfile, where("userId", "==", user.uid));

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const userDocRef = doc(firestore, 'patients', querySnapshot.docs[0].id);
          updateDoc(userDocRef, {
            firstName: values.firstName,
            lastName: values.lastName,
            birthday: values.birthday,
            phoneNumber: values.phoneNumber,
            weight: values.weight,
            height: values.height,
            medicalCondition: values.medicalCondition,
          })
            .then(() => {
              console.log("Document successfully updated!");
              navigation.navigate('ProfileScreen', { successMessage: 'Profile successfully updated!' });
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
            });
        } else {
          addDoc(colRefProfile, {
            userId: user.uid,
            firstName: values.firstName,
            lastName: values.lastName,
            birthday: values.birthday,
            phoneNumber: values.phoneNumber,
            weight: values.weight,
            height: values.height,
            medicalCondition: values.medicalCondition,
          })
            .then(() => {
              console.log("Document successfully added!");
              navigation.navigate('ProfileScreen', { successMessage: 'Profile successfully added!' });
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking for existing user data: ", error);
      });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Edit Your Profile</Text>
      <TextInput
        name="firstName"
        style={styles.input}
        placeholder="First Name"
        value={values.firstName}
        onChangeText={(text) => handleChangeText("firstName", text)}
      />
      <TextInput
        name="lastName"
        style={styles.input}
        placeholder="Last Name"
        value={values.lastName}
        onChangeText={(text) => handleChangeText("lastName", text)}
      />
      <TextInput
        placeholder="Birthday"
        style={styles.input}
        value={values.birthday}
        onChangeText={(text) => handleChangeText("birthday", text)}
      />
      <TextInput
        name="phoneNumber"
        style={styles.input}
        placeholder="Phone Number"
        value={values.phoneNumber}
        onChangeText={(text) => handleChangeText("phoneNumber", text)}
      />
      <TextInput
        name="weight"
        style={styles.input}
        placeholder="Weight"
        value={values.weight}
        onChangeText={(text) => handleChangeText("weight", text)}
      />
      <TextInput
        name="height"
        style={styles.input}
        placeholder="Height"
        value={values.height}
        onChangeText={(text) => handleChangeText("height", text)}
      />
      <TextInput
        name="medicalCondition"
        style={styles.input}
        placeholder="Medical Condition"
        value={values.medicalCondition}
        onChangeText={(text) => handleChangeText("medicalCondition", text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveProfile}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancel</Text>
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
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#C5C2B7",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#7DCEA0",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor: "#DAF7A6",
    borderWidth: 2,
  },
  cancelButton: {
    backgroundColor: "#808080",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "30%",
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
