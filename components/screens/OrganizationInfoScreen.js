import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { collection, getDocs, where, query } from "firebase/firestore";
import { firestore } from "../../firebase";

export default function OrganizationInfoScreen({ route }) {
  const { organizationId } = route.params;
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [therapistList, setTherapistList] = useState([]);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const therapistsCollection = collection(firestore, "therapists");
        const q = query(therapistsCollection, where("organizationId", "==", organizationId));

        const snapshot = await getDocs(q);
        const therapistData = snapshot.docs.map((doc) => {
          const {
            firstName,
            lastName,
            email,
            title,
            phoneNumber,
          } = doc.data();
          return {
            id: doc.id,
            firstName,
            lastName,
            email,
            title,
            phoneNumber,
          };
        });

        setTherapistList(therapistData);
        setFilteredDataSource(therapistData);
      } catch (error) {
        console.error("Error getting therapists: ", error);
      }
    };

    fetchTherapists();
  }, [organizationId]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = therapistList.filter(function (item) {
        const itemData = `${item.firstName} ${item.lastName} ${item.email} ${item.title} ${item.phoneNumber}`.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(therapistList);
      setSearch(text);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.textHeader}>Therapists</Text>
      <SearchBar
        round
        searchIcon={{ size: 26 }}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        placeholder="Search therapist by name, email, title, or phone number"
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction("")}
        value={search}
      />
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>First Name</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Last Name</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Email</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Title</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Phone Number</Text>
        </View>
        {filteredDataSource.map((rowData) => (
          <View key={rowData.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{rowData.firstName}</Text>
            <Text style={styles.tableCell}>{rowData.lastName}</Text>
            <Text style={styles.tableCell}>{rowData.email}</Text>
            <Text style={styles.tableCell}>{rowData.title}</Text>
            <Text style={styles.tableCell}>{rowData.phoneNumber}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    paddingTop: 20,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  searchContainer: {
    width: "80%",
    marginBottom: 10,
  },
  tableContainer: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    alignItems: "center",
    marginVertical: 10,
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    color: "#333333",
  },
  tableHeader: {
    fontWeight: "bold",
    color: "#333333",
  },
  searchInputContainer: {
    backgroundColor: "#fff",
    height: 40,
    marginBottom: 10,
  },
});
