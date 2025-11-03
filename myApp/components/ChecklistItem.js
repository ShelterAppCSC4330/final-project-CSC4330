import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChecklistItem({ item, onToggle, onDelete }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.circle}><Text style={styles.circleText}>A</Text></View>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      <View style={styles.right}>
        {!!onDelete && (
          <TouchableOpacity onPress={() => onDelete(item.id)} style={{ marginRight: 12 }}>
            <Ionicons name="trash-outline" size={20} color="#8b8b98"/>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onToggle(item.id)}>
          {item.done
            ? <Ionicons name="checkbox-outline" size={22} color="#6A49F2"/>
            : <Ionicons name="square-outline" size={22} color="#8b8b98"/>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  right: { flexDirection: 'row', alignItems: 'center' },
  circle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E9E3FF', justifyContent: 'center', alignItems: 'center' },
  circleText: { color: '#6A49F2', fontWeight: '800' },
  title: { fontSize: 16, color: '#111827' },
});
