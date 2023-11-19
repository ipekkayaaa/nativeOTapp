import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Picker, Alert } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { auth, storage, firestore } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, where, query, doc, updateDoc } from "firebase/firestore";
import ImagePicker from 'react-native-image-picker';

const ProfileScreen = ({ route }) => {
  const { successMessage } = route.params || {};
  const [workoutPlanList, setWorkoutPlanList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Not Completed");
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const userEmail = auth.currentUser?.email;

        if (userEmail) {
          const workoutPlanCollection = collection(firestore, "workoutPlan");
          const q = query(workoutPlanCollection, where("email", "==", userEmail));

          const snapshot = await getDocs(q);
          const workoutPlanData = snapshot.docs.map((doc) => {
            const workoutName = doc.data().workoutName;
            const workoutDate = doc.data().workoutDate;
            const status = doc.data().status;

            return { id: doc.id, workoutName, workoutDate, status };
          });

          setWorkoutPlanList(workoutPlanData);
        }
      } catch (error) {
        console.error("Error getting workout plan documents: ", error);
      }
    };

    fetchWorkoutPlans();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LoginScreen");
      })
      .catch((err) => alert(err.message));
  };

  const handleStatusChange = async (workoutId) => {
    try {
      const workoutDocRef = doc(firestore, "workoutPlan", workoutId);
      await updateDoc(workoutDocRef, { status: selectedStatus });
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const handleChangePicture = () => {
    ImagePicker.showImagePicker({ title: 'Select Profile Picture' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setProfileImage(source);

        const userId = auth.currentUser?.uid;
        const storageRef = storage.ref(`profilePictures/${userId}`);
        storageRef.putFile(response.path)
          .then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot.metadata);
            // Update the user's profile picture URL in Firestore
            const userRef = doc(firestore, "users", userId);
            updateDoc(userRef, { profilePicture: snapshot.metadata.fullPath });
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleChangePicture}>
          {profileImage ? (
            <Avatar
              rounded
              size={120}
              source={{ uri: profileImage.uri }}
              activeOpacity={0.7}
            />
          ) : (
            <Avatar
              rounded
              size={120}
              icon={{ name: "person", type: "material" }}
              activeOpacity={0.7}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          type="solid"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.changePictureButton}
          titleStyle={styles.buttonTitle}
          title="Change Picture"
          onPress={handleChangePicture}
        />

        <Button
          type="solid"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.editProfileButton}
          titleStyle={styles.buttonTitle}
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfileScreen")}
        />

        <Button
          type="solid"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.logOutButton}
          titleStyle={styles.buttonTitle}
          title="Log Out"
          onPress={handleSignOut}
        />
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>Workout Name</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Workout Date</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Status</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Update</Text>
        </View>
        {workoutPlanList.map((rowData) => (
          <TouchableOpacity
            key={rowData.id}
            style={styles.tableRow}
            onPress={() => navigation.navigate("WorkoutScreen", { workoutId: rowData.id })}
          >
            <Text style={[styles.tableCell, styles.linkTitle]}>{rowData.workoutName}</Text>
            <Text style={styles.tableCell}>
              {rowData.workoutDate
                ? rowData.workoutDate.toDate
                  ? rowData.workoutDate.toDate().toLocaleDateString()
                  : "Invalid Date"
                : "No Date"}
            </Text>
            <Text style={[styles.tableCell]}>{rowData.status ? "Completed" : "Not Completed"}</Text>

            <View style={styles.statusPickerContainer}>
              <Picker
                selectedValue={selectedStatus}
                onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                style={styles.statusPicker}
              >
                <Picker.Item label="Not Completed" value="Not Completed" />
                <Picker.Item label="Completed" value="Completed" />
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => handleStatusChange(rowData.id)}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarStyle: {
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#3498db",
  },
  emailText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "80%",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 16,
  },
  changePictureButton: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
  },
  editProfileButton: {
    backgroundColor: "#27ae60",
    borderColor: "#27ae60",
  },
  logOutButton: {
    backgroundColor: "#e74c3c",
    borderColor: "#e74c3c",
  },
  tableContainer: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    marginLeft:110,
  },
  tableHeader: {
    fontWeight: "bold",
    marginLeft: 120,
  },
  updateButton: {
    backgroundColor: "#3498db",
    padding: 5,
    borderRadius: 5,
    marginTop: 2,
    marginRight:70,
  },
  updateButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  linkTitle: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    marginRight: 10,
  },
 
  statusPickerContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10, // Adjust the margin as needed
  },
  statusPicker: {
    width: 120,
  },

});

export default ProfileScreen;