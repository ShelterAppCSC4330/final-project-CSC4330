import React, {useState} from "react";
import { Text, View, Button, StyleSheet,Image, TextInput } from "react-native";
import { TouchableOpacity} from "react-native";

//reused code from app.js
//may benefit from refactoring StyledButton in its own file to be exported to multiple screens if necessary
function StyledButton({ title, onPress }) {
  return (
    <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function AccountScreen() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [mode, setMode] = useState("login");

    const handleSubmit = () => {
        if (mode === "login") {
            //add functionality later
        } else{
            setMode("login");
        }

    };
    return (
        <View style = {styles.container}>
            <Image
                source={require("../assets/Frame 1-2.png")}
                style={styles.logo}
            />
            <View style = {styles.form}>
                {/* decide on whether we're keeping track of user emails, if so will need to add field  */}
                <Text style={styles.title}>{mode === "login" ? "Login" : "Register"}</Text>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} placeholder="Enter your username" value={username} onChangeText={setUsername}/>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry value={password} onChangeText={setPassword}/>
                <StyledButton title={mode === "login" ? "Login" : "Register"} onPress={handleSubmit} />
                <TouchableOpacity onPress={() => setMode(mode === "login" ? "register" : "login")} style={{marginTop: 10, alignItems:"center" }}>
                    <Text style={styles.link}>
                        {mode === "login" ? "Register an account" : "Log in"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems:"center",
        paddingHorizontal: 15,
        backgroundColor: "#eef6ff",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5

    },
    form:{
        width:"100%",
        backgroundColor: "white",
        padding: 40,
        borderRadius: 30,
        shadowColor: "black",
        shadowOffset:{
            width:1,
            height:2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 5,
    },
    logo:{
        width:500,
        height:300,
        resizeMode: "contain",
    },
    label: {
        fontSize: 20,
        margin: 5,
        fontWeight: "bold",   
    },
    input: {
        height: 40,
        borderColor: "#c5c5c5ff",
        borderWidth: 2,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    link: {
        color: "#FF3B30",
        fontWeight: 800,
        borderColor: "#FF3B30",
        borderWidth:2,
        padding:10,
        borderRadius: 100
    }

});

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#FF3B30",
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