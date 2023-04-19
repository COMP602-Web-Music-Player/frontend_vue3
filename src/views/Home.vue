<template>
    <div>
        home page
    </div>
    <el-button type="primary" @click="goUserLogin">Click to User Login</el-button>
    <el-button type="primary" @click="goAdminLogin">Click to Admin Login</el-button>
    <el-button type="primary" @click="goPlayer">Click to Player</el-button>
</template>

<script setup>
import router from "../router/index"

//click event go to user login page
const goUserLogin = () =>{
    router.push('/userLogin');
}

//click event go to admin login page
const goAdminLogin = () =>{
    router.push('/adminLogin')
}

//click event go to player page
const goPlayer = () =>{
    router.push('/player')
}
</script>

<style lang="less" scoped>

</style>