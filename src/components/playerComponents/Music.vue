<template>
  <div class="net-easy-player">
    <div
      class="background-flitter"
      :style="`background-image: url(${state.backgroundUrl});`"
    ></div>
    <div class="music-mask"></div>
    <audio :src="state.songInfo.url"  id="audio" ref="audioRef" :volume="state.volume / 100"></audio>
    <div class="song-cover">
        <img class="audioCover" :src="state.songInfo.coverImage" alt="" />
      </div>
      
    <div class="music-footer">
      

      <div class="music-speed">
        <div class="name-time">
          <div>{{ state.songInfo.musicName }} - {{state.songInfo.singer}}</div>
          <div>{{ state.currentTime }}/{{ state.audioTime }}</div>
        </div>
        <div class="process-container">
          <div class="process-bar" ref="track" id="audio-bar">
            <div class="progress-box" :style="{ width: audioProgressPercent }">
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="play-icon-container">
        <div class="play-icon-box">
          <el-button @click="previousPiece" :icon="ArrowLeftBold"  circle></el-button>
              <el-button  v-show="!state.playing" :icon="VideoPlay"  @click="playMusic" circle></el-button>
              <el-button  v-show="state.playing" :icon="VideoPause"  @click="playMusic" circle></el-button>
              <el-button :icon="ArrowRightBold" circle @click="nextMusic"></el-button>
        </div>
      </div>
      <div class="action-container">
        <div class="volume">
          <el-slider v-model="state.volume"></el-slider>
        </div>
      </div>
  </div>
</template>
  
<script setup>
import { onMounted, reactive, ref,  computed, defineProps } from "vue";
import { ArrowLeftBold, ArrowRightBold, VideoPlay,VideoPause} from '@element-plus/icons-vue'
const props = defineProps(['musicList']);

const track = ref(null);
const audioRef = ref(null);
  const state = reactive({
    backgroundUrl: "https://peiyinimg.qupeiyin.cn/1629950282884-288.jpg",
    menuList: ["Playing", "Suggestion", "Searching", "Playing History"],
    activeIndex: 2, // 选中
    playing: false,
    songList: props.musicList,
    audioProgress: 0, // 进度
    playIndex: 0, // 当前播放哪一首
    lyricIndex: 0, // 歌词到哪一行了
    currentTime: 0, // 当前播放进度
    progressL: 0, // 进度条总长度
    songInfo: {},
    lyricInfo: [],
    audioTime: "00:00",
    volume: 100,
    playStatus: false, // 搜索或者历史播放完成后关闭播放状态按钮
});

onMounted(() => {
  // state.progressL = track.value.offsetHeight;
  console.log(state.progressL); //取元素宽高等属性操作
  state.progressL = track.value.offsetWidth;
  // window.addEventListener("resize", function () {
  //   // 变化后需要做的事
  //   state.progressL = track.value.offsetHeight;
  // });
  Init(); // 初始化
});
const Init = () => {
  GetSongInfo();
};
const GetSongInfo = () => {
  let myList = state.songList;
  state.songInfo = myList[0];
  state.backgroundUrl = state.songInfo.coverImage;
  audioInit();
  // GetLyric(state.songInfo.id);
};
const audioInit = () => {
  console.log(document.getElementById("audio"),audioRef.value);
  // let progressL = track.value.offsetWidth; // 进度条总长
  audioRef.value.addEventListener("canplay", () => {
    state.audioTime = TimeToString(audioRef.value.duration);
  });
  audioRef.value.addEventListener("timeupdate", () => {
    // 当前播放时间
    let compareTime = audioRef.value.currentTime;
    for (let i = 0; i < state.lyricInfo.length; i++) {
      if (compareTime > parseInt(state.lyricInfo[i].time)) {
        const index = state.lyricInfo[i].index;
        if (i === parseInt(index)) {
          state.lyricIndex = i;
        }
      }
    }
    state.currentTime = TimeToString(audioRef.value.currentTime);
    state.audioProgress = audioRef.value.currentTime / audioRef.value.duration;
  });
  audioRef.value.addEventListener("ended", () => {
    musicPlay(state.playIndex)
  });
};

const musicPlay = (index) => {
  state.songInfo = state.songList[index];
    state.backgroundUrl = state.songInfo.coverImage;
    // GetLyric(state.songInfo.id);
    state.playStatus = false;
    const _timer = setTimeout(() => {
      audioRef.value.play();
      clearTimeout(_timer)
    }, 100);
} 

const previousPiece = () => {
  let _index = state.playIndex - 1;
  if(_index < 0)_index = state.songList.length - 1;
  console.log(_index);
  state.playIndex  = _index;
  musicPlay(state.playIndex)
}

const nextMusic = () => {
  let _index = state.playIndex + 1;
  if(_index >= state.songList.length)_index = 0;
  state.playIndex  = _index;
  musicPlay(state.playIndex)
}

const TimeToString = (seconds) => {
  let param = parseInt(seconds);
  let hh = "",
    mm = "",
    ss = "";
  if (param >= 0 && param < 60) {
    param < 10 ? (ss = "0" + param) : (ss = param);
    return "00:" + ss;
  } else if (param >= 60 && param < 3600) {
    mm = parseInt(param / 60);
    mm < 10 ? (mm = "0" + mm) : mm;
    param - parseInt(mm * 60) < 10
      ? (ss = "0" + String(param - parseInt(mm * 60)))
      : (ss = param - parseInt(mm * 60));
    return mm + ":" + ss;
  }
};

