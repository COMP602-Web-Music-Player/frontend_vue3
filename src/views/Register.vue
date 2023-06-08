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

          <el-form-item prop="email">
            <el-input v-model="userInfo.email" placeholder="Please Input Email Address" clearable v-model.trim ="userInfo.email">
              <!--插入icon图标-->
              <template #prepend>
                <el-icon><Promotion /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="age">
            <el-input v-model="userInfo.age" placeholder="Please Input age" clearable v-model.trim ="userInfo.age">
              <!--插入icon图标-->
              <template #prepend>
                <el-icon><UserFilled /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="http://127.0.0.1:3000/api/v1/user/userRegister"
            :auto-upload="false"
            @change="onFileChange"
          >
            <template #trigger>
              <el-button type="primary">Select a Photo</el-button>
            </template>

            <template #tip>
              <div class="el-upload__tip">
                Upload User Avatar Here
              </div>
            </template>
          </el-upload>
          <!--click button 进入player主页面-->
          <!--绑定事件 跳转至player页面-->
          <button class="login_submit" @click="register">Register</button>
        </el-form>
        <div class="top-line"></div>
        <h2 class="sub-heading">Fill the form to Register</h2>
      </div>
    </div>
</template>

<script setup>
import router from '../router/index';
import "../styles/adminlogin-style.css";
import { reactive, ref } from 'vue';
import { userRegister } from '../api/index';
import axios from 'axios';

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
    email: '',
    age: '',
    file: ''
})

//创建一个onFileChange方法，是位于el-upload组件中的@change事件的处理程序，它在用户选择一个文件时被调用
//Create an onFileChange method, a handler for the @change event located in the el-upload component, which is called when the user selects a file
//file 参数包含有关所选文件的信息
//The file parameter contains information about the selected file
const onFileChange = (file) =>{
  //file.raw 是一个 File 对象，它包含所选文件的原始数据，将 file.raw 赋值给 createMusic.file，以便稍后将其与其他表单数据一起上传
  //file.raw is a File object that contains the raw data of the selected file, assign file.raw to createMusic.file so that it can be uploaded later along with the other form data
  userInfo.file = file.raw;
}

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
  //创建一个新的FormData对象
  //Create a new FormData object
  const formData = new FormData();
  //将表单中的各个字段添加到对象中
  //Adding individual fields from the form to the object
  formData.append('username', userInfo.username);
  formData.append('password', userInfo.password);
  formData.append('email', userInfo.email);
  formData.append('age', userInfo.age);
  formData.append('file', userInfo.file);


  
  //处理可能的错误
  //Handling possible errors
  try {
    //使用axios发送一个api的post请求，将FormData对象上传，api地址为 http://127.0.0.1:3000/api/v1/admin/upload，即上传文件将被发送到该地址
    //Send a post request to the api using axios to upload the FormData object to the api address http://127.0.0.1:3000/api/v1/admin/upload, 
    //i.e. the uploaded file will be sent to that address
    //api的url后期应设置为全局url，以达到规范的要求
    //The api's url should later be set to a global url to meet the requirements of the specification
    const res = await axios.post('http://127.0.0.1:3000/api/v1/user/userRegister', formData, {
      //请求的headers包含'Content-Type': 'multipart/form-data'，这表示我们正在发送多部分表单数据（包括文本和文件）
      //The request headers contain 'Content-Type': 'multipart/form-data', which means we are sending multipart form data (both text and file)
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    //上传成功，收到后端发送的message后打印提示信息
    //The upload is successful and an alert message is printed after receiving the message from the backend
    if (res?.data.message) {
      ElMessage({
        message: 'Register Success!',
        type: 'success',
      });

      //需要传入router index.js中的path: '/adminPage'
      //Need to pass in path: '/adminPage' in router index.js
      router.push('/userLogin');
    }

  } catch (err) {
        //如果发生错误，在控制台中记录错误
        //If an error occurs, log the error in the console
        console.error(err);
  }   
}
</script>