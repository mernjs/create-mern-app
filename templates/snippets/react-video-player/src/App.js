// src/App.js
import React from 'react';
import VideoPlayer from './VideoPlayer';

const App = () => {
  // Define the video URL
  const videoUrl = 'https://rr2---sn-npoeenee.googlevideo.com/videoplayback?expire=1722821208&ei=-NWvZpvAMr6B6dsPnOS8uQM&ip=154.92.120.176&id=o-AMDcb3ECq3lvmNfA1XCyMKXh4DqcNwDEpVUuMGBt7w_v&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AXc671IOgyr2n2B15-svTFKu39KT8Y5w-B37TyHfNhUJGZxmDZlGViBPLmbbzlKZStZPLK25VeiQc0zL&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=10872258&ratebypass=yes&dur=491.868&lmt=1699779496579679&c=ANDROID_CREATOR&txp=5319224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgUcYR6SeP5m8MUXjis5f-oqEH6pinwq2NfWyrWbxgDSsCIFUJFnt6Ls5QeKHz_gPj9zWbKWnmp9LtEUDag3VjYYTD&title=1.%20Introduction%20to%20Angular%2017.%20New%20Features%20of%20Angular%20and%20new%20documentation%20-%20Angular%2017&rm=sn-4g5ezd7s&rrc=104,80&fexp=24350516,24350517,24350556&req_id=3f2cc0be9e1aa3ee&ipbypass=yes&redirect_counter=2&cm2rm=sn-ab5eey7z&cms_redirect=yes&cmsv=e&mh=HR&mip=103.44.54.238&mm=34&mn=sn-npoeenee&ms=ltu&mt=1722797938&mv=u&mvi=2&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AGtxev0wRQIgdkQkUpm83mg8JIOX8oaQQoSGhYE-AOP4wxv2_yEgyNACIQD9grIKLmShinwjiiaveAlBPAbYBLVs6y5h6gt0FDPZmg%3D%3D';

  // Define segments with start and end times in seconds
  const segments = [
    { start: 0, end: 10 },  // Segment 1: 0s to 10s
    { start: 10, end: 20 }, // Segment 2: 10s to 20s
    { start: 20, end: 200 }, // Segment 2: 20s to 200s
    { start: 200, end: 400 }, // Segment 2: 20s to 200s
    // Add more segments as needed
  ];

  const handleSegmentEnd = (segmentIndex) => {
    console.log(`Segment ${segmentIndex + 1} ended.`);
    // You can add additional logic here, like showing a message or changing the UI
  };

  return (
    <div className="App">
      <h1>Video Player</h1>
      <VideoPlayer url={videoUrl} segments={segments} onSegmentEnd={handleSegmentEnd} />
    </div>
  );
};

export default App;
