import { useEffect, useState } from "react";
import style from "./App.module.css";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import If from "./components/If";
import FileUploader from "./components/FileUploader";
const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };
  const handleFileUpload = (ev) => {
    setVideo(ev.target.files?.[0]);
  };
  const convertToGif = async () => {
    // write the file to the memory
    try {
      ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));
      //Run the ffmpeg command
      await ffmpeg.run(
        "-i",
        "test.mp4",
        "-t",
        "2.5",
        "-ss",
        "2.0",
        "-f",
        "gif",
        "out.gif"
      );

      const data = ffmpeg.FS("readFile", "out.gif");
      const image = new Blob([data.buffer], { type: "image/gif" });
      const url = URL.createObjectURL(image);
      setGif(url);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    load();
  }, []);
  return (
    <div className={style.App}>
      <header className={style.title}>
        <h1>GIF it</h1>
      </header>
      <If condition={ready}>
        <section className={style.video_upload}>
          <If condition={video}>
            <div>
              <video
                controls
                width={250}
                src={video ? URL.createObjectURL(video) : ""}
              />
            </div>
          </If>
          <div className={style.controls}>
            <FileUploader onChange={handleFileUpload} />
            <If condition={video}>
              <button onClick={convertToGif}>Convert</button>
            </If>
          </div>
        </section>
        <section className={style.gif_result}>
          <If condition={gif}>
            <img width={250} src={gif} />
          </If>
        </section>
      </If>
      <If condition={!ready}>Loading...</If>
    </div>
  );
}

export default App;
