<template>
    <Navbar/>
    <div class="welcome-container">
        <h1>Welcome to ListenIn</h1>
        <p>Join ListenIn today to experience premium add-free music.</p>
        <div class="btn" @click="goUserSignup">Sign up</div>
    </div>
    <div class="benefits-section">
        <h1>Why join ListenIn?</h1>
        <div class="card-container">

            <div class="card">
                <div class="cards">
                    <img src="../img/add-free.png">
                    <h2>Add-free music</h2>
                </div>
            </div>
            <div class="card">
                <div class="cards">
                    <img src="../img/music.png">
                    <h2>Free premium music</h2>
                </div>
            </div>
            <div class="card">
                <div class="cards">
                    <img src="../img/play.png">
                    <h2>play whenever whatever</h2>
                </div>
            </div>
        </div>
            
        </div>
        
    </template>

<script setup>
import router from "../router/index";
import Navbar from "../components/homeComponents/Navbar";
import "../styles/style.css";


const goUserSignup = () =>{
    router.push('/usersignup');
}

</script>

