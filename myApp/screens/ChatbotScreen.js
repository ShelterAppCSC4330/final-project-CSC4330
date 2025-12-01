import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const flatListRef = useRef();

  // Placeholder AI logic — replace with API later
  const fakeAIResponse = (userMessage) => {
    return `You said: "${userMessage}". More intelligent responses will come once we hook up the backend.`;
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: fakeAIResponse(userMsg.text),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);

      flatListRef.current?.scrollToEnd({ animated: true });
    }, 500);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#9ca3af"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            style={[styles.sendButton, !input.trim() && { opacity: 0.4 }]}
            onPress={sendMessage}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },

  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    maxWidth: "80%",
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#2563eb",
  },

  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#374151",
  },

  messageText: {
    color: "#fff",
    fontSize: 16,
  },

  inputRow: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#374151",
    backgroundColor: "#1f2937",
  },

  input: {
    flex: 1,
    backgroundColor: "#374151",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    color: "#fff",
  },

  sendButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});