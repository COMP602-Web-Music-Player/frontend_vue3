<template>
    <div class="table">
        <!--创建表格-->
        <el-table :data="list" border stripe style="width:1390px">
            <!--第一列-->
            <el-table-column prop="id" label="User ID">

            </el-table-column>

            <el-table-column prop="username" label="Username">

            </el-table-column>

            <el-table-column prop="password" label="Password">

            </el-table-column>

            <el-table-column label="Operation">
                <template #default="scope">

                    <!--delete button scope.row.id传递局部对应的id值-->
                    <el-popconfirm title="Are you sure to delete this User info?" @confirm="deleteHandle(scope.row.id)">
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
const { list, deleteHandle } = defineProps(['list', 'deleteHandle'])
</script>

<style lang="less" scoped>

</style>