import React from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

const CustomModal = ({ reminder, onConfirm, onCancel }) => {
  return (
    <Modal transparent={true} visible={!!reminder}>
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Alarme: {reminder?.text}</Text>
          <Text style={styles.modalText}>Horário: {reminder?.time}</Text>
          <Text style={styles.modalText}>Já finalizou o item desse lembrete?</Text>
          <View style={styles.modalButtons}>
            <Button title="Sim" onPress={onConfirm} />
            <Button title="Não" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: 300,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  modalText: {
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CustomModal;