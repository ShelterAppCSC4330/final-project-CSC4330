import React, { useContext } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import CourseButton from '../components/CourseButton';
import { CourseProgress } from '../context/CourseProgress';


export default function InfoScreen({ navigation }) {

  const { completedCourses } = useContext(CourseProgress);
  const handleCoursePress = (title) => {
    navigation.navigate('Course', { title });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Preparedness Training</Text>
      </View>

      <View style={styles.coursesContainer}>
        <CourseButton title="Hurricane Basics"  completed={completedCourses.includes("Hurricane Basics")} onPress={() => handleCoursePress("Hurricane Basics")}/>
        <CourseButton title="Emergency Supplies"  completed={completedCourses.includes("Emergency Supplies")} onPress = {() => handleCoursePress("Emergency Supplies")}/>
        <CourseButton title="Evacuation Planning" completed={completedCourses.includes("Evacuation Planning")}  onPress = {() => handleCoursePress("Evacuation Planning")} />
        <CourseButton title ="First Aid Basics" completed={completedCourses.includes("Evacuation Planning")} onPress = {() => handleCoursePress("First Aid Basics")}/>
        <CourseButton title ="Food Preparation and Storage" completed={completedCourses.includes("Food Preparation and Storage")}  onPress = {() => handleCoursePress("Food Preparation and Storage")}/>
        <CourseButton title ="Water" completed={completedCourses.includes("Water")} onPress = {() => handleCoursePress("Water")}/>
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