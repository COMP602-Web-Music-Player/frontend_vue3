<template>
    <!-- login模块 -->
    <div class="login">
      <div class="login_container">
        <h1 class="h1">ListenIn Admin Login</h1>
        <!--keyup.enter click 回车 绑定事件login-->
        <el-form :rules="rules" @keyup.enter="Login" :model="adminInfo" ref="ref_form">

          <!--用户名输入框 prop对应相关的rules检查 v-model.trim: 将用户输入的前后的空格去掉-->
          <el-form-item prop="admin">
            <el-input class= "text-change" v-model="adminInfo.admin" placeholder="Please Input Administer Name" clearable v-model.trim ="adminInfo.admin">
              <!--插入icon图标-->
              <template #prepend>
                <el-icon><Avatar /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!--密码输入框 prop对应相关的rules检查 v-model.trim: 将用户输入的前后的空格去掉-->
          <el-form-item prop="password">
            <el-input class="text-change" v-model="adminInfo.password" placeholder="Please Input Password" show-password clearable v-model.trim ="adminInfo.password">
              <!--插入icon图标-->
              <template #prepend>
                <el-icon><Key /></el-icon>              
              </template>
            </el-input>
          </el-form-item>

          <!--click button 进入admin主页面-->
          <!--绑定事件 跳转至admin home页面-->
          <button class="login_submit" @click="adminLogin">LOG IN</button>
        </el-form>
        <div class="top-line"></div>
        <h2 class="sub-heading">Don't have an Account?</h2>
        <button class="no-account-btn">Sign up for ListenIn</button>
      </div>
    </div>
</template>

<script setup>
import router from '../router/index';
import { reactive, ref } from 'vue';
import { adminGetLogin } from '../api/index';
import "../styles/adminlogin-style.css";
/**
 * 初始的ref
 */
const ref_form = ref(null);

/**
 * login表单的数据声明
 */
const adminInfo = reactive({
  admin:'',
  password: '',
})

/**
 * login表单的数据检验
 * 定义rules的检验 检查输入框是否为空
 */
const rules = {
admin:[{required: 'true', trigger: 'blur', message: 'Please input an Administer Name'}],
password:[{required: 'true', trigger: 'blur', message: 'Please input the Password'}],
}

/**
 * 登录方法
 */
const adminLogin = () =>{
  ref_form.value.validate((val) =>{
    if (val) {
      getLoginData();
    }
  })
}

/**
 * admin login接口的调用
 */
//登录的接口调用
const getLoginData = async() =>{
  //login api 封装调用
  const res = await adminGetLogin({admin: adminInfo.admin, password: adminInfo.password})
  //如果登录成功
  if (res?.message) {
    ElMessage({
        message: 'Login Success!',
        type: 'success',
      });
      //需要传入router index.js中的path: '/home'
      router.push('/adminPage');
  }else{
    ElMessage({
        message: 'Login Failed!',
        type: 'warning',
      });
  }     
}
</script>

