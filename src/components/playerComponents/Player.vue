<template>
  <!-- modelValue: 设置dialog框展示状态-->
  <!-- modelValue: set the display state of the dialog box -->
  <el-dialog title="Player" :model-value="popShow" width="35%" center :show-close="false"  :close-on-click-modal="false" :close-on-press-escape="false" @opened="opened">
      <el-form >
        <!-- 包含整个音乐播放器的容器 -->
        <!-- A container that contains the entire music player -->
        <div class="net-easy-player">
          <!-- 显示背景图片，使用 state.backgroundUrl 作为图片 URL -->
          <!-- Show background image, use state.backgroundUrl as image URL -->
          <div class="background-flitter" :style="`background-image: url(${state.backgroundUrl});`"></div>

          <!-- 一个半透明遮罩，用于覆盖在背景图片上，使其变暗 -->
          <!-- A translucency mask that is used to overlay the background image to darken it -->
          <div class="music-mask"></div>

          <!-- 音频标签，用于播放音乐。它具有以下属性,src: 音乐文件的url, id and ref用于在引用元素，控制音量 -->
          <!-- Audio tag, used to play music. It has the following attributes, 
          src: the url of the music file, id and ref used to refer to the element, control the volume -->
          <audio :src="state.songInfo.url"  id="audio" ref="audioRef" :volume="state.volume / 100"></audio>

          <!-- 显示音乐封面图片 -->
          <!-- Show music cover image -->
          <div class="song-cover">
            <!-- state.songInfo.coverImage 作为图片 URL -->
            <!-- state.songInfo.coverImage as image URL -->
            <img class="audioCover" :src="state.songInfo.coverImage" alt="" />
          </div>

          <!-- 包含进度条和控制按钮的容器 -->
          <!-- A container containing a progress bar and control buttons -->
          <div class="music-footer">
            <!-- 包含歌曲信息、播放时间和进度条的容器 -->
            <!-- Container containing song information, playing time and progress bar -->
            <div class="music-speed">
              <!-- music name,singer currentTime and audioTime -->
              <div class="name-time">
                <div>{{ state.songInfo.musicName }} - {{state.songInfo.singer}}</div>
                <div>{{ state.currentTime }}/{{ state.audioTime }}</div>
              </div>

              <!-- 进度条的容器 -->
              <!-- container for the progress bar -->
              <div class="process-container">
                <div class="process-bar" ref="track" id="audio-bar">
                  <!-- 显示进度条 -->
                  <!-- show progress bar -->
                  <div class="progress-box" :style="{ width: audioProgressPercent }">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 播放按钮的容器 -->
          <!-- container for the play button -->
          <div class="play-icon-container">
              <div class="play-icon-box">
                <!-- last music -->
                <el-button @click="previousPiece" :icon="ArrowLeftBold"  circle />
                <!-- 播放/暂停按钮，可切换 -->
                <!-- Play/Pause button, toggleable -->
                <el-button  v-show="!state.playing" :icon="VideoPlay"  @click="playMusic" circle />
                <el-button  v-show="state.playing" :icon="VideoPause"  @click="playMusic" circle />
                <!-- next music -->
                <el-button :icon="ArrowRightBold" circle @click="nextMusic" />
              </div>
            </div>
            
            <!-- 音量控制的容器 -->
            <!-- volume control container -->
            <div class="action-container">
              <!-- 音量滑块的容器 -->
              <!-- Container for the volume slider -->
              <div class="volume">
                <!-- 滑块组件 v-model双向绑定了state.volume，以实时调整音量 -->
                <!-- Slider component, v-model is bidirectionally bound to state.volume to adjust the volume in real time -->
                <el-slider v-model="state.volume"></el-slider>
              </div>
            </div>
        </div>

        <!-- 关闭弹窗按钮 -->
        <!-- close popup button -->
        <el-form-item>
            <el-button @click="cancelClick('cancel')">Close</el-button>
        </el-form-item>
      </el-form> 
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch, computed, defineProps } from "vue";
import { ArrowLeftBold, ArrowRightBold, VideoPlay,VideoPause} from '@element-plus/icons-vue'
//获取父组件main.vue传过来的表格中的数据，通过message获取
//Get the data in the table passed by the parent component main.vue, and get it through message
const props = defineProps(['popShow','cancelClick', "playIndex", "list"]);

//进度条初始化
//progress bar initialization
const track = ref(null);
//音频初始化
//audio initialization
const audioRef = ref(null);
/**
 * 定义音乐播放器中需要的响应数据
 * Define the response data needed in the music player
 */
