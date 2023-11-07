import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, CheckBox, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { auth } from "../../firebase";
import EditProfileScreen from "./EditProfileScreen";

export default function ProfileScreen({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LoginScreen");
      })
      .catch((err) => alert(err.message));
  };

  const [updatedWeeklyData, setUpdatedWeeklyData] = useState([
    { day: 'Monday', link: '', status: true },
    { day: 'Tuesday', link: '', status: false },
    { day: 'Wednesday', link: '', status: true },
    { day: 'Thursday', link: '', status: false },
    { day: 'Friday', link: '', status: true },
    { day: 'Saturday', link: '', status: false },
    { day: 'Sunday', link: '', status: true },
  ]);

  const updateTable = () => {
    // Handle the update logic here
    console.log("Updated Weekly Data:", updatedWeeklyData);
  };

  const handleLinkChange = (index, link) => {
    const updatedData = [...updatedWeeklyData];
    updatedData[index].link = link;
    setUpdatedWeeklyData(updatedData);
  };

  const handleStatusChange = (index) => {
    const updatedData = [...updatedWeeklyData];
    updatedData[index].status = !updatedData[index].status;
    setUpdatedWeeklyData(updatedData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          rounded
          size={120}
          icon={{ name: "person", type: "material" }}
          avatarStyle={styles.avatarStyle}
          activeOpacity={0.7}
        />
        <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          type="solid"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.changePictureButton}
          titleStyle={styles.buttonTitle}
          title="Change Picture"
          onPress={() => console.log("Change this picture!")}
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
          <Text style={[styles.tableCell, styles.tableHeader]}>Day</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Link</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Status</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Update Table</Text>
        </View>
        {updatedWeeklyData.map((rowData, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{rowData.day}</Text>
            <View style={styles.linkInputContainer}>
              <TextInput
                style={styles.linkInput}
                value={rowData.link}
                onChangeText={(link) => handleLinkChange(index, link)}
                placeholder="Please enter workout link"
                textAlign="left"
              />
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={rowData.status}
                onValueChange={() => handleStatusChange(index)}
              />
            </View>
            <View style={styles.updateButtonContainer}>
              <TouchableOpacity style={styles.updateButton} onPress={updateTable}>
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

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
  },
  tableHeader: {
    fontWeight: "bold",
    marginLeft: 120,
  },
  linkInputContainer: {
    flex: 2,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  linkInput: {
    padding: 5,
  },
  checkboxContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 60,
  },
  updateButtonContainer: {
    flex: 1,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#3498db",
    padding: 5,
    borderRadius: 5,
    marginTop: 2,
  },
  updateButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});


