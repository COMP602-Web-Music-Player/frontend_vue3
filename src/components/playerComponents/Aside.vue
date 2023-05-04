<template>
    <el-menu class="el-menu-vertical-demo" active-text-color="#FFFFFF" background-color="#FF5C9A" text-color="#000000" unique-opened="true">
        <!--set up icon and title-->
        <div class="icon">
            <img src="../../img/logo1.png">
            <span>Music Control System</span>
        </div>

        <!--tab menu 1-->
        <el-sub-menu index="1">
            <template #title>
                <el-icon><Headset /></el-icon>
                <span>Play List</span>
            </template>
            <el-menu-item index="1-1">Play List 1</el-menu-item>
            <el-menu-item index="1-2">Play List 2</el-menu-item>
            <el-menu-item index="1-3">Play List 3</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import router from '../../router/index';

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