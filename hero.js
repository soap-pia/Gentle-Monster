// 1. Load the IFrame Player API code asynchronously
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var loopInterval; // Variable to hold the interval ID

// 2. Called automatically when the API is ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player("video", {
    height: "315",
    width: "560",
    videoId: "58dWFQA_wGg",
    playerVars: {
      rel: 0,
      controls: 0,
      modestbranding: 0,
      showinfo: 0,
      autoplay: 1,
      fs: 0,
      mute: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// 3. Called when the video player is ready
function onPlayerReady(event) {
  event.target.playVideo();
  startContinuousLoopCheck();
}

// 4. Start checking to loop the video continuously
function startContinuousLoopCheck() {
  clearInterval(loopInterval);

  loopInterval = setInterval(function () {
    if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
      var duration = player.getDuration();
      var currentTime = player.getCurrentTime();
      var stopTime = duration - 0.5;

      if (currentTime >= stopTime && currentTime < duration) {
        player.seekTo(0); // restart video
      }
    }
  }, 30);
}

// 5. Called when player's state changes
function onPlayerStateChange(event) {
  if (
    event.data === YT.PlayerState.ENDED ||
    event.data === YT.PlayerState.PAUSED ||
    event.data === YT.PlayerState.BUFFERING
  ) {
    player.seekTo(0);
    player.playVideo();
  }
}
