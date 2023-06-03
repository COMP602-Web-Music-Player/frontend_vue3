<template>
    <div class="main">
        <!-- <div>search</div> -->
        <Table :list="memberList" :playerClick="playerClick" />
    </div>
    <Player :popShow="popShow" :list="data.list"  :play-index="data.playIndex" :cancelClick="cancelClick"/>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import Table from './Table.vue';
import Player from './Player.vue';
//import api getMusic
import { getMusic } from '../../api/index';
import { ElMessage } from 'element-plus';

//创建一个数组。接收传递过来的数据, 音乐的index number
//Create an array. Receive the data passed in, the index number of the music
const data = reactive({
    list:[],
    playIndex: 0,
})

/**
 * music info的获取
 * Get music info
 * table列表在此处获取,music列表也是,只需要在此处进行请求即可
 * The table list is available here, as is the music list, just request it here
 */
const getMusicData = async(query) =>{
    const id = query?.id;
    const res = await getMusic({id});
    //将根据id而query到的数据存入res，然后存入data.list中
    //Store the data queried by id in res and then in data.list
    
    data.list = res?.data.list;
}
//显示数据
//display data
onMounted(() => {
    getMusicData();
})


const inputValue = ref('');

const memberList = computed(() => {
    return data.list?.filter((item) => {
        return item.musicName.toLowerCase().indexOf(inputValue.value.toLowerCase()) >=0;
    })
})

const mvConnect = (row) => {
    //使用html中的a标签来完成下载连接
    window.open(row.url, '_blank');

    ElMessage({
        message: 'Redirected to the link',
        type: 'success'
    });
};


/**
 * 控制播放器的逻辑
 * Control the logic of the player
 */
//播放器dialog框中需要展示的数据
//The data to be displayed in the player dialog box
const musicItemState = reactive({
    //命名为message，因为player.vue中，已经命名了该变量
    //named message, as the variable is already named in player.vue
    message:{}
})
//控制player的dialog框弹出的变量，默认false
//Variable that controls the pop-up of the player's dialog box, default false
const popShow = ref(false);
//控制播放器弹窗，展示的方法
//Control of player pop, methods of display
const isShowPop = (show) =>{
    popShow.value = show
}
//播放器的按钮
//Players' buttons
const playerClick = (val, index) =>{
    //当前播放列表中正在播放或选中的音乐项的索引 index 赋值给 data.playIndex
    //The index of the currently playing or selected music item in the playlist index is assigned to data.playIndex
    data.playIndex = index;
    isShowPop(true);
    //val 一个表示音乐项的对象，包含了音乐的信息，获取自table.vue中scope标签所对应的row，再将已经被赋值的val，重新赋值给message
    //val An object that represents a music item, containing information about the music,
    //obtained from the row corresponding to the scope tag in table.vue, and reassigning the val which has already been assigned a value, to message
    musicItemState.message = val
}

//cancel button
const cancelClick = (val) =>{
    //val absolute equal to 'cancel' 
    if (val === 'cancel') {
        //赋值为false，弹窗关闭
        //Assign a value of false to close the pop
        isShowPop(false);
    }
}
</script>

<style lang="less" scoped>

</style>