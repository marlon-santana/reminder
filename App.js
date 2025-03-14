import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, FlatList, StyleSheet, Vibration } from "react-native";
import ReminderForm from "./components/ReminderForm";
import CustomModal from "./components/Modal";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

// Configura o comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  const [reminders, setReminders] = useState([]);
  const [activeReminder, setActiveReminder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sound, setSound] = useState(null);
  const notificationListener = useRef(); // Listener para notificações recebidas
  const responseListener = useRef(); // Listener para respostas a notificações

  // Solicita permissão para notificações ao iniciar o app
  useEffect(() => {
    const setupNotifications = async () => {
      // Configura o canal de notificação (necessário para Android)
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('reminders', {
          name: 'Lembretes',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          sound: true,
        });
      }
  
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para notificações não concedida!');
      }
    };
  
    setupNotifications();

    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para notificações não concedida!");
      }
    };

    requestNotificationPermission();

    // Configura o listener para notificações recebidas
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      // Aqui você pode lidar com notificações recebidas enquanto o app está em primeiro plano
      console.log("Notificação recebida:", notification);
    });

    // Configura o listener para respostas a notificações (quando o usuário toca na notificação)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      // Reproduz o som do alarme quando o usuário abre o app a partir da notificação
      playAlarmSound();
      setShowModal(true); // Exibe o modal de confirmação
    });

    // Limpa os listeners ao desmontar o componente
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Função para agendar uma notificação com som personalizado
  const scheduleNotification = async (title, body, time) => {
    try {
      const futureTime = new Date(time);
      // Verifica se o horário já passou
      if (futureTime <= new Date()) {
        futureTime.setDate(futureTime.getDate() + 1); // Agenda para o próximo dia
      }
  
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true, // Habilita o som da notificação
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          date: futureTime,
          channelId: 'reminders', // ID do canal de notificação
        },
      });
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
    }
  };

  // Função para reproduzir o som do alarme
  const playAlarmSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/alarm.mp3"),
        { shouldPlay: true, isLooping: true }
      );
      setSound(sound);
      await sound.playAsync();
      Vibration.vibrate([500, 500, 500]);
    } catch (error) {
      console.error("Erro ao reproduzir o som do alarme:", error);
    }
  };

  // Função para parar o som do alarme
  const stopAlarmSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      Vibration.cancel();
    }
  };

  // Carrega lembretes do AsyncStorage ao iniciar o app
  useEffect(() => {
    const loadReminders = async () => {
      try {
        const savedReminders = await AsyncStorage.getItem("reminders");
        if (savedReminders !== null) {
          setReminders(JSON.parse(savedReminders));
        }
      } catch (error) {
        console.error("Erro ao carregar lembretes:", error);
      }
    };

    loadReminders();
  }, []);

  // Salva lembretes no AsyncStorage
  const saveRemindersToAsyncStorage = async (reminders) => {
    try {
      await AsyncStorage.setItem("reminders", JSON.stringify(reminders));
    } catch (error) {
      console.error("Erro ao salvar lembretes:", error);
    }
  };

  // Adiciona um lembrete e agenda uma notificação
  const addReminder = async (reminder) => {
  const newReminder = { ...reminder, lastTriggered: null };
  const newReminders = [...reminders, newReminder];
  setReminders(newReminders);
  await saveRemindersToAsyncStorage(newReminders);

  // Agenda uma notificação para o horário do lembrete
  const [hours, minutes] = reminder.time.split(':');
  const reminderTime = new Date();
  reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  // Se o horário já passou hoje, agenda para amanhã
  if (reminderTime <= new Date()) {
    reminderTime.setDate(reminderTime.getDate() + 1);
  }

  await scheduleNotification('Lembrete', reminder.text, reminderTime);
};

  // Remove um lembrete
  const removeReminder = (index) => {
    const newReminders = reminders.filter((_, i) => i !== index);
    setReminders(newReminders);
    saveRemindersToAsyncStorage(newReminders);
  };

  // Função para confirmar o lembrete
  const handleConfirm = async () => {
    await stopAlarmSound();
    setActiveReminder(null);
    setShowModal(false);
  };

  // Função para cancelar o lembrete
  const handleCancel = async () => {
    await stopAlarmSound();
    setShowModal(false);
  };

  // Verifica se é hora de disparar o alarme
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach((reminder, index) => {
        const [hours, minutes] = reminder.time.split(":");
        const reminderTime = new Date();
        reminderTime.setHours(hours, minutes, 0, 0);

        const lastTriggered = reminder.lastTriggered ? new Date(reminder.lastTriggered) : null;
        const isSameDay = lastTriggered && lastTriggered.toDateString() === now.toDateString();

        if (now >= reminderTime && !isSameDay) {
          setActiveReminder(reminder);
          setShowModal(true);
          playAlarmSound();

          // Atualiza a data do último disparo
          const updatedReminder = { ...reminder, lastTriggered: now.toISOString() };
          const updatedReminders = [...reminders];
          updatedReminders[index] = updatedReminder;
          setReminders(updatedReminders);
          saveRemindersToAsyncStorage(updatedReminders);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 16, marginTop: 20 }}>Lembretes Importantes</Text>
      <ReminderForm addReminder={addReminder} />
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item.text} - {item.time}</Text>
            <Button title="Remover" onPress={() => removeReminder(index)} />
          </View>
        )}
      />
      {showModal && (
        <CustomModal
          reminder={activeReminder}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default App;