import React, { useState } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function StyledButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");

  const baseUrl = "https://backend-jls5.onrender.com";

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    const payload = { username, password };
    const url =
      mode === "login"
        ? `${baseUrl}/authenticate`
        : `${baseUrl}/users`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      
      let data = null;
      try {
        data = await response.json();
      } catch (err) {
        Alert.alert(
          "Server Error",
          "Unexpected server response. Please try again."
        );
        return;
      }

      // -------------------------
      // AUTO-LOGIN AFTER REGISTER
      // -------------------------
      if (mode === "register") {
        if (response.status === 200 || response.status === 201) {
          try {
            const loginRes = await fetch(`${baseUrl}/authenticate`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            const loginData = await loginRes.json();

            if (loginRes.status !== 200) {
              Alert.alert("Error", "Account created, but auto-login failed.");
              return;
            }

            const token = loginData.body;
            await AsyncStorage.setItem("token", token);

            navigation.navigate("Profile");
            return;

          } catch {
            Alert.alert("Error", "Account created, but login failed.");
            return;
          }
        } else {
          Alert.alert(
            "Error",
            data?.message || data?.body || "Could not create account."
          );
        }
        return;
      }

      // -------------------------
      // HANDLE LOGIN
      // -------------------------
      if (response.status !== 200) {
        Alert.alert(
          "Error",
          data?.message || data?.body || "Invalid username or password."
        );
        return;
      }

      const token = data?.body;
      if (!token || typeof token !== "string") {
        Alert.alert("Error", "Server did not return a valid token.");
        return;
      }

      await AsyncStorage.setItem("token", token);

      navigation.navigate("Profile");

    } catch (error) {
      Alert.alert("Error", "Unable to connect to server.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image
            source={require("../assets/Frame 1-2.png")}
            style={styles.logo}
          />

          <View style={styles.form}>
            <Text style={styles.title}>
              {mode === "login" ? "Login" : "Create Account"}
            </Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <StyledButton
              title={mode === "login" ? "Login" : "Register"}
              onPress={handleSubmit}
            />

            <TouchableOpacity
              onPress={() => setMode(mode === "login" ? "register" : "login")}
              style={{ marginTop: 12, alignItems: "center" }}
            >
              <Text style={styles.link}>
                {mode === "login"
                  ? "Register an account"
                  : "Already have an account? Log in"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E", // dark grey
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  form: {
    width: "100%",
    backgroundColor: "#2A2A2A", // slightly lighter dark grey
    padding: 35,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  logo: {
    width: 260,
    height: 170,
    resizeMode: "contain",
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#B0B0B0",
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: "#2979FF",
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "white",
  },
  link: {
    color: "#76A9FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2979FF", // Blue button
    paddingVertical: 14,
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
