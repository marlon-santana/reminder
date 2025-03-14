import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
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
  const handleSubmit = () => {
    if (!text.trim() || !time) return; // Valida se o texto e o horário foram preenchidos
    const formattedTime = time.toTimeString().split(" ")[0].substring(0, 5); // Formata o horário como "HH:MM"
    addReminder({ text, time: formattedTime }); // Adiciona o lembrete
    setText(""); // Limpa o campo de texto
    setTime(new Date()); // Reseta o horário para o valor padrão
  };

  return (
    <View style={styles.container}>
      {/* Campo de texto para o lembrete */}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Adicionar lembrete"
      />

      {/* Botão para abrir o seletor de horário */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.buttonText}>
          Selecionar horário: {time.toTimeString().split(" ")[0].substring(0, 5)}
        </Text>
      </TouchableOpacity>

      {/* Seletor de horário */}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {/* Botão para adicionar o lembrete */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF", // Cor de fundo do botão
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10, // Espaçamento entre os botões
  },
  buttonText: {
    color: "white", // Cor do texto do botão
    fontSize: 16,
  },
});

export default ReminderForm;