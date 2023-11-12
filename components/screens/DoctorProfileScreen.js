import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Picker,
  Modal,
  ScrollView,
} from "react-native";
import { Avatar, Button, SearchBar, Input } from "react-native-elements";
import { auth } from "../../firebase";

const initialExercises = [
  { name: "", sets: "", reps: "" },
  { name: "", sets: "", reps: "" },
  { name: "", sets: "", reps: "" },
  { name: "", sets: "", reps: "" },
];

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

  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", medicalCondition: "", email: "" });

  const openAddUserModal = () => {
    setAddUserModalVisible(true);
  };

  const closeAddUserModal = () => {
    setAddUserModalVisible(false);
  };

  const addUser = () => {
    if (newUser.name && newUser.medicalCondition && newUser.email) {
      setUserList([...userList, newUser]);
      closeAddUserModal();
    }
  };

  const [isCreateWorkoutModalVisible, setCreateWorkoutModalVisible] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    workoutName: "",
    date: "",
    exercises: [...initialExercises],
  });

  const openCreateWorkoutModal = () => {
    setCreateWorkoutModalVisible(true);
  };

  const closeCreateWorkoutModal = () => {
    setCreateWorkoutModalVisible(false);
  };

  const createWorkout = () => {
    if (newWorkout.workoutName && newWorkout.date) {
      console.log("New Workout:", newWorkout);
      closeCreateWorkoutModal();
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

        <Button
          type="solid"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.createWorkoutButton}
          titleStyle={styles.buttonTitle}
          title="Workout"
          onPress={openCreateWorkoutModal}
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

      <Modal
        visible={isCreateWorkoutModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Create Workout</Text>
              <Input
                placeholder="Workout Name"
                onChangeText={(text) => setNewWorkout({ ...newWorkout, workoutName: text })}
                value={newWorkout.workoutName}
              />
              <Input
                placeholder="Date"
                onChangeText={(text) => setNewWorkout({ ...newWorkout, date: text })}
                value={newWorkout.date}
              />
              <View style={styles.exercisesContainer}>
                {/* Exercise 1 */}
                <View style={styles.exerciseContainer}>
                  <Text style={styles.formSubtitle}>Exercise 1</Text>
                  <Input
                    placeholder="Exercise Name"
                    onChangeText={(text) =>
                      setNewWorkout((prev) => {
                        const updatedExercises = [...prev.exercises];
                        updatedExercises[0].name = text;
                        return { ...prev, exercises: updatedExercises };
                      })
                    }
                    value={newWorkout.exercises[0].name}
                  />

                  <Text>Sets</Text>
                  <Picker
                    selectedValue={newWorkout.exercises[0].sets}
                    onValueChange={(value) =>
                      setNewWorkout((prevWorkout) => {
                        const updatedExercises = [...prevWorkout.exercises];
                        updatedExercises[0].sets = value;
                        return { ...prevWorkout, exercises: updatedExercises };
                      })
                    }
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <Picker.Item key={i} label={(i + 1).toString()} value={i + 1} />
                    ))}
                  </Picker>

                  <Text>Reps</Text>
                  <Picker
                    selectedValue={newWorkout.exercises[0].reps}
                    onValueChange={(value) =>
                      setNewWorkout((prevWorkout) => {
                        const updatedExercises = [...prevWorkout.exercises];
                        updatedExercises[0].reps = value;
                        return { ...prevWorkout, exercises: updatedExercises };
                      })
                    }
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <Picker.Item key={i} label={(i + 1).toString()} value={(i + 1).toString()} />
                    ))}
                  </Picker>
                </View>

                {/* Exercise 2 */}
                <View style={styles.exerciseContainer}>
                  <Text style={styles.formSubtitle}>Exercise 2</Text>
                  <Input
                    placeholder="Exercise Name"
                    onChangeText={(text) =>
                      setNewWorkout((prev) => {
                        const updatedExercises = [...prev.exercises];
                        updatedExercises[1].name = text;
                        return { ...prev, exercises: updatedExercises };
                      })
                    }
                    value={newWorkout.exercises[1].name}
                  />

                  <Text>Sets</Text>
                  <Picker
                    selectedValue={newWorkout.exercises[1].sets}
                    onValueChange={(value) =>
                      setNewWorkout((prevWorkout) => {
                        const updatedExercises = [...prevWorkout.exercises];
                        updatedExercises[1].sets = value;
                        return { ...prevWorkout, exercises: updatedExercises };
                      })
                    }
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <Picker.Item key={i} label={(i + 1).toString()} value={i + 1} />
                    ))}
                  </Picker>

                  <Text>Reps</Text>
                  <Picker
                    selectedValue={newWorkout.exercises[1].reps}
                    onValueChange={(value) =>
                      setNewWorkout((prevWorkout) => {
                        const updatedExercises = [...prevWorkout.exercises];
                        updatedExercises[1].reps = value;
                        return { ...prevWorkout, exercises: updatedExercises };
                      })
                    }
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <Picker.Item key={i} label={(i + 1).toString()} value={(i + 1).toString()} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.exercisesContainer}>
                {/* Exercise 3 */}
                <View style={styles.exerciseContainer}>
                  <Text style={styles.formSubtitle}>Exercise 3</Text>
                  <Input
                    placeholder="Exercise Name"
                    onChangeText={(text) =>
                      setNewWorkout((prev) => {
                        const updatedExercises = [...prev.exercises];
                        updatedExercises[2].name = text;
                        return { ...prev, exercises: updatedExercises };
                      })
                    }
                    value={newWorkout.exercises[2].name}
                  />

                  <Text>Sets</Text>
                  <Picker
                    selectedValue={newWorkout.exercises[2].sets}
                    onValueChange={(value) =>
                      setNewWorkout((prevWorkout) => {
                        const updatedExercises = [...prevWorkout.exercises];
                        updatedExercises[2].sets = value;
                        return { ...prevWorkout, exercises: updatedExercises };
                      })
                    }
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <Picker.Item key={i} label={(i + 1).toString()} value={i + 1} />
                    ))}
                  </Picker>

                  <Text>Reps</Text>
                  <Picker
                    selectedValue={newWorkout.exercises[2].reps}
                    onValueChange={(value) =>
                      setNewWorkout((prevWorkout) => {
                        const updatedExercises = [...prevWorkout.exercises];
                        updatedExercises[2].reps = value;
                        return { ...prevWorkout, exercises: updatedExercises };
                      })
                    }
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <Picker.Item key={i} label={(i + 1).toString()} value={(i + 1).toString()} />
                    ))}
                  </Picker>
                </View>

                {/* Exercise 4 */}
                <View style={styles.exerciseContainer}>
                  <Text style={styles.formSubtitle}>Exercise 4</Text>
                  <Input
                    placeholder="Exercise Name"
                    onChangeText={(text) =>
                      setNewWorkout((prev) => {
                        const updatedExercises = [...prev.exercises];
                        updatedExercises[3].name = text;
                        return { ...prev, exercises: updatedExercises };
                      })
                    }
                    value={newWorkout.exercises[3].name}
                  />

                  <Text>Sets</Text>
                  <Picker
                    selectedValue={newWorkout.exercises[3].sets}
                    onValueChange={(value) =>
                      setNewWorkout((prevWorkout) => {
                        const updatedExercises = [...prevWorkout.exercises];
                        updatedExercises[3].sets = value;
                        return { ...prevWorkout, exercises: updatedExercises };
                      })
                    }
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <Picker.Item key={i} label={(i + 1).toString()} value={i + 1} />
                    ))}
                  </Picker>

                  <Text>Reps</Text>
                  <Picker
                    selectedValue={newWorkout.exercises[3].reps}
                    onValueChange={(value) =>
                      setNewWorkout((prevWorkout) => {
                        const updatedExercises = [...prevWorkout.exercises];
                        updatedExercises[3].reps = value;
                        return { ...prevWorkout, exercises: updatedExercises };
                      })
                    }
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <Picker.Item key={i} label={(i + 1).toString()} value={(i + 1).toString()} />
                    ))}
                  </Picker>
                </View>
              </View>
              <Button
                buttonStyle={[styles.submitWorkout, { width: 150 }]} 
                title="Submit Workout"
                onPress={createWorkout}
              />
              <Button
               buttonStyle={[styles.cancelWorkout, { width: 150 }]} 
               title="Cancel" 
               onPress={closeCreateWorkoutModal} />
            </View>
          </ScrollView>
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
    display: "block",
    height: 600,
    width: 700,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3498db",
    marginLeft: 250,
  },
  createWorkoutButton: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
    marginTop: 20,
  },
  formSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#2ecc71",
  },
  setRepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  setRepDropdown: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    marginHorizontal: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  exerciseContainer: {
    width: '50%', 
    paddingHorizontal: 10,
  },
  exercisesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitWorkout: {
    marginTop: 20,
    marginLeft: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelWorkout: {
    marginTop: 10,
    marginLeft: 250,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
