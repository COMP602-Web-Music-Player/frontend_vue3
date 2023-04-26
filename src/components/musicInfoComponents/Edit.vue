<template>
    <el-dialog title="Edit" modelValue="popShow" width="30%" center :show-close="false">
        <el-form :model="editData" ref="ruleFormRef">
          <el-form-item label="Music Name" prop="musicName" required >
            <el-input v-model="editData.musicName" placeholder="Music Name" />
          </el-form-item>

          <el-form-item label="Category" prop="categories">
            <el-input v-model="editData.categories" placeholder="Category" />
          </el-form-item>

          <el-form-item label="Singer" prop="singer" required >
            <el-input v-model="editData.singer" placeholder="Singer" />
          </el-form-item>

          <el-form-item>
            <el-button @click="confirmClick('cancel')">Cancel</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">Confirm</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { defineProps, reactive, ref} from 'vue';

const  { popShow, message, confirmClick } = defineProps(['popShow', 'message', 'confirmClick'])
/**
 * 编辑组件维护的数据
 */
const editData = reactive({
    id: message.id,
    musicName: message.musicName,
    categories: message.categories,
    singer: message.singer
})

/**
 * 表单的校验规则
 */
//初始渲染为空，当表单完成从数据库提取数据传递到前端的渲染后,就可以拿到对应的元素
const ruleFormRef = ref(null)
const submitForm = async(fromEl) =>{
    if (!fromEl) return;
    await fromEl.validate((valid, fields) =>{
        if (valid) {
            confirmClick({musicName: editData.musicName, categories: editData.categories, singer: editData.singer, id: editData.id})
        }else{
            console.log('Error Submit', fields);
        }
    })
}
</script>

<style lang="less" scoped>
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
</style>