import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import TaskItem from "./components/TaskItem";
import TaskService from "./services/TaskService";

export default function App() {
  const [currentTask, setCurrentTask] = useState("");
  const [tasks, setTasks] = useState({});
  const [isModalVisible, setisModalVisible] = useState(false);

  const TaskInputHandler = (task) => {
    setCurrentTask(task);
  };

  const onToggle = () => {
    setisModalVisible(true);
  };

  // GET Tasks
  useEffect(() => {
    TaskService.getAllTasks().then((tasks) => setTasks(tasks.data));
  }, []);

  // POST Task
  const addTaskHandler = () => {
    let currentDate = new Date().toISOString().slice(0, 10);
    TaskService.create(currentTask, String(currentDate));

    const dataObj = {
      taskName: currentTask,
      createdDate: currentDate,
    };

    TaskService.getAllTasks().then((tasks) => setTasks(tasks.data));

    TODO: "update state ";
    // setTasks((currentTasks) => [...currentTasks, dataObj]);
  };

  // EDIT Task
  const editTextHandler = (taskId, dataTaskName) => {
    const dataObj = {
      taskName: dataTaskName,
    };

    TaskService.editTask(Number(taskId), dataObj);

    TODO: "update state ";
    TaskService.getAllTasks().then((tasks) => setTasks(tasks.data));

    setisModalVisible(false);
  };

  // DELETE TASK
  const delteTaskHandler = (taskId) => {
    TaskService.deleteTask(taskId);

    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== taskId);
    });
  };

  return (
    <View style={styles.AppContainer}>
      <View style={styles.Background}>
        <LinearGradient
          style={styles.LinearGradientColor}
          colors={["#fbc2eb", "#a6c1ee", "#97d9e1"]}
        />
      </View>
      <Text style={styles.title}>Task Manager</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Task"
          onChangeText={TaskInputHandler}
        />
        <View style={styles.ContainerAddBtn}>
          <Pressable onPress={addTaskHandler}>
            <Text style={styles.AddBtnText}>Add</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.tasksContainer}>
        {(tasks != undefined) & (tasks.length > 0) ? (
          <FlatList
            data={tasks}
            alwaysBounceVertical={false}
            renderItem={(itemData) => {
              return (
                <SafeAreaView>
                  <TaskItem
                    taskName={itemData.item.taskName}
                    createdDate={itemData.item.createdDate}
                    keyId={itemData.item.id}
                    onDeleteItem={delteTaskHandler}
                    onEditItem={editTextHandler}
                    isModalVisible={isModalVisible}
                    onToggle={onToggle}
                  />
                </SafeAreaView>
              );
            }}
          />
        ) : (
          <Text style={styles.EmptyList}>No Tasks</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    fontSize: "35",
    fontWeight: "900",
    marginTop: -110,
    paddingBottom: 10,
    color: "white",
  },
  LinearGradientColor: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 300,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    shadowColor: "#cccccc",
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  Background: {
    // backgroundColor: "purple",
    flex: 1,
    flexDirection: "row",
    paddingBottom: 200,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#cccccc",
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    marginBottom: 30,
  },
  textInput: {
    borderWidth: 1,
    width: "70%",
    marginRight: 8,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
  },
  ContainerAddBtn: {
    backgroundColor: "#97d9e1",
    color: "white",
    padding: 10,
    width: 80,
    marginLeft: 5,
    color: "white",
    borderRadius: 10,
    textAlign: "center",
  },
  AddBtnText: {
    textAlign: "center",
    color: "black",
  },
  tasksContainer: {
    flex: 5,
  },
  EmptyList: {
    textAlign: "center",
    fontSize: "17",
    fontWeight: "800",
    color: "grey",
  },
});
