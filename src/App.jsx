import { useEffect, useRef, useState } from "react";
import style from "./App.module.css";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import If from "./components/If";
import FileUploader from "./components/FileUploader";
import Cube from "./components/Cube";
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
        "-ss",
        "5",
        "-t",
        "2",
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
        <Cube>
          <h1 style={{ padding: "2rem" }}>GIF it</h1>
        </Cube>
      </header>

      <If condition={ready}>
        <Cube>
          <section className={style.video_upload}>
            <p>Upload video file to convert to animated gif</p>
            <If condition={video}>
              <div>
                <video
                  controls
                  width={400}
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
        </Cube>
        <section className={style.gif_result}>
          <If condition={gif}>
            <Cube>
              <img width={250} src={gif} />
            </Cube>
          </If>
        </section>
      </If>
      <If condition={!ready}>Loading...</If>
    </div>
  );
}

export default App;
