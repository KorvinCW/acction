<template>
    <div>
        <router-link to="/user-creation">
            <button>Create New User</button>
        </router-link>
        <UsersTable 
            :isUsersPage="true"
            :usersList="usersStore.users"
        />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUsersStore } from '../../stores/UsersStore';

import UsersTable from './UsersTable.vue';

const usersStore = useUsersStore();

onMounted(() => {
    usersStore.fetchUsers();
});

</script>

<style scoped>
</style>