const playMusic = () => {
  if (state.playing) {
    // 播放中,点击则为暂停
    state.playing = false;
    // rotate.style.animationPlayState = "paused";
    audioRef.value.pause();
  } else {
    // 暂停中,点击则为播放
    state.playing = true;
    // rotate.style.animationPlayState = "running";
    audioRef.value.play();
  }
};

const audioProgressPercent = computed(() => {
  return `${state.audioProgress * 100}%`;
});
</script>

<style lang="less" scoped>
.net-easy-player {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
  /*遮罩*/
  .music-mask,
  .background-flitter {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .music-mask {
    z-index: -1;
    background: rgba(126, 126, 126, 0.4);
  }
  .background-flitter {
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(12px);
  //   opacity: 0.9;
    transition: all 0.8s;
  //   transform: scale(1.1);
  }
  .music-header {
    width: 100%;
    height: 72px;
    line-height: 48px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    padding: 12px 24px;
    box-sizing: border-box;
  }
  .music-container {
    position: relative;
    width: 100%;
    height: calc(~"100% - 144px");
    display: flex;
    .list-main {
      width: calc(~"100% - 320px");
      height: 100%;
      .menu-box {
        width: 100%;
        display: flex;
        height: 60px;
        align-items: center;
        padding: 0 36px;
        box-sizing: border-box;
        .menu-button {
          width: 96px;
          border: 1px solid #dddcdc;
          height: 36px;
          text-align: center;
          color: #dddcdc;
          line-height: 36px;
          font-size: 16px;
          margin-right: 20px;
          cursor: pointer;
          border-radius: 3px;
          // &.active {
          //   border: 1px solid #40ce8f;
          //   color: #fff;
          // }
          &.active {
            --border-width: 3px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            // width: 300px;
            // height: 200px;
            font-family: Lato, sans-serif;
            // font-size: 2.5rem;
            text-transform: uppercase;
            color: white;
            background: rgba(235, 227, 227, 0.6);
            border-radius: var(--border-width);

            &::after {
              position: absolute;
              content: "";
              top: calc(-1 * var(--border-width));
              left: calc(-1 * var(--border-width));
              z-index: -1;
              width: calc(100% + var(--border-width) * 2);
              height: calc(100% + var(--border-width) * 2);
              background: linear-gradient(
                60deg,
                hsl(224, 85%, 66%),
                hsl(269, 85%, 66%),
                hsl(314, 85%, 66%),
                hsl(359, 85%, 66%),
                hsl(44, 85%, 66%),
                hsl(89, 85%, 66%),
                hsl(134, 85%, 66%),
                hsl(179, 85%, 66%)
              );
              background-size: 300% 300%;
              background-position: 0 50%;
              border-radius: calc(2 * var(--border-width));
              animation: moveGradient 4s alternate infinite;
            }
          }

          @keyframes moveGradient {
            50% {
              background-position: 100% 50%;
            }
          }
        }
      }
      .main-container {
        width: 100%;
        height: calc(~"100% - 60px");
        position: relative;
      }
    }
    .song-info {
      width: 320px;
      height: 100%;
    }
  }
  .song-cover {
    display: flex;
    align-items: center;
    justify-content: center;
      padding: 9px 16px 9px 10px;
      box-sizing: border-box;
      .audioCover {
        display: block;
        width: 200px;
        height: 200px;
        border-radius: 100px;
      }
    }
    .play-icon-container {
      margin-top: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      box-sizing: border-box;
      .play-icon-box{
        display: flex;
        .play-icon {
        width: 42px;
        height: 42px;
        display: block;
        cursor: pointer;
        margin: 0 10px;
      }
      }
    
    }
  .music-footer {
    width: 100%;
    height: 72px;
    margin-top: 50px;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    box-shadow: -5px 0 20px rgb(83, 80, 80);


    .music-speed {
      width: 100%;
      height: 100%;
      position: relative;
      .name-time {
        width: 100%;
        height: 36px;
        line-height: 36px;
        color: #fff;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
      .process-container {
        width: 100%;
        height: 24px;
        margin-top: 12px;
        position: relative;
        .process-bar {
          position: absolute;
          z-index: 10;
          top: -5px;
          width: 100%;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 5px;
          cursor: pointer;
          .progress-box {
            height: 100%;
            background: #40ce8f;
            position: relative;
            border-radius: 5px;
            .play-point {
              transition: -webkit-transform 0.2s linear;
              transition: transform 0.2s linear;
              transition: transform 0.2s linear, -webkit-transform 0.2s linear;
              position: absolute;
              width: 18px;
              height: 18px;
              border-radius: 9px;
              top: -4px;
              cursor: pointer;
              img {
                display: block;
                position: absolute;
                top: -2px;
                width: 18px;
                height: 18px;
                background: #fff;
                border-radius: 9px;
                margin-left: -9px;
              }
            }
          }
        }
      }
    }

  }
}
.action-container {
  margin-top: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      box-sizing: border-box;
      .el-dropdown-link {
        color: #fff;
      }
      .volume {
        width: 300px;
      }
    }
</style>
<style>
  .el-slider .el-slider__bar {
    background-color: #40ce8f !important;
  }
  .el-slider__button {
    border: #40ce8f;
  }
  </style>