<template>
  <div class="main">
    <el-form>
      <el-form-item>
        <el-input v-model="query" placeholder="Search Music" />
      </el-form-item>
    </el-form>
  </div>
  <Player :popShow="popShow" :list="data.List" :play-index="data.playIndex" :cancelClick="cancelClick"/>
  <ul>
    <li v-for="item in musicList" :key="item.id">
      {{ item.musicName }}
    </li>
  </ul>
  
  <!-- <div class="search-bar">
    <input type="text" v-model="query" @input="search"/> 
    
    <Player :popShow="popShow" :list="data.list" :play-index="data.playIndex" :cancelClick="cancelClick"></Player>

    <ul>
      <li v-for="item in musicList" :key="item.id">
        {{ item.musicName }}
      </li>
    </ul>
  </div> -->

</template>

<script setup>
import Table from './Table.vue';
import Player from './Player.vue';
import {getMusic} from '../../api/index';
import {reactive, ref, computed} from 'vue';
import "../../styles/player.css";

const data = reactive({
  list:[],
  playIndex:0,
  sideCategories: 'English'
})

const query = ref("");
const musicList = computed(() => {
  return data.list?.filter((item) =>{
    return item.musicName.toLowerCase().indexOf(inputValue.vlaue.toLowerCase()) >=0;
  })
})

// const SearchBar = {
//   name: "SearchBar",
//   data(){
//     return{
//       query: "",
//       results: [],
//       data: []
//     };
//   },
//   methods: {
//     search() {
//       this.results = this.data.filter((item) =>{
//         return item.name.toLowerCase().includes(this.query.toLowerCase());
//       });
//     },
//   },
// };
</script>
