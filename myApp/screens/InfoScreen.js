import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function InfoScreen() {
return (
<View style={styles.container}>
<Text style={styles.title}>Preparedness Training</Text>
<Text style={styles.text}>
 Select a course to begin your preparedness journey.
</Text>
</View>
 );
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f9fafb',
 },
 header: { 
   paddding: 16, 
   paddingTop: 24,
   backgroundColor: '#1e40af',
   borderBottomWidth: 1,
   borderBottomColor: '#d1d5db'
 },
 title: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#111827',
  marginBottom: 8,
 },
subtitle: {
  fontSize: 16,
  color: '#374151'
},
});