const state = reactive({
  backgroundUrl: "https://peiyinimg.qupeiyin.cn/1629950282884-288.jpg",
  menuList: ["Playing", "Suggestion", "Suggestion", "Playing History"],
  //当前选中的菜单项的索引
  //The index of the currently selected menu item
  activeIndex: 2,
  //音乐是否正在播放
  //Is music playing
  playing: false,
  //store music list
  songList: [],
  //音频播放进度
  //audio playback progress
  audioProgress: 0,
  //当前播放的歌曲在列表中的index
  //The index of the currently playing song in the list
  playIndex: 0,
  //歌词行数
  lyricIndex: 0,
  //当前播放进度
  //current playback progress
  currentTime: 0,
  //进度条总长度
  //The total length of the progress bar
  progressL: 0,
  //当前正在播放的歌曲信息的对象
  //An object of the currently playing song information
  songInfo: {},
  lyricInfo: [],
  //音频播放的当前时间以“mm：ss”格式显示的字符串
  //The current time of audio playback as a string in "mm:ss" format
  audioTime: "00:00",
  //音频播放音量的数字 max 100
  //Number of audio playback volume max 100
  volume: 100,
  //搜索或者历史播放完成后关闭播放状态按钮
  //Close the playback status button after the search or history playback is completed
  playStatus: false, 
});

/**
 * 监视 props.list,保证songList和props传递过来的对应值是一致
 * watch props.list to ensure that the corresponding values passed by songList and props are consistent
 */
watch(
  //将 props.list 作为数据源传给 watch
  //Pass props.list as data source to watch
  () => props.list,
  //当 props.list 发生变化时，执行回调函数， props.list 的值赋值给newList
  //When props.list changes, the callback function is executed, and the value of props.list is assigned to newList
  (newList) => {
    state.songList = newList;
  },
);
/**
 * 同理，监视playIndex的变化
 * watch changes in playIndex
 */
watch(
  //将 props.playIndex 作为数据源传给 watch
  //Pass props.playIndex as data source to watch
  () => props.playIndex,
  //当 props.playIndex 发生变化时，执行回调函数， props.playIndex 的值赋值给newIndex
  //When props.playIndex changes, the callback function is executed, and the value of props.playIndex is assigned to newIndex
  (newIndex) => {
    state.playIndex = newIndex;
  },
);

/**
 * 在组件打开时执行。这个主要负责初始化进度条长度并调用 Init 函数进行初始化
 * Executed when the component is opened. This is mainly responsible for 
 * initializing the length of the progress bar and calling the Init function for initialization
 */
const opened = () => {
  //将track的 offsetWidth赋值给 state.progressL，用于设置进度条的总长度
  //Assign the offsetWidth of the track to state.progressL to set the total length of the progress bar
    state.progressL = track.value.offsetWidth;
    console.log('state.playIndex1 = ', state.playIndex);
    //初始
    //Init
    Init(); 
}

/**
 * 调用 GetSongInfo 函数来获取当前播放歌曲的信息
 * Call the GetSongInfo function to get the information of the currently playing song
 */
const Init = () => {
  GetSongInfo();
};

/**
 * 获取歌曲列表中的数据
 * Get the data in the song list
 */
const GetSongInfo = () => {
  //初始化
  //initialization
  let myList = state.songList;
  //获取当前播放歌曲的信息，并将其存储在state.songInfo
  //Get the information of the currently playing song and store it in state.songInfo
  state.songInfo = myList[state.playIndex];
  //获取对应图片的url，并将其存储在state.coverImage
  //Get the url of the corresponding image and store it in state.coverImage
  state.backgroundUrl = state.songInfo.coverImage;
  //音频初始化
  //audio initialization
  audioInit();
};

/**
 * 播放music时，对音频元素进行初始化
 * When playing music, initialize the audio element
 */
const audioInit = () => {
  //通过getElementById("audio")获取页面中的 audio 元素，打印 audio 元素的信息
  //Get the audio element in the page through getElementById("audio"), and print the information of the audio element
  console.log(document.getElementById("audio"),audioRef.value);
  //添加canplay事件监听器
  //Add canplay event listener
  audioRef.value.addEventListener("canplay", () => {
    //将音频时长通过 TimeToString 函数转换成 "mm:ss" 格式。存储在audioTime
    //Convert the audio duration to "mm:ss" format with the TimeToString function. stored in audioTime
    state.audioTime = TimeToString(audioRef.value.duration);
  });
  //添加timeupdate事件监听器，音频的播放位置发生变化时触发
  //Add a timeupdate event listener, triggered when the audio playback position changes
  audioRef.value.addEventListener("timeupdate", () => {
    //重新获取当前播放时间
    //Get the current playing time again
    let compareTime = audioRef.value.currentTime;
    for (let i = 0; i < state.lyricInfo.length; i++) {
      if (compareTime > parseInt(state.lyricInfo[i].time)) {
        const index = state.lyricInfo[i].index;
        if (i === parseInt(index)) {
          state.lyricIndex = i;
        }
      }
    }
    //将音频的当前播放时间转换成 "mm:ss" 格式
    //Convert the current playback time of the audio to "mm:ss" format
    state.currentTime = TimeToString(audioRef.value.currentTime);
    //计算音频的播放进度，将结果存储在 state.audioProgress 中
    //Calculate the playback progress of the audio and store the result in state.audioProgress
    state.audioProgress = audioRef.value.currentTime / audioRef.value.duration;
  });
  //添加ended事件监听器，当音频播放结束时，触发此事件
  //Add an ended event listener, when the audio playback ends, this event is triggered
  audioRef.value.addEventListener("ended", () => {
    //调用musicPlay函数，获取列表中的index，播放下一首歌曲
    //Call the musicPlay function to get the index in the list and play the next song
    musicPlay(state.playIndex)
  });
};

