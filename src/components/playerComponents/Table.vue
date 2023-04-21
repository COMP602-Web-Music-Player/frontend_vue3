<template>
    <div class="table">
        <!--创建表格-->
        <el-table :data="list" style="width:1390px">
            <el-table-column prop="coverImage">
                <template #default="scope">
                    <img :src="scope.row.coverImage" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>

            <el-table-column prop="musicName" >

            </el-table-column>

            <el-table-column prop="categories">

            </el-table-column>

            <el-table-column prop="singer">

            </el-table-column>

            <el-table-column prop="url" label="url">

            </el-table-column>

            <el-icon><VideoPlay /></el-icon>
            <el-table-column>
                <template #default="scope">
                    <el-button :icon="VideoPlay" circle @click="playerClick(scope.row)"/>
                    <!--delete button scope.row.id传递局部对应的id值-->
                    <!-- <el-popconfirm title="Are you sure to delete this information?" @confirm="deleteHandle(scope.row.id)">
                        <template #reference>
                            <el-button type="danger" :icon="Delete" circle ></el-button>
                        </template>
                    </el-popconfirm> -->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { Delete, VideoPlay } from '@element-plus/icons-vue'
//子组件，传入父组件Main.vue传入的数据，使用defineProps接收
import { defineProps } from 'vue';
//父组件传入的变量名 list
const { list, playerClick } = defineProps(['list', 'playerClick'])
</script>

<style lang="less" scoped>

</style>