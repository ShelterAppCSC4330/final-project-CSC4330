import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function CourseButton({ title }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📚</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.description}>Tap to start learning</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Start Course →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f2937',  // Dark grey
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 120,  // Larger button
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',  // Blue accent
  },
  iconContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#374151',  // Medium grey
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 36,
  },
  content: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',  // White text
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',  // Light grey
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#2563eb',  // Blue
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CourseButton;