<template>
    <div class="main">
        <!-- <div>search</div> -->
        <Table :list="data.list" :editClick="editClick" :deleteHandle="deleteHandle"/>
        <!-- <div>分页</div> -->
    </div>
    <Edit :popShow="popShow" v-if="popShow" :message="musicInfo.message" :confirmClick="confirmClick"/>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import Table from './Table.vue';
import Edit from './Edit.vue';
import { getMusic, updateMusic } from '../../api/index';

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
 * edit music info logic
 */
//update music api
const updateMusicData = async(query) =>{
    //获取请求修改变量
    const {musicName, categories, singer, id} = query;
    //调用接口，传入需要修改的参数和对应id
    const res = await updateMusic({musicName, categories, singer, id});
    //假如后端获取对应message，打印message
    if (res?.message) {
        ElMessage({
            message: res.message,
            type: 'success'
        })
    }
}



//需要编辑的数据
const musicInfo = reactive({
    message: {}
})
//定义控制编辑弹窗的展示变量
const popShow = ref(false)
//定义控制编辑弹窗展示的方法
const isShowPop = (show) =>{
    popShow.value = show;
}

//编辑的按钮
const editClick = (val) =>{
    isShowPop(true);
    musicInfo.message = val
}

//取消按钮和确认按钮方法，接收一个参数val，用来区分点击不同的按钮状态
const confirmClick = (val) =>{
    if (val === 'cancel') {
        isShowPop(false);
    }else if (val.musicName !== musicInfo.message.musicName || val.categories !== musicInfo.message.categories || val.singer !== musicInfo.message.singer) {
        //如果以上信息发生更改，将item的id和接收edit组件中的id进行比对，如果相同，则对data.list中的信息进行重新赋值
        data.list.map((item) =>{
            if (item.id === val.id) {
                item.musicName = val.musicName;
                item.categories = val.categories;
                item.singer = val.singer;
            }
        })

        //关闭弹窗
        isShowPop(false);
        //修改接口调用
        updateMusicData({musicName: val.musicName, categories: val.categories, singer: val.singer, id: val.id})
    }else{
        ElMessage({
        showClose: true,
        message: 'No Edit',
        type: 'warning'
        })
    }
}

/**
 * music info删除
 */
const deleteHandle = (val) =>{
  //val: 获取table中 confirm事件deleteHandle中获取到的列表的row中的id值
  if (val) {
    data.list = data.list.filter((item) =>{
      //判断main table中 当前item的id值是否等于table传递过来中的 deleteHandle传递过来的id值
      return item.id !== val
    })
    //删除接口的调用，传入val
    
  }
}
</script>

<style lang="less" scoped>

</style>