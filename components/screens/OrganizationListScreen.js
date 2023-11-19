import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

export default function OrganizationListScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const organizationCollection = collection(firestore, "organizations");
        const snapshot = await getDocs(organizationCollection);
        const organizationData = snapshot.docs.map((doc) => {
          const {
            organizationName,
            city,
            state,
            phoneNumber,
          } = doc.data();
          return {
            id: doc.id,
            organizationName,
            city,
            state,
            phoneNumber,
          };
        });

        setOrganizationList(organizationData);
        setFilteredDataSource(organizationData);
      } catch (error) {
        console.error("Error getting organizations: ", error);
      }
    };

    fetchOrganizations();
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = organizationList.filter(function (item) {
        const itemData = item.organizationName
          ? item.organizationName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(organizationList);
      setSearch(text);
    }
  };

  const handleOrganizationPress = (organizationId) => {
    navigation.navigate("OrganizationInfoScreen", { organizationId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.textHeader}>Organizations</Text>
      <SearchBar
        round
        searchIcon={{ size: 26 }}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        placeholder="Search organization by name"
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction("")}
        value={search}
      />
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>
            Organization Name
          </Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>City</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>State</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>
            Phone Number
          </Text>
        </View>
        {filteredDataSource.map((rowData) => (
          <TouchableOpacity
            key={rowData.id}
            onPress={() => handleOrganizationPress(rowData.id)}
            style={styles.link}
          >
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.linkTitle]}>
                {rowData.organizationName}
              </Text>
              <Text style={styles.tableCell}>{rowData.city}</Text>
              <Text style={styles.tableCell}>{rowData.state}</Text>
              <Text style={styles.tableCell}>{rowData.phoneNumber}</Text>
            </View>
          </TouchableOpacity>
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
  link: {
    // Add styles for the link if needed
  },
  linkTitle: {
    fontSize: 16,
    color: "#2196F3",
    textDecorationLine: "underline",
  },
  searchInputContainer: {
    backgroundColor: "#fff",
    height: 40,
    marginBottom: 10,
  },
});
