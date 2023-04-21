<template>
    <div class="main">
        <!-- <div>search</div> -->
        <Table :list="data.list" :playerClick="playerClick" />
        <!-- <div>分页</div> -->
    </div>
    <Player :popShow="popShow" v-if="popShow" :message="musicItemState.message" :cancelClick="cancelClick"/>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import Table from './Table.vue';
import Player from './Player.vue';
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

/**
 * 控制播放器的逻辑
 */
//播放器dialog框中需要展示的数据
const musicItemState = reactive({
    //命名为message，因为player.vue中，已经命名了该变量
    message:{}
})
//控制player的dialog框弹出的变量，默认false
const popShow = ref(false);
//控制播放器弹窗，展示的方法
const isShowPop = (show) =>{
    popShow.value = show
}
//播放器的按钮
const playerClick = (val) =>{
    isShowPop(true);
    //val，获取自table.vue中scope标签所对应的row，再将已经被赋值的val，重新赋值给message
    musicItemState.message = val
}

//cancel button
const cancelClick = (val) =>{
    if (val === 'cancel') {
        isShowPop(false);
    }
}
</script>

<style lang="less" scoped>

</style>