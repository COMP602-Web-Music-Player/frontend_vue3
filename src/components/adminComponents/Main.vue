<template>
    <div class="main">
        <!-- <div>search</div> -->
        <Table :list="data.list" :deleteHandle="deleteHandle"/>
        <!-- <div>分页</div> -->
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import Table from './Table.vue';
import { getUser } from '../../api/index';
//创建一个数组。接收传递过来的数据
const data = reactive({
    list:[]
})

/**
 * user info的获取
 */
const getUserData = async(query) =>{
    const id = query?.id;
    const res = await getUser({id});
    //将根据id而query到的数据存入res，然后存入data.list中
    data.list = res?.data.list;
}
//显示数据
onMounted(() => {
    getUserData()
})

/**
 * user info删除
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