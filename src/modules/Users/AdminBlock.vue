<template>
    <div class="adminBlockWrapper">
        <span v-if="isHeadUserSelected">
            <img :src="headUser.avatar" alt="Avatar"/>
        </span>
        <button class="openMode" @click.prevent="openEditMode">
            +
        </button>
        <div class="openModeWrapper" v-if="isOpenMode">
            <div>
                <input v-model="searchItem" placeholder="Search..." />
                <button @click.prevent="exitEditMode">&#x2713;</button>
            </div>
            <div v-if="isUserSelectedFromList" @click.prevent="deleteSelectedUser">
                <img :src="selectedUserFromList.avatar" alt="Avatar"/>
            </div>
            <UsersTable 
                v-if="searchItem"
                :isUsersPage="false"
                :usersList="usersStore.suitableUsers"
                @find-user="findSelectedUser"
            />
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, defineExpose, watch, onBeforeUnmount } from 'vue';
import { useUsersStore } from '../../stores/UsersStore';

import UsersTable from './UsersTable.vue';

const usersStore = useUsersStore();
const emit = defineEmits(['get-head-user']);

const searchItem = ref('');
const isOpenMode = ref(false);
const searchTimeout = ref(null);
const isHeadUserSelected = ref(false);
const isUserSelectedFromList = ref(false);

const headUser = reactive({});
const selectedUserFromList = reactive({});

const openEditMode = () => {
    isOpenMode.value = true;
}

const delaySearch = () => {
    clearTimeout(searchTimeout.value);
    searchTimeout.value = setTimeout(() => {
        usersStore.searchSuitableUsers(searchItem.value)
    }, 1000);
};

const clearSelectedUser = () => {
    for (let key in selectedUserFromList) {
        delete selectedUserFromList[key];
    }

    isUserSelectedFromList.value = false;
};

const findSelectedUser = (userId) => {
    const foundUser = usersStore.suitableUsers.find(user => user.id === userId);
    
    !isUserSelectedFromList.value || addSuitableUserInList()

    Object.assign(selectedUserFromList, foundUser);

    isUserSelectedFromList.value = true;

    deleteSelectedUserFromList(foundUser.id);
};

const deleteSelectedUserFromList = (id) => {
    const index = usersStore.suitableUsers.findIndex(obj => obj.id === id);

    if (index !== -1) {
        usersStore.suitableUsers.splice(index, 1);
    }
}

const addSuitableUserInList = () => {
    const cloneSelectedUserFromList = Object.assign({}, selectedUserFromList)
    usersStore.suitableUsers.push(cloneSelectedUserFromList);
}

const deleteSelectedUser = () => {
    addSuitableUserInList();
    isUserSelectedFromList.value = false;
}

const isEmptyObject = () => {
    return Object.keys(selectedUserFromList).length === 0;
};

const addHeadUser = () => {
    Object.assign(headUser, selectedUserFromList)
}

const exitEditMode = () => {
    addHeadUser();
    searchItem.value = '';
    isHeadUserSelected.value = true;
    isOpenMode.value = false;
    clearSelectedUser();
    clearTimeout(searchTimeout.value);
    emit('get-head-user', headUser.id)
}

watch(searchItem, (newSearchItem) => {
    if (newSearchItem) {
        delaySearch();
        clearSelectedUser();
    } else {
        clearTimeout(searchTimeout.value);
    }
});

onBeforeUnmount(() => {
    exitEditMode();
    clearSelectedUser();
    usersStore.clearSuitableUsers();
});

defineExpose({ isEmptyObject });
</script>

<style scoped>
.adminBlockWrapper {
    margin: 20px 0;
}
.openMode {
    padding: 10px 15px;
    border-radius: 50%;
}

.openMode:hover {
    cursor: pointer;
}
</style>