import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as CourseData from '../data/coursesData';

export default function CourseScreen({ route }) {
  console.log('=== CourseScreen Loaded ===');
  console.log('CourseData module:', CourseData);
  
  const { title } = route.params;
  console.log('Title from params:', title);
  

  const coursesData = CourseData.coursesData;
  console.log('coursesData:', coursesData);
  
  if (!coursesData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Course data failed to load</Text>
      </View>
    );
  }
  
  console.log('coursesData keys:', Object.keys(coursesData));
  
  const course = coursesData[title];
  console.log('Found course:', course);
  
  const [currentSection, setCurrentSection] = useState(0);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Course not found: {title}</Text>
      </View>
    );
  }

  const section = course.sections[currentSection];
  const isLastSection = currentSection === course.sections.length - 1;
  
  const handleNext = () => {
    if (currentSection < course.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Navigate to quiz - to be implemented
      alert('Quiz feature coming soon!');
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.sectionNumber}>
            Section {currentSection + 1} of {course.sections.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentSection + 1) / course.sections.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.text}>{section.content}</Text>
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentSection === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentSection === 0}
        >
          <Text style={[styles.navButtonText, currentSection === 0 && styles.navButtonTextDisabled]}>
            ← Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtonPrimary}
          onPress={handleNext}
        >
          <Text style={styles.navButtonTextPrimary}>
            {isLastSection ? 'Take Quiz →' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1f2937',
    padding: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#2563eb',
  },
  sectionNumber: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 26,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 50,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1f2937',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  navButtonDisabled: {
    backgroundColor: '#1f2937',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  navButtonTextDisabled: {
    color: '#6b7280',
  },
  navButtonPrimary: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  navButtonTextPrimary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});