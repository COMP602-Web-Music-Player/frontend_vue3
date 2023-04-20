<template>
    <div class="main">
        <!-- <div>search</div> -->
        <Table :list="data.list"/>
        <!-- <div>分页</div> -->
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import Table from './Table.vue';
import { getMusic } from '../../api/index';

//创建一个数组。接收传递过来的数据
const data = reactive({
    list:[]
})

/**
 * music info的获取
 */
 const getMusicData = async(query) =>{
    const id = query?.id;
    const res = await getMusic({id});
    //将根据id而query到的数据存入res，然后存入data.list中
    data.list = res?.data.list;
}
//显示数据
onMounted(() => {
    getMusicData()
})
</script>

<style lang="less" scoped>

</style>