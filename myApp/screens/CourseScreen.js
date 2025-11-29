import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image} from 'react-native';
import * as CourseData from '../data/coursesData';

export default function CourseScreen({ route,navigation }) {
  
  const { title } = route.params;
  const coursesData = CourseData.coursesData;
  
  if (!coursesData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Course data failed to load</Text>
      </View>
    );
  }
  
  const course = coursesData[title];
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
      // Navigate to quiz 
      navigation.navigate('Quiz', { quiz: course.quiz , courseId: title});
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

          {/* Render bullet list if present */}
          {section.list && (
            <View style={styles.listContainer}>
              {section.list.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>{'\u2022'}</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Render image if present */}
          {section.image && (
            <Image
              source={section.image}
              style={styles.sectionImage}
              resizeMode="cover"
            />
          )}
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

  sectionImage: {
  width: '100%',
  height: 200,
  borderRadius: 10,
  marginTop: 16,
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
  listContainer: {
  marginTop: 12,
  paddingLeft: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    color: '#4da6ff',
    fontSize: 18,
    lineHeight: 22,
    marginRight: 8,
  },
  listText: {
    color: '#d1d5db',
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },

});