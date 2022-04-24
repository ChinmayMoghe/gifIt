import { useEffect, useState } from 'react'
import style from './App.module.css';
import {createFFmpeg,fetchFile} from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({log:true});

function App() {
  const [ready,setReady] = useState(false);
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }
  const handleFileUpload= (ev) => {};
  useEffect(()=>{
    load();
  },[]);
  return (
    <div className={style.App}>
      <h1>GIF it</h1>
      {ready ? <><section className={style.video_upload}>
      </section>
      <section className={style.gif_result}></section></>:<>Loading...</>}
    </div>
  )
}

export default App
