<template>
    <!-- modelValue: 设置dialog框展示状态-->
    <el-dialog title="Player" modelValue="popShow" width="35%" center :show-close="false">
        <el-form :model="playerData">
            <el-descriptions :model="playerData" class="font-style">
                <el-descriptions-item label="Music name" prop="musicName">
                    {{ playerData.musicName }}
                </el-descriptions-item>

                <el-descriptions-item label="Category" prop="categories">
                    {{ playerData.categories }}
                </el-descriptions-item>

                <el-descriptions-item label="Music name" prop="singer">
                    {{ playerData.singer }}
                </el-descriptions-item>

                <el-descriptions-item label="Url" prop="url">
                    {{ playerData.url }}
                </el-descriptions-item>
            </el-descriptions>

            <el-form-item>
                <el-button :icon="ArrowLeftBold" circle></el-button>
                <el-button :icon="VideoPlay" circle></el-button>
                <el-button :icon="ArrowRightBold" circle></el-button>
            </el-form-item>

            <el-form-item>

            </el-form-item>
                <div class="slider-demo-block">
                    <span class="demonstration"></span>
                    <el-slider v-model="value1" />
                </div>
            <el-form-item>
                <el-button @click="cancelClick('cancel')">Close</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ArrowLeftBold, ArrowRightBold, VideoPlay } from '@element-plus/icons-vue'
import { defineProps, reactive } from 'vue';
import router from '../../router';
//获取父组件main.vue传过来的表格中的数据，通过message获取
const {popShow, message, cancelClick} = defineProps(['popShow', 'message', 'cancelClick']);

//通过message变量，获取父组件main.vue传来的数据，并传入dialog框中
const playerData = reactive({
    musicName: message.musicName,
    categories: message.categories,
    singer: message.singer,
    url: message.url
})
</script>

<style lang="less" scoped>
.font-size {
  font-size: 17px;
}
.font-style {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

:deep(.el-form-item__content) {
  justify-content: center;
  margin-left: 0 !important;
}

.dialog-footer button:first-child{
  margin-right: 10px;
}

:deep(.el-form-item__label) {
  width: 110px !important;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

:deep(.el-form-item__content) {
  justify-content: center;
  margin-left: 0 !important;
}

.slider-demo-block {
  display: flex;
  align-items: center;
}
</style>