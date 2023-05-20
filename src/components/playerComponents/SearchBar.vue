<template>
   <div class="search-bar">
    <font-awesome-icon icon="fa-solid faMagnifyingGlass" />
            <input type="text" v-model="query">
        </div>
</template>

<script setup>
import axios from "axios";
import "../../styles/player.css";


const SearchBar ={
  name: 'SerachBar',
  data() {
    return{
      query: '',
      results:[]
    }
  },
  methods:{
    search(){
      axios.get("/api/data").then(response =>{
        this.results = response.data.filter(item =>{
          return item.name.toLowerCase().includes(this.querytoLowerCase())
        })
      })
      .catch(error =>{
        console.error(error);
      })
    }
  }
}



</script>
