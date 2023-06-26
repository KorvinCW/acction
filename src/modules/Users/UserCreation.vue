<template>
    <div class="backBtn">
        <router-link to="/">
            <button>Users page</button>
        </router-link>
    </div>
    <form @submit.prevent="createNewUser">
        <label for="name">Name: </label>
        <input id="name" type="text" v-model="name" required><br/>

        <label for="email">Email: </label>
        <input id="email" type="email" v-model="email" required><br/>

        <AdminBlock @get-head-user="getHeadUser"/>

        <button type="submit" class="submitBtn">Add user</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '../../stores/UsersStore';

import AdminBlock from './AdminBlock.vue';

const router = useRouter();
const usersStore = useUsersStore();

const name = ref('');
const email = ref('');
const headUserEmail = ref(null);

const createNewUser = () => {
    usersStore.createUser({
        name :name.value,
        email: email.value,
        head: headUserEmail.value
    });
    console.log(headUserEmail.value)
    navigateToPosts();
}

const getHeadUser = (user) => {
    headUserEmail.value = user
}

const navigateToPosts = () => router.push('/')

</script>

<style scoped>
.submitBtn {
    margin-top: 40px;
}

.backBtn {
    margin-bottom: 40px;
}
</style>