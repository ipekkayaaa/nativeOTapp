import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal, // Added to handle the user input form
} from "react-native";
import { Avatar, Button, SearchBar, Input } from "react-native-elements"; // Import Input for form input
import { auth } from "../../firebase";
import ProfileScreen from "./ProfileScreen";

export default function DoctorProfile({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LoginScreen");
      })
      .catch((err) => alert(err.message));
  };

  const [userList, setUserList] = useState([
    { id: 1, name: 'User 1', medicalCondition: 'Condition 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', medicalCondition: 'Condition 2', email: 'user2@example.com' },
    // Add more users here
  ]);

  const [search, setSearch] = useState("");
  const [filteredUserList, setFilteredUserList] = useState(userList);

  // State for the user input form
  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", medicalCondition: "", email: "" });

  const openAddUserModal = () => {
    setAddUserModalVisible(true);
  };

  const closeAddUserModal = () => {
    setAddUserModalVisible(false);
  };

  const addUser = () => {
    // Validate the new user data, you can add more validation here
    if (newUser.name && newUser.medicalCondition && newUser.email) {
      // Add the new user to the user list
      setUserList([...userList, newUser]);
      // Close the modal
      closeAddUserModal();
    }
  };

  useEffect(() => {
    searchFilterFunction(search);
  }, [search]);

  const navigateToUserProfile = (user) => {
    navigation.navigate("ProfileScreen", { user });
  };

  const searchFilterFunction = (text) => {
    setSearch(text);
    const newData = userList.filter((item) => {
      const itemEmail = item.email.toUpperCase();
      const searchText = text.toUpperCase();
      return itemEmail.includes(searchText);
    });
    setFilteredUserList(newData);
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

        {/* Add User Button */}
        <Button
          type="solid"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.addUserButton} // Style for the "Add User" button
          titleStyle={styles.buttonTitle}
          title="Add User"
          onPress={openAddUserModal} // Open the user input form
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

      <SearchBar
        round
        searchIcon={{ size: 26 }}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        placeholder="Search user by email"
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction("")}
        value={search}
      />

      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>User Name</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Medical Condition</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Email Address</Text>
        </View>
        <FlatList
          data={filteredUserList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tableRow}
              onPress={() => navigateToUserProfile(item)}
            >
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.medicalCondition}</Text>
              <Text style={styles.tableCell}>{item.email}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* User Input Form Modal */}
      <Modal visible={isAddUserModalVisible} animationType="slide">
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add User</Text>
          <Input
            placeholder="Name"
            onChangeText={(text) => setNewUser({ ...newUser, name: text })}
            value={newUser.name}
          />
          <Input
            placeholder="Medical Condition"
            onChangeText={(text) => setNewUser({ ...newUser, medicalCondition: text })}
            value={newUser.medicalCondition}
          />
          <Input
            placeholder="Email"
            onChangeText={(text) => setNewUser({ ...newUser, email: text })}
            value={newUser.email}
          />
          <Button title="Add User" onPress={addUser} />
          <Button title="Cancel" onPress={closeAddUserModal} />
        </View>
      </Modal>
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
  searchContainer: {
    width: "80%",
    marginBottom: 10,
  },
  searchInputContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    borderTopWidth: 0,
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
  },
  addUserButton: {
    backgroundColor: "#ff7f50",
    borderColor: "#ff7f50",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
