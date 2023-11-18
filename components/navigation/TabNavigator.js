import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import DietScreen from "../screens/DietScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DoctorProfileScreen from "../screens/DoctorProfileScreen";
import {
  getAuth,
  createUserWithEmailAndPassword,
  firestore,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  length,
  get,
  async,
} from "firebase/firestore";
import app from "../../firebase";

const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const user = auth.currentUser;

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
  
    </Stack.Navigator>
  );
};
const decideprofile = async () => {
  const user = auth.currentUser;
  const patientsCollection = collection(db, "patients");
  const therapistCollection = collection(db, "therapist"); // Corrected collection name
    const patientQuery = query(patientsCollection, where("email", "==", user.email));
    const patientQuerySnapshot = await getDocs(patientQuery);
    if (patientQuerySnapshot.docs && patientQuerySnapshot.docs.length > 0) {
      // User found in the "patients" collection
      console.log('User found in the "patients" collection');
      return 0;
    } else {
      // User not found in the "patients" collection, check "therapists" collection
      const therapistQuery = query(therapistCollection, where("email", "==", user.email));
      const therapistQuerySnapshot = await getDocs(therapistQuery);

      if (therapistQuerySnapshot.docs && therapistQuerySnapshot.docs.length > 0) {
        // User found in the "therapists" collection
        console.log('User found in the "therapists" collection');
        return 1;
      } else {
        // User not found in either collection
        console.log('User not found in both "patients" and "therapists" collections');
      }
    }
} 

const HomeTabNavigator = () => {
  const [userType, setUserType] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await decideprofile();
        setUserType(result);
      } catch (error) {
        console.error('Error in HomeTabNavigator:', error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, []);
  if(userType == 0){
    console.log('we did it boys');
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
            iconName = "md-home-outline";
        
            } else if (route.name === "Diet") {
            iconName = "md-restaurant-outline";
            } else if (route.name === "Profile") {
            iconName = "md-person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#216afc",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{ headerShown: false }}
        />
    
        <Tab.Screen name="Healthy Life" component={DietScreen} />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerTitle: "Personal Infomation",
            headerTitleAlign: "center",
          }}
        />

      
    </Tab.Navigator>
    );
  }else if(userType == 1){
    console.log('This function runs');
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
            iconName = "md-home-outline";
        
            } else if (route.name === "Diet") {
            iconName = "md-restaurant-outline";
            } else if (route.name === "Profile") {
            iconName = "md-person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#216afc",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{ headerShown: false }}
        />
    
        <Tab.Screen name="Healthy Life" component={DietScreen} />
        <Tab.Screen
        name="DoctorProfile"
        component={DoctorProfileScreen}
        options={{
          headerShown: true,
          headerTitle: "Personal Infomation",
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
    )
  }
};

export default HomeTabNavigator;
