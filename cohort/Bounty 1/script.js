var chapters = [
    { start: 0, title: 'Introduction' },
    { start: 120, title: 'Main Content Begins' },
    { start: 300, title: 'Key Point' },
    // Add more chapters as needed
];

var player = videojs(
  "my-video",
  {
    controls: true,
    fluid: true,
    html5: {
      vhs: {
        overrideNative: true,
      },
    },
    },
  
  
  function () {
    var player = this;
    player.eme();
    player.src({
      src: "https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd",
      type: "application/dash+xml",
      keySystems: {
        "com.widevine.alpha": "https://cwip-shaka-proxy.appspot.com/no_auth",
      },
    });

    player.ready(function () {
      player.tech(true).on("keystatuschange", function (event) {
        console.log("event: ", event);
      });
    });
    },
  
  

  function addChapters() {
    var progressBar = player.controlBar.progressControl.seekBar;

    chapters.forEach(function (chapter) {
      var marker = document.createElement("div");
      marker.className = "vjs-chapter-marker";
      marker.dataset.start = chapter.start;

      var percent = (chapter.start / player.duration()) * 100;
      marker.style.left = percent + "%";

      marker.title = chapter.title;

      marker.addEventListener("click", function () {
        player.currentTime(chapter.start);
      });

      progressBar.el().appendChild(marker);
    });
  },

  // Call addChapters after the video is ready
  player.ready(function () {
    addChapters();
  })
);
