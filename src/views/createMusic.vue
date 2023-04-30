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
                
                <!--home button-->
                <el-button class="createMusic_submit" @click="goAdminPage">Cancel</el-button>
                <!--createMusic button-->
                <el-button type="primary" class="createMusic_submit" @click="createMusic">createMusic</el-button>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import router from '../router/index';
import { reactive, ref } from "vue";
// import {  } from '../api/index';
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
    singer:''
})

/**
 * createMusic表单的数据检验
 * 定义rules的检验 检查输入框是否为空
 */
const rules = {
musicName:[{required: 'true', trigger: 'blur', message: 'Please input Music Name'}],
categories:[{required: 'true', trigger: 'blur', message: 'Please input Phone Number'}],
singer:[{required: 'true', trigger: 'blur', message: 'Please input the User Name'}],
}

/**
 * 注册方法
 */
//  const createMusic = () =>{
//   ref_form.value.validate((val) =>{
//     if (val) {
//       getcreateMusicData()
//     }
//   })
// }

/**
 * member info 注册接口的调用
 */
// //注册的接口调用
// const getcreateMusicData = async() =>{
//   //注册接口
//   const res = await getcreateMusic({musicName: createMusic.musicName, coverImage: createMusic.coverImage, categories: createMusic.categories, singer: createMusic.singer})
  
//   //当接口中的token传入成功 注册时打印message
//   if (res?.message) {
//     ElMessage({
//     message: 'createMusic Success!',
//     type: 'success',
//   })
//   //需要传入router index.js中的path: '/adminPage'
//   router.push('/adminPage');
//   }
// }

//click to adminPage button
const goAdminPage = () =>{
    router.push('/adminPage');
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