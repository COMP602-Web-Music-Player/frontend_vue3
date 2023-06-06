<template>
  <div class="search-bar">
    <input type="text" v-model="query" />
    <el-icon class="search-icon"><Search /></el-icon>
    <ul>
      <li v-for="result in searchResults" :key="result.id">
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from "axios";
import "../../styles/player.css";

const SearchBar = {
  name: "SearchBar",
  data() {
    return {
      query: "",
      results: [],
    };
  },
  methods: {
    search() {
      axios
        .get("/api/data")
        .then((response) => {
          this.results = response.data.filter((item) => {
            return item.name.toLowerCase().includes(this.querytoLowerCase());
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
