<template>
    <!-- Register模块 -->
    <div class="login">
      <div class="login_container">
        <h1 class="h1">Register</h1>
        <!--keyup.enter click 回车 绑定事件-->
        <el-form :rules="rules" @keyup.enter="register" :model="userInfo" ref="ref_form">

          <!--用户名输入框 prop对应相关的rules检查 v-model.trim: 将用户输入的前后的空格去掉-->
          <el-form-item prop="admin">
            <el-input v-model="userInfo.username" placeholder="Please Input User Name" clearable v-model.trim ="userInfo.username">
              <!--插入icon图标-->
              <template #prepend>
                <el-icon><Avatar /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!--密码输入框 prop对应相关的rules检查 v-model.trim: 将用户输入的前后的空格去掉-->
          <el-form-item prop="password">
            <el-input v-model="userInfo.password" placeholder="Please Input Password" show-password clearable v-model.trim ="userInfo.password">
              <!--插入icon图标-->
              <template #prepend>
                <el-icon><Key /></el-icon>              
              </template>
            </el-input>
          </el-form-item>

          <!--click button 进入player主页面-->
          <!--绑定事件 跳转至player页面-->
          <button class="login_submit" @click="register">Register</button>
        </el-form>
        <div class="top-line"></div>
        <h2 class="sub-heading">Fill the form to regist</h2>
      </div>
    </div>
</template>

<script setup>
import router from '../router/index';
import "../styles/adminlogin-style.css";
import { reactive, ref } from 'vue';
import {userRegister } from '../api/index';
/**
 * 初始的ref
 */
const ref_form = ref(null);

/**
 * login/register表单的数据声明
 */
const userInfo = reactive({
    username:'',
    password: '',
})

/**
 * login/register表单的数据检验
 * 定义rules的检验 检查输入框是否为空
 */
const rules = {
    username:[{required: 'true', trigger: 'blur', message: 'Please input an User Name'}],
    password:[{required: 'true', trigger: 'blur', message: 'Please input the Password'}],
}

/**
 * 注册方法
 */
const register = () =>{
  ref_form.value.validate((val) =>{
    if (val) {
        getRegistData();
    }
  })
}

/**
 * user register接口的调用
 */
//注册的接口调用
const getRegistData = async() =>{
  //register api 封装调用
  const res = await userRegister({username: userInfo.username, password: userInfo.password})
  //如果注册成功
  if (res?.message) {
    ElMessage({
        message: 'Registration successful!',
        type: 'success',
      });
      //需要传入router index.js中的path: '/player'
      router.push('/userLogin');
  }else{
    ElMessage({
        message: 'Registration Failed!',
        type: 'warning',
      });
  }     
}
</script>