<template>
    <Page>
        <ActionBar title="My Tasks">
            <ActionItem @tap="showAddTask" ios.position="right" android.position="right" text="Add" />
        </ActionBar>

        <GridLayout rows="auto, *">
            <ListView row="1" ref="taskList" :items="tasksArray">
                <v-template>
                    <GridLayout columns="*, auto, auto" class="task-item p-2">
                        <StackLayout col="0">
                            <Label :text="item.title" class="font-weight-bold" />
                            <Label :text="item.description" textWrap="true" />
                            <Label :text="formatDate(item.due_date)" class="text-muted" />
                        </StackLayout>
                        <Button col="1" text="Update" @tap="() => showUpdateTaskModal(item)" class="btn btn-warning" />
                        <Button col="2" text="Delete" @tap="() => deleteTask(item.id)" class="btn btn-danger" />
                    </GridLayout>
                </v-template>
            </ListView>
        </GridLayout>

        <!-- Add Task Modal -->
        <StackLayout v-if="showModal" class="modal p-4">
            <TextField v-model="newTask.title" hint="Task Title" class="input m-b-10" />
            <TextView v-model="newTask.description" hint="Description" class="input m-b-10" />
            <DatePicker v-model="newTask.due_date" class="m-b-10" />
            <Button text="Save Task" @tap="createTask" class="btn btn-primary m-b-10" />
            <Button text="Cancel" @tap="cancelAddTask" class="btn btn-outline" />
        </StackLayout>

        <!-- Update Task Modal -->
        <StackLayout v-if="showUpdateModal" class="modal p-4">
            <TextField v-model="newTask.title" hint="Task Title" class="input m-b-10" />
            <TextView v-model="newTask.description" hint="Description" class="input m-b-10" />
            <DatePicker v-model="newTask.due_date" class="m-b-10" />
            <Button text="Update Task" @tap="updateTask" class="btn btn-warning m-b-10" />
            <Button text="Cancel" @tap="cancelUpdateTask" class="btn btn-outline" />
        </StackLayout>
    </Page>
</template>

<script>
import api from '../services/api';
import { alert } from '@nativescript/core';
import { ObservableArray } from '@nativescript/core';

export default {
    data() {
        return {
            tasksArray: new ObservableArray([]),
            showModal: false,
            showUpdateModal: false,
            newTask: {
                id: null,
                title: '',
                description: '',
                due_date: new Date()
            }
        }
    },
    created() {
        console.log('Component created - loading tasks');
        this.loadTasks();
    },
    methods: {
        async loadTasks() {
            try {
                const response = await api.getTasks();
                this.tasksArray.splice(0);
                if (Array.isArray(response)) {
                    response.forEach(task => {
                        this.tasksArray.push(task);
                    });
                }
            } catch (error) {
                alert({
                    title: 'Error',
                    message: 'Failed to load tasks. Please try again.',
                    okButtonText: 'OK'
                });
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
        showAddTask() {
            this.newTask = {
                id: null,
                title: '',
                description: '',
                due_date: new Date()
            };
            this.showModal = true;
        },
        cancelAddTask() {
            this.showModal = false;
            this.newTask = {
                id: null,
                title: '',
                description: '',
                due_date: new Date()
            };
        },
        async createTask() {
            if (!this.newTask.title.trim()) {
                alert({
                    title: 'Validation Error',
                    message: 'Please enter a task title',
                    okButtonText: 'OK'
                });
                return;
            }

            try {
                const response = await api.createTask(this.newTask);
                this.showModal = false;
                this.$navigateTo(require('./Tasks').default);  // Refresh the task list
                this.newTask = {
                    id: null,
                    title: '',
                    description: '',
                    due_date: new Date()
                };
            } catch (error) {
                alert({
                    title: 'Error',
                    message: 'Failed to create task. Please try again.',
                    okButtonText: 'OK'
                });
            }
        },
        async deleteTask(id) {
            try {
                await api.deleteTask(id);
                await this.$navigateTo(require('./Tasks').default);  // Refresh the task list after deletion
            } catch (error) {
                alert({
                    title: 'Error',
                    message: 'Failed to delete task. Please try again.',
                    okButtonText: 'OK'
                });
            }
        },
        // Show the update modal with the selected task data
        showUpdateTaskModal(task) {
            this.newTask = { ...task };
            this.showUpdateModal = true;
        },
        cancelUpdateTask() {
            this.showUpdateModal = false;
            this.newTask = {
                id: null,
                title: '',
                description: '',
                due_date: new Date()
            };
        },
async updateTask() {
    if (!this.newTask.title.trim()) {
        alert({
            title: 'Validation Error',
            message: 'Please enter a task title',
            okButtonText: 'OK'
        });
        return;
    }

    try {
        const response = await api.updateTask(this.newTask.id, {
            title: this.newTask.title,
            description: this.newTask.description,
            status: this.newTask.status || 'pending',
            due_date: this.newTask.due_date
        });

        // If we get here, the update was successful (no error was thrown)
        this.showUpdateModal = false;

        // Reset newTask data
        this.newTask = {
            id: null,
            title: '',
            description: '',
            due_date: new Date()
        };

        // Show success message
        alert({
            title: 'Success',
            message: 'Task updated successfully',
            okButtonText: 'OK'
        });

        // Navigate to refresh the tasks page
        await this.$navigateTo(require('./Tasks').default);

    } catch (error) {
        console.error('Update error:', error);
        alert({
            title: 'Error',
            message: 'Failed to update task. Please try again.',
            okButtonText: 'OK'
        });
    }
}

    }
}
</script>

<style scoped>
.task-item {
    border-bottom-width: 1;
    border-bottom-color: #ddd;
}
.modal {
    background-color: white;
    border-radius: 8;
    margin: 20;
}
</style>
