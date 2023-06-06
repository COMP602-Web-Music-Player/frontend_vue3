<template>
    <div class="table">
        <!--创建表格-->
        <el-table :data="musicList.list" style="width:1390px">
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

            <el-table-column>
                <template #default="scope">
                    <el-button :icon="VideoPlay" circle @click="playerClick(scope.row, scope.$index)"/>
                    <el-button :icon="Download" circle @click="downloadMusic(scope.row)"/>
                    <el-button :icon="VideoCameraFilled" circle />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { VideoPlay, Download, VideoCameraFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
//子组件，传入父组件Main.vue传入的数据，使用defineProps接收
import { defineProps,reactive, watch } from 'vue';
//父组件传入的变量名 list
const props = defineProps(['list', 'playerClick'])

const musicList = reactive({
    list: [],
})
watch(
  () => props.list,
  (newList) => {
    musicList.list = newList;
  },
);

//download music function, 接收一个名为row的参数.
const downloadMusic = (row) => {
    //使用html中的a标签来完成下载连接
    const link = document.createElement("a");
    //设置 link的href属性为music file的url(获取每一个row的url)
    link.href = row.url;
    //设置link的download属性，当点击button触发href时，下载文件，文件名为该列表中的row.musicName
    link.download = row.musicName;
    //触发link对象的click
    link.click();
    //success message
    ElMessage({
        message: 'Down load Success',
        type: 'success'
    })
    //下载完成后，释放对象的URL
    URL.revokeObjectURL(link.href);
};
</script>

<style lang="less" scoped>

</style>