import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import './App.css';

// let jwInterval = null;
const playlist = [{
  default: true,
  endtime: 0,
  file: "https://www.dropbox.com/s/8vfngf9327per8k/01%20Red%20Movie.mp4?raw=1",
  starttime: 0,
  status: true,
  title: "Red Movie",
},
{
  default: false,
  endtime: 0,
  file: "https://www.dropbox.com/s/a1f25h7vnpnyz9v/02%20Blue%20Movie.mp4?raw=1",
  starttime: 0,
  status: true,
  title: "Blue Movie",
},
{
  default: false,
  endtime: 0,
  file: "https://www.dropbox.com/s/eopew3rz2wwjknl/03%20Green%20Movie.mp4?raw=1",
  starttime: 0,
  status: true,
  title: "Green Movie",
},
{
  default: false,
  endtime: 0,
  file: "https://www.dropbox.com/s/sr9vfmnf77r49tk/04%20Yellow%20Movie.mp4?raw=1",
  starttime: 0,
  status: true,
  title: "Yellow Movie",
}
];

let player;
function App() {
  const [title, setTitle] = React.useState('');
  const [index, setIndex] = React.useState(-1);
  const onReady = () => {
    player = window.jwplayer('jw-player');
    console.log('loaded playlist===>', player.getPlaylist());
    // player.on('markersupdated', data => {
    //   if (player && typeof player.getMarkersVTT === 'function') {
    //     console.log(data.markers);
    //   }
    // });
    // player.on('beforeComplete', () => {
    //   console.log('beforeComplete===>', player.getPlaylistIndex(), player.getPlaylist());
    //   // player.next();
    //   // document.querySelector('iframe.jw-video').style.display = 'none';
    //   // document.querySelector('.jw-preview').style.display = 'block';
    // });
  };

  const onTime = event => {
    // console.log('onTime===>', event);
    // const player = window.jwplayer('jw-player');
    const playlistCurrentIndex = player.getPlaylistIndex();
    const video = player.getPlaylistItem(playlistCurrentIndex);
    console.log('onTime==>', playlistCurrentIndex, video);

    setTitle(video.title);
    setIndex(playlistCurrentIndex);
    // if (event.duration - event.position <= 5) {
    //   player.playlistNext();
    // }

    // const endtime = playlist[0].endtime;
    // const starttime = playlist[0].starttime;
    // if(player) {
    //   if (endtime > 0) {
    //     if (event.position >= endtime) {
    //       player.seek(endtime);
    //       player.pause();
    //     }
    //   }

    //   if (event.position < starttime) {
    //     player.seek(starttime);
    //   }
    // }
      
  }

  const onVideoLoad = event => {
    console.log('onVideoLoad', event);
    // jwInterval = setInterval(() => onShowMarkers(), 500);
  }

  // const onShowMarkers = () => {
  //   console.log('called showMarkers==>');
  //   const player = window.jwplayer('jw-player');
  //   if (player && typeof player.setMarkers === 'function' && player.getDuration() > 0) {
  //     console.log('players===>', player);
  //     clearInterval(jwInterval);
  //     const markers = [
  //       {
  //         startTime: 980,
  //         endTime: 1330,
  //         text: "title",
  //         color: '#0088FE',
  //       }
  //     ];
  //     player.setMarkers(markers);
  //   }
  // }

  // const onUpdateMarkers = () => {
  //   // const player = window.jwplayer('jw-player');
  //   if (player && typeof player.setMarkers === 'function') {
  //     const markers = [
  //       { startTime: 100, endTime: 600, text: "Marker 1", color: 'blue'},
  //       { startTime: 650, endTime: 900, text: "Marker 2", color: 'green' },
  //       { startTime: 950, endTime: 1800, text: "Marker 3", color: 'red' }
  //     ];
  //     console.log('update markers==>', markers);
  //     player.setMarkers(markers);
  //   }
  // }

  // const plugins = {
  //   'js/videomarkers-8.1.0.js': {
  //     editor: true,
  //     navigation: true,
  //   },
  // };

  const onNext = () => {
    player.next();
  }

  const onPrev = () => {
    player.playlistItem(index - 1);
  }

  const onPlay = i => {
    player.playlistItem(i);
  }

  React.useEffect(() => {
    player = window.jwplayer('jw-player');
  }, []);

  return (
    <div className="App" style={{width: '100%', textAlign: 'center', padding: 30}}>
      <h2>Test with Plain MP4 Videos in Playlist:</h2>
      <div>
        <ReactJWPlayer
          className="clip-jw-player"
          playerId="jw-player"
          playerScript="https://cdn.jwplayer.com/libraries/L2lWZS0f.js"
          playlist={playlist}
          // customProps={{ plugins }}
          isAutoPlay
          onReady={onReady}
          onVideoLoad={onVideoLoad}
          onTime={onTime}
        />
      </div>
      {/* <button onClick={onUpdateMarkers}>update markers</button> */}
      <div style={{marginTop: 30, textAlign: "left"}}>
        <button onClick={onPrev} style={{marginRight: 30}} disabled={index <= 0}>
          Prev
        </button>
        <button onClick={onNext} style={{marginRight: 30}} disabled={index >= playlist.length - 1}>
          Next
        </button>
      </div>
      <div style={{marginTop: 30, textAlign: "left"}}>
        <strong>Title of the playing video: </strong>
        <span>{title}</span>
      </div>
      <div style={{marginTop: 30}}>
        <ul>
          {playlist.map((item, i) => <li key={item.title} className={i === index ? 'is-playing' : ''} onClick={() => onPlay(i)}>
            {`${i + 1}: ${item.title}`}
          </li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
