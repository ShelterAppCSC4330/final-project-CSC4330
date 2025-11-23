import React, { useEffect, useRef, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Animated} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import useUsername from '../hooks/useUsername';

function ProgressBar({ value = 0, height = 10, showLabel = true }) {
  const barRange = Math.max(0, Math.min(1, value));
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: barRange,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [barRange]);

  const barWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const pct = Math.round(barRange * 100);

  return (
    <View style={{ marginBottom: 6 }}>
      {showLabel && <Text style={styles.progressLabel}>{pct}% complete</Text>}
      <View style={[styles.progressTrack, { height }]}>
        <Animated.View style={[styles.progressFill, { width: barWidth }]} />
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { username, setUsername } = useUsername('username');
  const [items, setItems] = useState([
    { id: '1', title: 'Put together a go bag', done: false },
    { id: '2', title: 'Find nearby shelters with refuge', done: false},
    { id: '3', title: 'Create a family prepardness plan', done: false },
    { id: '4', title: 'Know your areas emergency risks', done: false },
    { id: '5', title: 'Complete Refuge prepardness courses', done: false },
  ]);

  const completed = items.filter(i => i.done).length;
  const total = items.length;
  const progress = total ? completed / total : 0;

  const [newText, setNewText] = useState('');

  const addItem = () => {
    const title = newText.trim();
    if (!title) return;
    setItems(prev => [{ id: String(Date.now()), title, done: false }, ...prev]);
    setNewText('');
  };

  const toggleItem = (id) =>
    setItems(prev =>
      prev.map(it => (it.id === id ? { ...it, done: !it.done } : it))
    );

  const deleteItem = (id) =>
    setItems(prev => prev.filter(it => it.id !== id));

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={64} color="#76A9FF" />
          <View style={styles.namePill}>
            <Text style={styles.nameText}>{username}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.rule} />

        {/* Achievements */}
        <View style={styles.achievementRow}>
          <TouchableOpacity style={styles.achievementButton}><Feather name="plus" size={22} color="#fff" /></TouchableOpacity>
          <TouchableOpacity style={styles.achievementButton}><Ionicons name="timer-outline" size={22} color="#fff" /></TouchableOpacity>
          <TouchableOpacity style={styles.achievementButton}><Ionicons name="chatbubble-ellipses-outline" size={22} color="#fff" /></TouchableOpacity>
          <TouchableOpacity style={styles.achievementButton}><Ionicons name="car-outline" size={22} color="#fff" /></TouchableOpacity>
        </View>

        {/* Checklist */}
        <View style={styles.checklistHeader}>
          <View style={styles.tag}><Text style={styles.tagText}>Your Checklist</Text></View>
          <TouchableOpacity onPress={() => setUsername('Refuge User')}>
            <Feather name="edit-2" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <ProgressBar value={progress} />

        <Text style={styles.completedText}>
          {completed}/{total} items completed
        </Text>

        {/* Add item */}
        <View style={styles.addRow}>
          <TextInput
            style={styles.addInput}
            placeholder="Add a new item"
            placeholderTextColor="#A9C9FF"
            value={newText}
            onChangeText={setNewText}
            returnKeyType="done"
            onSubmitEditing={addItem}
          />
          <TouchableOpacity
            style={[styles.addBtn, !newText.trim() && { opacity: 0.5 }]}
            onPress={addItem}
            disabled={!newText.trim()}
          >
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Checklist list */}
        <View style={styles.card}>
          <FlatList
            data={items}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    item.done && styles.checkboxChecked,
                  ]}
                  onPress={() => toggleItem(item.id)}
                >
                  {item.done && <Feather name="check" size={18} color="#fff" />}
                </TouchableOpacity>

                <Text
                  style={[styles.itemText, item.done && styles.itemTextDone]}
                >
                  {item.title}
                </Text>

                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Feather name="trash-2" size={18} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#1E1E1E' },
  container: { flex: 1, padding: 16 },

  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  namePill: {
    backgroundColor: '#2979FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14
  },
  nameText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  sectionTitle: { marginTop: 12, fontSize: 20, fontWeight: '700', color: '#fff' },
  rule: { height: 3, backgroundColor: '#2979FF', marginVertical: 10, borderRadius: 2 },

  achievementRow: { flexDirection: 'row', gap: 18, marginBottom: 20 },
  achievementButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#2A2A2A",
    borderWidth: 2,
    borderColor: "#2979FF",
    alignItems: 'center',
    justifyContent: 'center',
  },

  checklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  tag: {
    backgroundColor: "#2979FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14
  },
  tagText: { color: '#fff', fontWeight: '800' },

  completedText: { marginBottom: 10, fontSize: 12, color: '#A9A9A9' },

  addRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  addInput: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#80C1FF',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(41,121,255,0.15)',
    color: '#fff',
  },
  addBtn: {
    marginLeft: 10,
    backgroundColor: '#2979FF',
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    backgroundColor: 'rgba(41,121,255,0.1)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: '#2979FF',
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2979FF',
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2979FF',
    borderColor: '#A3CCFF',
  },

  itemText: { color: '#fff', fontSize: 16, flex: 1 },
  itemTextDone: { textDecorationLine: 'line-through', color: '#A9C9FF' },

  progressLabel: { marginBottom: 4, fontSize: 12, color: '#fff' },
  progressTrack: { backgroundColor: '#444', borderRadius: 999, overflow: 'hidden' },
  progressFill: { backgroundColor: '#2979FF', height: '100%', borderRadius: 999 },
});
