<template>
  <q-page class="q-pa-md">
    <span class="text-h2">Tareas</span>
    <p>Nueva Grupo:</p>
    <input v-model="newGroupDescription" type="text" placeholder="Nuevo" />
    <button @click="postGroup">New</button>
    <br />
    <input
      v-model="updateGroupObject.id"
      type="number"
      placeholder="UpdateID"
    />
    <input
      v-model="updateGroupObject.description"
      type="text"
      placeholder="UpdateText"
    />
    <button @click="updateGroup">Update</button>
    <br />
    <input v-model="deleteGroupId" type="number" placeholder="DeleteID" />
    <button @click="deleteGroup">Delete</button>
    <br />
    <span>{{ settingsStore.tasksGroups }}</span>
    <br />
    <p>Nueva Tarea:</p>
    <input
      v-model="newTaskOb.description"
      type="text"
      placeholder="Nuevo tarea"
    />
    <input v-model="newTaskOb.price" type="number" placeholder="Nuevo precio" />
    <input v-model="newTaskOb.TaskGroupId" type="number" placeholder="Grupo" />
    <button @click="postTask">New</button>
    <br />
    <input v-model="updateTaskOb.id" type="number" placeholder="ID" />
    <input
      v-model="updateTaskOb.description"
      type="text"
      placeholder="Update tarea"
    />
    <input
      v-model="updateTaskOb.price"
      type="number"
      placeholder="Update precio"
    />
    <input
      v-model="updateTaskOb.TaskGroupId"
      type="number"
      placeholder="Update Grupo"
    />
    <button @click="updateTask">UP</button>
    <br />
    <input v-model="deleteTaskId" type="number" placeholder="DeleteID Task" />
    <button @click="deleteTask">Delete</button>
    <br />
    <span>{{ settingsStore.tasks }}</span>
  </q-page>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useSettingsStore } from "src/stores/settings-store";

export default {
  setup() {
    const settingsStore = useSettingsStore();
    /** GROUPS */
    //Read Groups
    settingsStore.getTasksGroups();
    //Add group
    const newGroupDescription = ref("");
    async function postGroup() {
      await settingsStore.postTaskGroup({
        description: newGroupDescription.value,
      });
      newGroupDescription.value = "";
    }
    //Update group
    const updateGroupObject = ref({
      id: 1,
      description: "",
    });
    async function updateGroup() {
      await settingsStore.putTaskGroup(updateGroupObject.value);
      updateGroupObject.value.description = "";
      updateGroupObject.value.id = 0;
    }
    //Delete group
    const deleteGroupId = ref(0);
    async function deleteGroup() {
      await settingsStore.deleteTaskGroup(deleteGroupId.value);
    }

    /** TASKS */
    settingsStore.getTasks();
    //Add task
    const newTaskOb = ref({
      description: "",
      price: null,
      TaskGroupId: null,
    });
    async function postTask() {
      await settingsStore.postTask(newTaskOb.value);
      newTaskOb.value.description = "";
      newTaskOb.value.price = null;
      newTaskOb.value.TaskGroupId = null;
    }
    //Update task
    const updateTaskOb = ref({
      id: null,
      description: "",
      price: null,
      TaskGroupId: null,
    });
    async function updateTask() {
      await settingsStore.putTask(updateTaskOb.value);
      updateTaskOb.value.id = null;
      updateTaskOb.value.description = "";
      updateTaskOb.value.price = null;
      updateTaskOb.value.TaskGroupId = null;
    }
    //Delete task
    const deleteTaskId = ref(0);
    async function deleteTask() {
      await settingsStore.deleteTask(deleteTaskId.value);
    }
    return {
      deleteTask,
      deleteTaskId,
      updateTask,
      updateTaskOb,
      postTask,
      newTaskOb,
      settingsStore,
      newGroupDescription,
      postGroup,
      updateGroup,
      updateGroupObject,
      deleteGroupId,
      deleteGroup,
    };
  },
};
</script>
