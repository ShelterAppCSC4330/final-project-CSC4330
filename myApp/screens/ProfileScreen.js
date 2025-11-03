import React, { useEffect, useRef, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Animated} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import ChecklistItem from '../components/ChecklistItem';
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
        <Animated.View style={[styles.progressFill, { width: barWidth }]}/>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { username, setUsername } = useUsername('username'); //just a default name for now
  const [items, setItems] = useState([
    //placeholder items
    { id: '1', title: 'List item', done: true },
    { id: '2', title: 'List item', done: true },
  ]);
  const completed = items.filter(i => i.done).length;
  const total = items.length;
  const progress = total ? completed / total : 0;
  const [newText, setNewText] = useState('');

  const addItem = () => {
    const title = newText.trim();
    if (!title) return;
    setItems((prev) => [{ id: String(Date.now()), title, done: false }, ...prev]);
    setNewText('');
  };

  const toggleItem = (id) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));

  const deleteItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const renderItem = ({ item }) => (
    <ChecklistItem item={item} onToggle={toggleItem} onDelete={deleteItem} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={64} color="#1f2937" />
          <View style={styles.namePill}>
            <Text style={styles.nameText}>{username}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.rule} />
        <View style={styles.achievementRow}>
          <TouchableOpacity style={styles.achievementButton}><Feather name="plus" size={22}/></TouchableOpacity>
          <TouchableOpacity style={styles.achievementButton}><Ionicons name="timer-outline" size={22}/></TouchableOpacity>
          <TouchableOpacity style={styles.achievementButton}><Ionicons name="chatbubble-ellipses-outline" size={22}/></TouchableOpacity>
          <TouchableOpacity style={styles.achievementButton}><Ionicons name="car-outline" size={22}/></TouchableOpacity>
        </View>
        
        <View style={styles.checklistHeader}>
          <View style={styles.tag}><Text style={styles.tagText}>Your Checklist</Text></View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity onPress={() => setUsername('Refuge User')}>
              <Feather name="edit-2" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        <ProgressBar value={progress} />
        <Text style={{ marginBottom: 8, fontSize: 12, color:'#374152' }}>
          {completed}/{total || 0} items completed
        </Text>

        <View style={styles.addRow}>
          <TextInput
            style={styles.addInput}
            placeholder="Add a new item"
            value={newText}
            onChangeText={setNewText}
            returnKeyType="done"
            onSubmitEditing={addItem}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addItem} disabled={!newText.trim()}>
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <FlatList
            data={items}
            keyExtractor={(it) => it.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            contentContainerStyle={{ paddingVertical: 6 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#c1c7d2ff' },
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  namePill: { backgroundColor: '#1f2937', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 14 },
  nameText: { color: 'white', fontWeight: '800', fontSize: 16 },

  sectionTitle: { marginTop: 12, fontSize: 18, fontWeight: '700', color: '#111827' },
  rule: { height: 3, backgroundColor: '#111827', marginTop: 6, marginBottom: 14, borderRadius: 2, width: '100%' },

  achievementRow: { flexDirection: 'row', alignItems: 'center', gap: 22, marginBottom: 14 },
  achievementButton: {width: 40, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.35)', justifyContent: 'center', 
    alignItems: 'center'
  },

  checklistHeader: { marginTop: 6, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tag: { backgroundColor: '#1f2937', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14 },
  tagText: { color: 'white', fontWeight: '800' },

  addRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  addInput: { flex: 1, height: 44, borderRadius: 10, borderWidth: 1, borderColor: '#cfd8e3',
    paddingHorizontal: 12, backgroundColor: '#f9fbff',
  },
  addBtn: { marginLeft: 10, backgroundColor: '#1f2937', borderRadius: 10,
    width: 44, height: 44, alignItems: 'center', justifyContent: 'center',
  },

  card: { backgroundColor: '#F6F0FF', borderRadius: 18, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, elevation: 3,
  },
  progressLabel: { marginBottom: 6,  fontSize: 12, fontWeight: '700', color: '#111827'},
  progressTrack: { backgroundColor: '#E5E7EB', borderRadius: 999, overflow: 'hidden'},
  progressFill: { height: '100%', backgroundColor: '#7eaff4f9',borderRadius: 999 }

});

