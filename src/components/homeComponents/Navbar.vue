<template>
    <nav>
        <img class="logo-nav" src="../../img/logo2.png" @click="home">
        <ul>
            <li @click="goAdminLogin"><p>Admin Log in</p></li>
            <li class="text-white">|</li>
            <li @click="goUserSignup"><p>Sign up</p></li>
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

//click event go to register page
const goUserSignup = () =>{
    router.push('/register');
}
</script>

