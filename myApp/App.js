import * as React from "react";
import { Text, View, Button, StyleSheet, Image, TextInput  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity} from "react-native";
import AccountScreen from './screens/AccountScreen';
import DropdownMenu from './components/DropdownMenu';
import InfoScreen from './screens/InfoScreen';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

function StyledButton({ title, onPress }) {
  return (
    <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#e6f2ff' ,'#6696EF']} // top to bottom gradient
      style={styles.gradient}
    >
    <View style={styles.top}>
      <Image
        source={require("./assets/Frame 1-2.png")}
        style={{ width: 150, height: 150, resizeMode: "contain", marginVertical: 0 }}
      />
      <Text  style ={styles.welcomeText}>Welcome to Refuge!{'\n'}Preparedness begins here.</Text>
        <View style={{ flex: 1 }} />
      
      <View style = {styles.bottom}>
      <StyledButton
        title="Go to Shelters"
        onPress={() => navigation.navigate("Shelters")}
      />
      </View>
    </View>
    </LinearGradient>
  );
}

function SheltersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Available Shelters</Text>
      <Text style={styles.text}>Here’s where shelter info will go.</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{ paddingHorizontal: 8 }}>
                <Ionicons name="person-circle-outline" size={30} />
              </TouchableOpacity>
            ),
            headerRight: () => <DropdownMenu navigation={navigation} />,
          })}
          />
          <Stack.Screen name="Shelters" component={SheltersScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
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
    gradient: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  },

  welcomeText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6696EF',
    textAlign: 'center',
    marginTop: 20,
  }
});
const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#f4362cff",
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
