// Load libraries
import throttle from 'lodash.throttle';
import vimioPlayer from '@vimeo/player';

// Connect to HTML and VIMEO
const iframe = document.querySelector('iframe');
const player = new vimioPlayer(iframe);

// Video player`s listener
player.on(
  'timeupdate',
  throttle(onPlayVideo, 1001, {
    leading: false,
    trailing: true,
  })
);

// Other func.
function onPlayVideo(evt) {
  localStorage.setItem('videoplayer-current-time', evt.seconds);
}

player.setCurrentTime(hasTimeInStorage());

function hasTimeInStorage() {
  if (localStorage.getItem('videoplayer-current-time') === null) {
    return 0;
  } else {
    return localStorage.getItem('videoplayer-current-time');
  }
}
