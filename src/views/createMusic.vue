<template>
    <div class="createMusic">
        <div class="backGroundImage"></div>
        <div class="createMusic_container">
            <h1 class="h1">Upload Music Details</h1>
            <el-form :model="createMusic" :rules="rules" ref="ref_form">
                <!--music info input-->
                <el-form-item prop="musicName">
                  <el-input v-model="createMusic.musicName" placeholder="Music Name" clearable>
                        <template #prepend>
                            <el-icon><Headset /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="coverImage">
                    <el-input v-model="createMusic.coverImage" placeholder="Image Url" clearable>
                        <template #prepend>
                            <el-icon><PictureFilled /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="categories">
                    <el-input v-model="createMusic.categories" placeholder="Categories" clearable>
                        <template #prepend>
                            <el-icon><SetUp /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="singer">
                    <el-input v-model="createMusic.singer" placeholder="Singer" clearable>
                        <template #prepend>
                            <el-icon><Avatar /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="mv">
                    <el-input v-model="createMusic.mv" placeholder="MV URL" clearable>
                        <template #prepend>
                          <el-icon><Film /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                
                <!-- upload music file  -->
                <el-upload
                  ref="uploadRef"
                  class="upload-demo"
                  action="http://127.0.0.1:3000/api/v1/admin/upload"
                  :auto-upload="false"
                  @change="onFileChange"
                >
                  <template #trigger>
                    <el-button type="primary">select file</el-button>
                  </template>

                  <template #tip>
                    <div class="el-upload__tip">
                      Upload Music File Here
                    </div>
                  </template>
                </el-upload>
                <!--home button-->
                <el-button class="createMusic_submit" @click="goAdminPage">Cancel</el-button>
                <!--createMusic button-->
                <el-button type="primary" class="createMusic_submit" @click="submitMusic">Create Music</el-button>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import router from '../router/index';
import { reactive, ref } from "vue";
import { uploadMusic } from '../api/index';
import axios from 'axios';
/**
 * 初始的ref
 */
const ref_form = ref(null);

/**
 * createMusic表单的数据声明
 */
const createMusic = reactive({
    musicName:'',
    coverImage:'',
    categories:'',
    singer:'',
    mv: '',
    file: null
})

//创建一个onFileChange方法，是位于el-upload组件中的@change事件的处理程序，它在用户选择一个文件时被调用
//Create an onFileChange method, a handler for the @change event located in the el-upload component, which is called when the user selects a file
//file 参数包含有关所选文件的信息
//The file parameter contains information about the selected file
const onFileChange = (file) =>{
  //file.raw 是一个 File 对象，它包含所选文件的原始数据，将 file.raw 赋值给 createMusic.file，以便稍后将其与其他表单数据一起上传
  //file.raw is a File object that contains the raw data of the selected file, assign file.raw to createMusic.file so that it can be uploaded later along with the other form data
  createMusic.file = file.raw;
}

/**
 * createMusic表单的数据检验
 * 定义rules的检验 检查输入框是否为空
 */
const rules = {
musicName:[{required: 'true', trigger: 'blur', message: 'Please input Music Name'}],
categories:[{required: 'true', trigger: 'blur', message: 'Please input Category'}],
singer:[{required: 'true', trigger: 'blur', message: 'Please input the Singer'}],
}

/**
 * 注册方法
 */
const submitMusic = () =>{
  ref_form.value.validate((val) =>{
    if (val) {
      getCreateMusicData()
    }
  })
}

/**
 * upload music api的调用
 */
//注册的接口调用
const getCreateMusicData = async() =>{
  //创建一个新的FormData对象
  //Create a new FormData object
  const formData = new FormData();
  //将表单中的各个字段添加到对象中
  //Adding individual fields from the form to the object
  formData.append('musicName', createMusic.musicName);
  formData.append('coverImage', createMusic.coverImage);
  formData.append('categories', createMusic.categories);
  formData.append('singer', createMusic.singer);
  formData.append('mv', createMusic.mv);
  formData.append('file', createMusic.file);
  
  //处理可能的错误
  //Handling possible errors
  try {
    //使用axios发送一个api的post请求，将FormData对象上传，api地址为 http://127.0.0.1:3000/api/v1/admin/upload，即上传文件将被发送到该地址
    //Send a post request to the api using axios to upload the FormData object to the api address http://127.0.0.1:3000/api/v1/admin/upload, 
    //i.e. the uploaded file will be sent to that address
    //api的url后期应设置为全局url，以达到规范的要求
    //The api's url should later be set to a global url to meet the requirements of the specification
    const res = await axios.post('http://127.0.0.1:3000/api/v1/admin/upload', formData, {
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
        message: 'Upload Music Success!',
        type: 'success',
      });

      //需要传入router index.js中的path: '/adminPage'
      //Need to pass in path: '/adminPage' in router index.js
      router.push('/musicInfo');
    }

  } catch (err) {
        //如果发生错误，在控制台中记录错误
        //If an error occurs, log the error in the console
        console.error(err);
  }
}

//click to adminPage button
const goAdminPage = () =>{
    router.push('/musicInfo');
}
</script>

<style lang="less" scoped>
@-webkit-keyframes fadenum{
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100;
  }
}
//class login style
  .createMusic {
    height: 100%;
    .backGroundImage{
      height: 100%;
    //   background-image: url("");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 50% 50%;
      background-color: darkgray;
    }

    //icon style
    .el_icon{
      height: 30px !important;
    }
  
    //login box style
    .createMusic_container{
      animation: fadenum 1s ease;
      position: absolute;
      z-index: 1;
      width: 400px;
      top:50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 1s;
      min-height: 200px;
      text-align: center;
      background-color: whitesmoke;
      border-radius: 10px;
      padding: 20px;
    }

    //login box h1 style
    h1{
      font-size: 20px;
      transition: all 1s;
      font-weight: bold;
      margin-bottom: 36px;
    }

    .el_form{
      border-radius: 20px;
    }

    .el_card{
      .createMusic_submit{
        width: 100%;
        height: 50px;
        border-radius: 20px;
      }

      :deep(.el-input-group_prepend){
        padding: 0 10px;
      }
    }
  }
</style>