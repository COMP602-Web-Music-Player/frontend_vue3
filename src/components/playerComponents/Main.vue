<template>
    <div class="main">
        <!-- <div>search</div> -->
        <Table :list="data.list" :playerClick="playerClick" />
    </div>
    <Player :popShow="popShow" :list="data.list"  :play-index="data.playIndex" :cancelClick="cancelClick"/>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import Table from './Table.vue';
import Player from './Player.vue';
//import api getMusic
import { getMusic } from '../../api/index';

//创建一个数组。接收传递过来的数据
const data = reactive({
    list:[],
    playIndex: 0
})

/**
 * music info的获取
 * table列表在此处获取,music列表也是,只需要在此处进行请求即可
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
const playerClick = (val, index) =>{
    //将 当前播放列表中正在播放或选中的音乐项的索引 index 赋值给 data.playIndex
    data.playIndex = index;
    isShowPop(true);
    //val 一个表示音乐项的对象，包含了音乐的信息，获取自table.vue中scope标签所对应的row，再将已经被赋值的val，重新赋值给message
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