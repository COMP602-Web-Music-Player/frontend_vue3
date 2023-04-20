<template>
    <div class="table">
        <!--创建表格-->
        <el-table :data="list" border stripe style="width:1390px">
            <!--第一列-->
            <el-table-column prop="id" label="User ID">
                
            </el-table-column>

            <el-table-column prop="coverImage" label="coverImage">
                <template #default="scope">
                    <img :src="scope.row.coverImage" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>

            <el-table-column prop="musicName" label="musicName">

            </el-table-column>

            <el-table-column prop="categories" label="categories">

            </el-table-column>

            <el-table-column prop="singer" label="singer">

            </el-table-column>

            <el-table-column prop="url" label="url">

            </el-table-column>

            <el-table-column label="Operation">
                <template #default="scope">
                    <el-button type="primary" :icon="Edit" circle @click="editClick(scope.row)" />
                    <!--delete button scope.row.id传递局部对应的id值-->
                    <el-popconfirm title="Are you sure to delete this information?" @confirm="deleteHandle(scope.row.id)">
                        <template #reference>
                            <el-button type="danger" :icon="Delete" circle ></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
//子组件，传入父组件Main.vue传入的数据，使用defineProps接收
import { defineProps } from 'vue';
//父组件传入的变量名 list
const { list } = defineProps(['list'])
</script>

<style lang="less" scoped>

</style>