import { useEffect, useState } from 'react'
import style from './App.module.css';
import {createFFmpeg,fetchFile} from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({log:true});

function App() {
  const [ready,setReady] = useState(false);
  const [video,setVideo] = useState();
  const [gif,setGif] = useState();
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }
  const handleFileUpload= (ev) => {
    setVideo(ev.target.files?.[0])
  };
  const convertToGif = async()=>{
    // write the file to the memory
    try{
    ffmpeg.FS('writeFile','test.mp4',await fetchFile(video));
    //Run the ffmpeg command
    await ffmpeg.run('-i','test.mp4','-t','2.5','-ss','2.0','-r','10','-f','gif','out.gif');

    const data = ffmpeg.FS('readFile','out.gif');
    const image = new Blob([data.buffer],{type:'image/gif'});
    const url = URL.createObjectURL(image);
    setGif(url);
    } catch(e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    load();
  },[]);
  return (
    <div className={style.App}>
      <h1>GIF it</h1>
      {ready ? <><section className={style.video_upload}>
        <div>
          {video && <video controls width={250} src={URL.createObjectURL(video)}></video>}
        </div>
        <input type='file' onChange={handleFileUpload}/>
      </section>
      <section className={style.gif_result}>
        <button onClick={convertToGif}>Convert</button>
        {gif && <img width={250} src={gif}/>}
        </section></>:<>Loading...</>}
    </div>
  )
}

export default App
