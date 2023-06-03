<template>
  <div class="search-bar">
    <input type="text" v-model="query" />
    <el-icon class="search-icon"><Search /></el-icon>
    <ul>
      <li v-for="results in SearchBar" :key="results.id">
        {{ results.data }}
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
        .get("/api/v1/admin/search")
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
