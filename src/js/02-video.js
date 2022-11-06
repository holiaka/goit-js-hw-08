// Load libraries
import throttle from 'lodash.throttle';
import vimioPlayer from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new vimioPlayer(iframe);

player.on(
  'timeupdate',
  throttle(onPlayVideo, 1001, {
    leading: true,
    trailing: false,
  })
);

function onPlayVideo(evt) {
  localStorage.setItem('videoplayer-current-time', evt.seconds);  
}

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));