<template>
    <nav>
        <ul>
            <li @click="goAdminLogin"><p>Admin Log in</p></li>
            <li @click="goPlayer"><p>Music Player</p></li>
            <li class="text-white">|</li>
            <li @click=""><p>Sign up</p></li>
            <li @click="goUserLogin"><p>Log in</p></li>
        </ul>
    </nav>
</template>

<script setup>
import router from "../../router/index"
import "../../styles/Navbar-style.css";


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