/**
 * 播放指定index的歌曲，根据index变量获取
 * Play the song with the specified index, get it according to the index variable
 */
const musicPlay = (index) => {
  //根据index从songList中获取对应的music信息
  //Get the corresponding music information from the songList according to the index
  state.songInfo = state.songList[index];
  //获取对应背景图的url
  //Get the url of the corresponding background image
  state.backgroundUrl = state.songInfo.coverImage;
  //将playStatus设置为false，表示当前歌曲已准备好播放
  //Set playStatus to false, indicating that the current song is ready to play
  state.playStatus = false;
  //使用setTimeout函数来创建一个定时器，延迟0.1s后执行以下操作
  //Use the setTimeout function to create a timer and perform the following operations after a delay of 0.1s

  //使用 clearTimeout(_timer) 清除定时器，以避免重复执行定时器中的操作
  //Use clearTimeout(_timer) to clear the timer to avoid repeating operations in the timer.
  const _timer = setTimeout(() => {
    //调用对应audio中对应值的play方法播放音频，并清除该计时器
    //Call the play method corresponding to the corresponding value in audio to play the audio and clear the timer
    audioRef.value.play();
    clearTimeout(_timer)
  }, 100);
} 

/**
 * 播放上一首歌
 * play previous song
 */
const previousPiece = () => {
  //计算last music在歌曲列表中的索引
  //Calculate the index of last music in the song list
  let _index = state.playIndex - 1;
  //检查index是否小于0
  //Check if index is less than 0,
  if(_index < 0)_index = state.songList.length - 1;
  console.log(_index);
  //如果是，将_index设置为state.songList.length - 1，播放最后一首歌
  //If yes, set _index to state.songList.length - 1, play the last song
  state.playIndex  = _index;
  //传入index，播放上一首music
  //Pass in the index and play the previous music
  musicPlay(state.playIndex)
}

/**
 * 播放下一首歌
 * play next song
 */
const nextMusic = () => {
  //获取下一首歌，当前index + 1得到
  //Get the next song, the current index + 1 gets
  let _index = state.playIndex + 1;
  //检查index是否大于等于 songList.length，如果是，将index设置为 0，这样做是为了实现循环播放功能
  //Check if the index is greater than or equal to songList.length, if yes, set the index to 0, this is to achieve the loop playback function
  if(_index >= state.songList.length)_index = 0;
  state.playIndex  = _index;
  //播放列表中的第一首歌曲
  //first song in playlist
  musicPlay(state.playIndex)
}

/**
 * 将秒数转换为以 "分:秒" 格式的字符串
 * Converts seconds to a string in "mm:ss" format
 */
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

/**
 * playing music
 */
const playMusic = () => {
  if (state.playing) {
    //播放中,点击则为暂停
    //During playback, click to pause
    state.playing = false;
    audioRef.value.pause();
  } else {
    //暂停中,点击则为播放
    //Pausing, click to play
    state.playing = true;
    audioRef.value.play();
  }
};

const audioProgressPercent = computed(() => {
  return `${state.audioProgress * 100}%`;
});
</script>

<style>
.el-main .el-overlay .el-overlay-dialog .el-dialog{
  background: none !important
}


</style>
<style lang="less" scoped>
.font-size {
font-size: 17px;
}
.font-style {
font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

:deep(.el-form-item__content) {
justify-content: center;
margin-left: 0 !important;
}

// ::v-deep 
.dialog-footer button:first-child{
margin-right: 10px;
}

:deep(.el-form-item__label) {
width: 110px !important;
font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

:deep(.el-form-item__content) {
justify-content: center;
margin-left: 0 !important;
}

.slider-demo-block {
display: flex;
align-items: center;
}
</style>

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