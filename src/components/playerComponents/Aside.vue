<template>
    <el-menu class="el-menu-vertical-demo" active-text-color="#FFFFFF" background-color="#FF5C9A" text-color="#000000" unique-opened="true">
        <!--set up icon and title-->
        <div class="icon">
            <img src="../../img/logo1.png">
            <span>ListenIn</span>
        </div>

        <el-sub-menu index="1">
            <template #title>
                <el-icon><Headset /></el-icon>
                <span>All Music List</span>
            </template>
            <el-menu-item index="1-1" @click="goAllMusic">All Music</el-menu-item>
        </el-sub-menu>
        <!--tab menu 1-->
        <el-sub-menu index="2">
            <template #title>
                <el-icon><Headset /></el-icon>
                <span>Play List</span>
            </template>
            <el-menu-item index="2-1" @click="categoriesHandle('English')">English</el-menu-item>

            <el-menu-item index="2-2" @click="categoriesHandle('Chinese')">Chinese</el-menu-item>

            <el-menu-item index="2-3" @click="categoriesHandle('Korean')">Korean</el-menu-item>

            <el-menu-item index="2-4" @click="categoriesHandle('Japanese')">Japanese</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import router from '../../router/index';
import emitter from '../../utils/eventBus';
/**
 * click to change the sub menu tab
 */
const categoriesHandle = (type) =>{
    emitter.emit('categories', type)
}

const goAllMusic = () =>{
    router.push('/allMusic')
}
</script>

<style lang="less" scoped>
.el-radio-button_inner {
    padding: 0;
}

.el-menu:not(.el-menu--collapse) {
    width: 270px;
    min-height: 400px;
    border: none;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.icon {
    display: flex;
    align-items: center;
    font-weight: 320;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 113%;
    height: 60px;
    background-color: #FF5C9A;
    white-space: nowrap;
    padding-left: 10px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    img{
        width: 45px;
        height: 40px;
        margin-right: 10px;
    }
}
</style>