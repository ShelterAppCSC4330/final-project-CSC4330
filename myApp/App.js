import * as React from "react";
import { Text, View, Button, StyleSheet, Image, TextInput  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity} from "react-native";
import AccountScreen from './screens/AccountScreen';
import DropdownMenu from './components/DropdownMenu';
import InfoScreen from './screens/InfoScreen';
import ProfileScreen from "./screens/ProfileScreen";
import ShelterScreen from './screens/ShelterScreen';
import { ShelterProvider } from './context/ShelterProvider';
import { Ionicons } from '@expo/vector-icons';
import CourseScreen from './screens/CourseScreen';
import QuizScreen from "./screens/QuizScreen";
import {Progress} from "./context/CourseProgress";

function StyledButton({ title, onPress }) {
  return (
    <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function HomeScreen({ navigation }) {
  return (
   <View style={styles.container}>
    <View style={styles.top}>
      <Image
        source={require("./assets/Frame 1-3.png")}
        style={{ width: 200, height: 200, resizeMode: "contain", marginVertical: 0 }}
      />
      <Text  style ={styles.welcomeText}>Welcome to Refuge!{'\n'}Preparedness begins here.</Text>

      {/* Notification Center */}
      <View style={styles.notificationBox}>
        <Text style={styles.notificationTitle}>Notification Center</Text>
        <Text style={styles.notificationText}>
          No new alerts. Check back for emergency updates and important notices.
        </Text>
      </View>
        
      <View style={{ flex: 1 }} />
      
      <View style = {styles.bottom}>
      <StyledButton
        title="Find Shelters"
        onPress={() => navigation.navigate("Shelters")}
      />
      </View>
    </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ShelterProvider>
      <Progress>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1f2937', 
          },
          headerTintColor: '#ffffff', 
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
          title: 'Home',
          headerRight: () => <DropdownMenu navigation={navigation} />,
        })}
    />
    <Stack.Screen name="Shelters" component={ShelterScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Info" component={InfoScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: "Course Quiz" }} />
    <Stack.Screen name="Course" component={CourseScreen}
      options={({ route }) => ({
      title: route.params?.title || 'Course'
    })}
  />
      </Stack.Navigator>
      </NavigationContainer>
      </Progress>
    </ShelterProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2937",
    borderColor: "#2563eb",     
    borderWidth: 5,             
    borderRadius: 2,                        
    overflow: "hidden",   
  },
  top: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 60, // push title down a bit from the very top
  },
  bottom: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 40, // space from bottom
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  
   notificationBox: {
    backgroundColor: "#2563eb", 
    padding: 20,
    borderRadius: 20,
    width: "70%",
    alignSelf: "center", 
    marginTop: 30,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  notificationText: {
    fontSize: 16,
    color: "#d1d5db", 
  },
  welcomeText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  }
});
const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },



});
