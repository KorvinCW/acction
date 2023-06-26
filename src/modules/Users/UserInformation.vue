<template>
    <div>
        <router-link to="/">
            <button>Users page</button>
        </router-link>
        <UsersTable 
            :isUsersPage="false"
            :usersList="usersStore.currentUser"
        />
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';
import { useUsersStore } from '../../stores/UsersStore';

import UsersTable from './UsersTable.vue';

const route = useRoute();
const usersStore = useUsersStore();

const userId = route.params.id;

onMounted(() => {
    usersStore.fetchSelectedUser(userId);
});

onUnmounted(() => {
    usersStore.removeCurrentUser()
});

</script>

<style scoped>
</style>