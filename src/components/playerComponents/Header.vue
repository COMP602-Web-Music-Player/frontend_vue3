<template>
    <div class="header">
        <!--折叠左菜单图标-->
        <div class="homeIcon">
        
        </div>
        <SearchBar />
        <div class="homeIcon">
            <span>Web Music Player</span>
        </div>
        <!--头部右标签 -->
        <div class="user" @mouseenter="isShowUserInfo('show')" @mouseleave="isShowUserInfo('leave')">
            <!--log out button-->
            <!-- <el-button type="primary" @click="goAdmin">Log Out</el-button> -->
            <img :src="userInfo.avatar"/>
            <div class="userInfo" v-show="show">
                <div @click="goAdmin">Log out</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted, reactive, ref, computed  } from 'vue';
import router from '../../router/index';
import "../../styles/player.css";
import SearchBar from './SearchBar.vue';
import { getUserInfo } from '../../api/index';

const goAdmin = () =>{
    localStorage.removeItem('loggedInUser');
    router.push('/home');
}

/**
 * mouse leave and enter event
 */
const show = ref (false);

const isShowUserInfo = (type) =>{
    type === 'show'? show.value = true:show.value = false
}

/**
 * 获取用户头像
 */
const store = useStore(); // 使用 useStore 钩子
const loggedInUser = computed(() => store.state.loggedInUser);
const userInfo = reactive({
    username:'',
    avatar: ''
})

const getUserInfoData = async () => {
    const res = await getUserInfo({username: loggedInUser.value.username});
    console.log(res);
    if (res) {
        userInfo.avatar = res?.data.list[0].avatar;
        userInfo.username = res?.data.list[0].username;
    }
    console.log(userInfo.username);
}

onMounted(() => {
    getUserInfoData();
})
</script>

<style lang="less" scoped>
.userInfo {
    z-index: 22;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    bottom: -38px;
    background-color: white;
    border: 5px;
    box-shadow: 0 4px 8px rgb(7 17 27 / 10%);
    text-align: center;

    div:hover {
        color: #409eff;
    }

    div {
        padding: 10px;
    }
}

.header {
    position: relative;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;

    .homeIcon{
        display: flex;
        align-items: center;
        position: relative;
        right:300px;

        span{
            margin-left: 10px;
        }
    }
    .user {
    display: flex;
    justify-content: center;
    width: 80px;

    img {
        width: 58px;
        height: 58px;
        border-radius: 50%;
    }
}
}
</style>