import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useUsersStore = defineStore('usersStore', () => {
    const users = ref([]);
    const currentUser = ref([]);
    const newUser = ref({});
    const suitableUsers = ref([]);
    const serverResponse = reactive({
        data:[
            {
                id: '62227404-8066-11ed-a1eb-0242ac120002',
                name: 'William Dolores',
                email: 'dolores.williams@example.com',
                avatar: 'https://i.pravatar.cc/31?u=1',
                department: 'Sales',
                head:'69f01b0a-8066-11ed-a1eb-0242ac120002'
            },
            {
                id: '69f01b0a-8066-11ed-a1eb-0242ac120002',
                name: 'Ben George',
                email: 'b.george@example.com',
                avatar: 'https://i.pravatar.cc/33?u=12',
                department: 'Sales',
                head:null
            },
            {
                id: '722907f0-4066-11ed-a1eb-0242ac120002',
                name: 'Robert Kim',
                email: 'kim1987@example.com',
                avatar: 'https://i.pravatar.cc/32?u=13',
                department: 'Accountant',
                head:'69f01b0a-8066-11ed-a1eb-0242ac120002'
            },
            {
                id: '722907f0-5066-11ed-a1eb-0242ac120002',
                name: 'Ben Sala',
                email: 'b.sila@example.com',
                avatar: 'https://i.pravatar.cc/38?u=14',
                department: 'Sales',
                head:'69f01b0a-8066-11ed-a1eb-0242ac120002'
            },
            {
                id: '722907f0-6066-11ed-a1eb-0242ac120002',
                name: 'Kerido Fado',
                email: 'fadooo@example.com',
                avatar: 'https://i.pravatar.cc/37?u=15',
                department: 'Sales',
                head:'69f01b0a-8066-11ed-a1eb-0242ac120002'
            },
            {
                id: '722907f0-9066-11ed-a1eb-0242ac120002',
                name: 'Ben Malta',
                email: 'b.malta@example.com',
                avatar: 'https://i.pravatar.cc/33?u=16',
                department: 'Managers',
                head:'69f01b0a-8066-11ed-a1eb-0242ac120002'
            },
            {
                id: '734907f0-9066-11ed-a1eb-0242ac120002',
                name: 'Ben Shapiro',
                email: 'b.shapiro@example.com',
                avatar: 'https://i.pravatar.cc/33?u=18',
                department: 'Sales',
                head:'722907f0-6066-11ed-a1eb-0242ac120002'
            },
            {
                id: '722807f0-8066-11ed-a1eb-0242ac120002',
                name: 'Balando Wholles',
                email: 'balando@example.com',
                avatar: 'https://i.pravatar.cc/34?u=17',
                department: 'Accountant',
                head:null
            }
        ],
        meta:{
            total:100
        }
    })

    const getEmployeesListWithHeadEmail = (employees) => {
        const headList = employees.filter(item => !item.head);

        return employees.map(item => {
                        item.headEmail = headList.find(head => head.id === item.head)?.email;
                        return item;
                });
    }

    const fetchUsers = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));   

        const employeesList = JSON.parse(JSON.stringify(serverResponse));
        users.value = getEmployeesListWithHeadEmail(employeesList.data);
    }

    const fetchSelectedUser = async(id) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const employeesList = JSON.parse(JSON.stringify(serverResponse));
        const modifiedEmployeesList = getEmployeesListWithHeadEmail(employeesList.data);
        const findCurrentEmployee = modifiedEmployeesList.find((obj) => obj.id === id);
        
        currentUser.value.push(findCurrentEmployee);
    }

    const removeCurrentUser = () => {
        currentUser.value = [];
    }

    const createUser = (data) => {
        Object.assign(newUser, data);

        console.log(newUser);
        alert('New user Created in console');
    }

    const searchSuitableUsers = async(searchData) => {
        suitableUsers.value = [];
        await new Promise((resolve) => setTimeout(resolve, 700));

        const employeesList = JSON.parse(JSON.stringify(serverResponse));
        const modifiedEmployeesList = getEmployeesListWithHeadEmail(employeesList.data);

        suitableUsers.value = modifiedEmployeesList.filter(obj => obj.name.toLowerCase().includes(searchData.toLowerCase()));
    }

    const clearSuitableUsers = () => {
        suitableUsers.value = []
    }

    return {
        users,
        currentUser,
        serverResponse,
        newUser,
        suitableUsers,
        fetchUsers,
        getEmployeesListWithHeadEmail,
        fetchSelectedUser,
        removeCurrentUser,
        createUser,
        searchSuitableUsers,
        clearSuitableUsers
    }
})