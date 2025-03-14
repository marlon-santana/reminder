import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ReminderForm = ({ addReminder }) => {
  const [text, setText] = useState(""); // Estado para o texto do lembrete
  const [time, setTime] = useState(new Date()); // Estado para o horário
  const [showTimePicker, setShowTimePicker] = useState(false); // Estado para controlar a exibição do seletor

  // Função para lidar com a seleção de horário
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false); // Esconde o seletor após a seleção
    if (selectedTime) {
      setTime(selectedTime); // Atualiza o estado do horário
    }
  };

  // Função para adicionar o lembrete
  const handleAddReminder = () => {
    const formattedTime = time.toTimeString().split(" ")[0].substring(0, 5); // Formata o horário como "HH:MM"
    addReminder({ text, time: formattedTime }); // Adiciona o lembrete
    setText(""); // Limpa o campo de texto
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Descrição do lembrete:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o lembrete"
        value={text}
        onChangeText={setText}
      />

      <Text style={styles.label}>Horário:</Text>
      <Button
        title={`Selecionar horário: ${time.toTimeString().split(" ")[0].substring(0, 5)}`}
        onPress={() => setShowTimePicker(true)}
      />

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Button title="Adicionar lembrete" onPress={handleAddReminder} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ReminderForm;