import React from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import CourseButton from '../components/CourseButton';
  

export default function InfoScreen({ navigation }) {
  const handleCoursePress = (courseTitle) => {
    navigation.navigate('Course', { title: courseTitle });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Preparedness Training</Text>
      </View>

      <View style={styles.coursesContainer}>
        <CourseButton title="Hurricane Basics" onPress={() => handleCoursePress("Hurricane Basics")}/>
        <CourseButton title="Emergency Supplies" onPress = {() => handleCoursePress("Emergency Supplies")}/>
        <CourseButton title="Evacuation Planning" onPress = {() => handleCoursePress("Evacuation Planning")} />
        <CourseButton title ="First Aid Basics" onPress = {() => handleCoursePress("First Aid Basics")}/>
        <CourseButton title ="Food Preparation and Storage" onPress = {() => handleCoursePress("Food Preparation and Storage")}/>
        <CourseButton title ="Water" onPress = {() => handleCoursePress("Water")}/>
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
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#1f2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#9ca3af',
  },
  coursesContainer: {
    padding: 16,
  },
});