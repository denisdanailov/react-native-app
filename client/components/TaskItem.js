import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";

function TaskItem(props) {
  const [inputText, setInputText] = useState("");

  const onChangeText = (text) => {
    setInputText(text);
  };

  return (
    <View key={props.keyId} style={styles.TaskItem}>
      <Text style={styles.TaskText}>{props.taskName}</Text>
      <Text style={styles.TaskDate}> {props.createdDate}</Text>
      <View style={styles.ButtonsContainer}>
        <Pressable
          style={styles.DeleteBtn}
          onPress={props.onDeleteItem.bind(this, props.keyId)}
        >
          <Text>Delete</Text>
        </Pressable>
        <Pressable style={styles.EditBtn} onPress={props.onToggle}>
          <Text>Edit</Text>
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        visible={props.isModalVisible}
        onRequestClose={() => setisModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.editText}>Change Text: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Add Task"
            onChangeText={(text) => setInputText(text)}
            defaultValue={props.taskName}
          />
          <TouchableOpacity
            style={styles.touchableSave}
            onPress={props.onEditItem.bind(this, props.keyId, inputText)}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  TaskItem: {
    margin: 8,
    borderRadius: 25,
    backgroundColor: "white",
    textAlignVertical: "center",
    shadowColor: "#cccccc",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    marginLeft: 20,
    marginRight: 20,
  },
  TaskText: {
    fontSize: 22,
    padding: 15,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
  TaskDate: {
    fontSize: 12,
    textAlign: "left",
    padding: 10,
    fontWeight: "500",
  },
  ButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  editText: {
    fontSize: 22,
    padding: 15,
  },
  touchableSave: {
    backgroundColor: "#97d9e1",
    paddingHorizontal: 141,
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    width: "73%",
    height: 45,
    marginRight: 8,
    padding: 8,
    borderRadius: 10,
    borderColor: "black",
  },
  DeleteBtn: {
    backgroundColor: "#F26D85",
    padding: 10,
    borderRadius: 10,
  },
  EditBtn: {
    backgroundColor: "#97d9e1",
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
});
