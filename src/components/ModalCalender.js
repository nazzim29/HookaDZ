import React from "react";
import { Modal, View, Pressable, Text } from "react-native";
import { Calendar } from "react-native-calendars";

const ModalCalender = ({ open, close, value, handleDateClick }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        close();
      }}>
      <Pressable
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
        onPress={() => {
          close();
          console.log("tes");
        }}>
        <View
          style={{
            display: "flex",
            width: "100%",
            height: "70%",
            backgroundColor: "#001414",
            borderRadius: 10,
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            height: 341,
            width: 341,
          }}>
          <Calendar
            onDayPress={handleDateClick}
            // firstDay={1}
            markedDates={{
              [value]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "#F1EFFE",
                selectedTextColor: "#7954FA",
              },
            }}
            current={value}
            style={{
              width: "90%",
              marginVertical: "5%",
              marginHorizontal: "5%",
            }}
            theme={{
              backgroundColor: "#0D1117",
              calendarBackground: "#0D1117",
              textSectionTitleColor: "#b6c1cd",
              textSectionTitleDisabledColor: "#d9e1e8",
              selectedDayBackgroundColor: "#3299F1",
              selectedDayTextColor: "#0D1117",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#00adf5",
              selectedDotColor: "#0D1117",
              arrowColor: "orange",
              disabledArrowColor: "#d9e1e8",
              monthTextColor: "blue",
              indicatorColor: "blue",
              textDayFontFamily: "Inter-Regular",
              textMonthFontFamily: "Inter-Bold",
              textDayHeaderFontFamily: "Inter-Regular",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            backgroundColor: "#001414",
            width: 341,
          }}>
          <Pressable
            onPress={(e) => {
              close();
            }}>
            {({ pressed }) => (
              <Text
                style={{
                  color: pressed ? "#0002ea" : "white",
                  marginHorizontal: 20,
                  marginTop: 5,
                }}>
                OK
              </Text>
            )}
          </Pressable>
          <Pressable
            onPress={(e) => {
              close();
            }}>
            {({ pressed }) => (
              <Text
                style={{
                  color: pressed ? "red" : "white",
                  marginHorizontal: 20,
                  marginTop: 5,
                }}>
                Annuler
              </Text>
            )}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalCalender;
