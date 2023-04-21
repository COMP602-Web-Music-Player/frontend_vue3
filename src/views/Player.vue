<template>
    <div class="common-layout">
        <el-container>
          <el-header>
                <Header />
            </el-header>
        
        <el-container>
          <el-aside width="200px">
            <Aside />
          </el-aside>
            <el-main>
                <Main />
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Aside from '../components/playerComponents/Aside.vue';
import Header from '../components/playerComponents/Header.vue';
import Main from '../components/playerComponents/Main.vue'

</script>

<style lang="less" scoped>
.el-aside {
  width: 270px;
  background-color: #FF5C9A;
  width: 270px;
  overflow: hidden;
}

.el-container {
  height: 100vh;
}

.el-main {
  display: flex;
}

.el-header {
  background-color: #FF5C9A;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>