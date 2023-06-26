<template>
    <table>
        <thead>
            <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Head Email</th>
                <th v-if="isUsersPage">Views</th>
                <th v-if="!isUsersPage">Department</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in usersList" :key="user.id" @click="sendUserId(user.id)">
                <td><img :src="user.avatar" alt="Avatar"/></td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.headEmail }}</td>
                <td v-if="isUsersPage">
                    <router-link :to="`/user-info/${user.id}`">
                        <button>View User</button>
                    </router-link>
                </td>
                <td v-if="!isUsersPage"> {{ user.department }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { defineProps } from 'vue';

const emit = defineEmits(['click']);

const props = defineProps({
    isUsersPage: {
        type: Boolean,
        required: true,
        default: false,
    },
    usersList: {
        type: Object,
        required: true,
    }
})

const sendUserId = (userId) => {
    emit('find-user', userId);
}

</script>