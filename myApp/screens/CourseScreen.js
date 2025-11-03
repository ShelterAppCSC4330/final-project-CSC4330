import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CourseScreen({ route }) {
  const { title } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Course Content</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Welcome to {title}</Text>
        <Text style={styles.text}>
          This is where your course content will go. You can add sections, 
          lessons, and quizzes here.
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 What You'll Learn</Text>
          <Text style={styles.text}>
            • Important preparedness information{'\n'}
            • Safety guidelines{'\n'}
            • Step-by-step instructions{'\n'}
            • Quiz to test your knowledge
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏱️ Course Duration</Text>
          <Text style={styles.text}>Approximately 15-20 minutes</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    backgroundColor: '#1f2937',
    padding: 24,
    borderBottomWidth: 3,
    borderBottomColor: '#2563eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
  },
  content: {
    padding: 20,
  },
  section: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#1f2937',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
  },
});