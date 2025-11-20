import React from 'react';
import {View, Text, Modal, TouchableOpacity, Pressable,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DropdownMenu({ navigation }) {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  const go = (screen) => {
    close();
    navigation.navigate(screen);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{ paddingHorizontal: 8 }}
      >
        <Ionicons name="menu" size={30} color = "#2563eb" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={styles.backdrop} onPress={close}>
          <View />
        </Pressable>

        <View style={styles.panelWrap} pointerEvents="box-none">
          <View style={styles.panel}>
            <TouchableOpacity style={styles.item} onPress={() => go('Account')}>
              <Ionicons name="person-circle-outline" size={25} style={styles.itemIcon} />
              <Text style={styles.itemText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => go('Info')}>
              <Ionicons name="information-circle-outline" size={25} style={styles.itemIcon} />
              <Text style={styles.itemText}>Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => go('Profile')}>
              <Ionicons name="body-sharp" size={25} style={styles.itemIcon} />
              <Text style={styles.itemText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.23)',
  },
  panelWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 8,
  },
  panel: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    minWidth: 150,
    shadowColor: '#000',
    shadowOpacity: 0.30,
    shadowRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    elevation: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  itemIcon: { marginRight: 10 },
  itemText: { fontSize: 20, fontWeight: '700' },
});
