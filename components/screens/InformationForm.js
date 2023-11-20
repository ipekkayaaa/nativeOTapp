// import React, { useState } from "react";
// import { View, TextInput, Text, StyleSheet, Alert } from "react-native";
// import { Button } from "react-native-elements";
// import { addDoc, collection } from "firebase/firestore";
// import { firestore } from "../../firebase";
// import { getAuth } from "firebase/auth";

// const PatientFormScreen = ({ navigation, route }) => {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const email = user.email;

//   const [values, setValues] = useState({
//     firstName: "",
//     lastName: "",
//     birthday: "",
//     phoneNumber: "",
//     weight: "",
//     height: "",
//     medicalCondition: "",
//     email: email,
//   });

//   const handleSaveForm = async () => {
//     // Validate input
//     if (
//       !values.firstName ||
//       !values.lastName ||
//       !values.birthday ||
//       !values.phoneNumber ||
//       !values.weight ||
//       !values.height ||
//       !values.medicalCondition
//     ) {
//       alert("Please fill out all the fields before submitting your registration.");
//       return;
//     }

//     const colRefPatients = collection(firestore, "patients");

//     try {
//       await addDoc(colRefPatients, {
//         ...values,
//       });

//       console.log("Patient data added successfully!");
//       navigation.navigate("LoginScreen");
//     } catch (error) {
//       alert("Error adding patient data: " + error.message);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.headline}>Please fill out the form to complete your registration.</Text>

//       <TextInput
//         placeholder="First Name"
//         style={styles.input}
//         value={values.firstName}
//         onChangeText={(text) => setValues({ ...values, firstName: text })}
//       />
//       <TextInput
//         placeholder="Last Name"
//         style={styles.input}
//         value={values.lastName}
//         onChangeText={(text) => setValues({ ...values, lastName: text })}
//       />
//       <TextInput
//         placeholder="Birthday"
//         style={styles.input}
//         value={values.birthday}
//         onChangeText={(text) => setValues({ ...values, birthday: text })}
//       />
//       <TextInput
//         placeholder="Phone Number"
//         style={styles.input}
//         value={values.phoneNumber}
//         onChangeText={(text) => setValues({ ...values, phoneNumber: text })}
//       />
//       <TextInput
//         placeholder="Weight"
//         style={styles.input}
//         value={values.weight}
//         onChangeText={(text) => setValues({ ...values, weight: text })}
//       />
//       <TextInput
//         placeholder="Height"
//         style={styles.input}
//         value={values.height}
//         onChangeText={(text) => setValues({ ...values, height: text })}
//       />
//       <TextInput
//         placeholder="Medical Condition"
//         style={styles.input}
//         value={values.medicalCondition}
//         onChangeText={(text) =>
//           setValues({ ...values, medicalCondition: text })
//         }
//       />

//       <Button
//         containerStyle={styles.button}
//         buttonStyle={[styles.button, styles.buttonOutline]}
//         onPress={handleSaveForm}
//         title="Submit Registration"
//         titleStyle={styles.buttonOutlineText}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   headline: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 10,
//     borderColor: "green",
//     borderWidth: 1,
//     width: "80%", // Adjust the width as needed
//   },
//   button: {
//     width: "50%",
//     marginTop: 20,
//     borderRadius: 10,
//     marginLeft: "15%",
//   },
//   buttonOutline: {
//     backgroundColor: "#7DCEA0",
//     marginTop: 5,
//     borderColor: "#DAF7A6",
//     borderWidth: 2,
//   },
//   buttonOutlineText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//   },
// });

// export default PatientFormScreen;


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase";

export default function InformationForm({ navigation }) {
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

  const colRefProfile = collection(firestore, "patients");

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
          const userDocRef = doc(
            firestore,
            "patients",
            querySnapshot.docs[0].id
          );
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
              navigation.navigate("ProfileScreen", {
                successMessage: "Profile successfully updated!",
              });
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
              navigation.navigate("ProfileScreen", {
                successMessage: "Profile successfully added!",
              });
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
      <Text style={styles.heading}>InformationForm</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
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
  cancelButton: {
    backgroundColor: "#999",
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
