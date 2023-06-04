<template>
  <div class="search-bar">
    <input type="text" v-model="query" @input="search"/>
    <el-icon class="search-icon"><SearchBar /></el-icon>
    <ul>
      <li v-for="result in results" :key="result.id">
        {{ result.data }}
      </li>
    </ul>
  </div>
</template>

<script setup>

import "../../styles/player.css";

const SearchBar = {
  name: "SearchBar",
  data(){
    return{
      query: "",
      results: [],
      data: []
    };
  },
  methods: {
    search() {
      this.results = this.data.filter((item) =>{
        return item.name.toLowerCase().includes(this.query.toLowerCase());
      });
    },
  },
};
</script>
