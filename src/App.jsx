import { useEffect, useRef, useState } from "react";
import style from "./App.module.css";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import If from "./components/If";
import FileUploader from "./components/FileUploader";
import Cube from "./components/Cube";
import classNames from "classnames";
const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState("");
  const convertBtnCubeRef = useRef();
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };
  const handleFileUpload = (ev) => {
    console.log("%cApp.jsx line:20 ev.target.files", "color: #007acc;", ev);
    setVideo(ev.target.files?.[0]);
    setGif("");
  };

  const squeezeAnim = () => {
    const squeezeKeyFrames = [
      {
        transform: "rotateY(30deg) scale(1)",
        easing: "ease-in-out",
      },
      {
        transform: "rotateY(30deg) translateZ(-50px) scale(0.5)",
        easing: "ease-in-out",
      },
    ];
    convertBtnCubeRef.current.animate(squeezeKeyFrames, 150);
  };

  const convertToGif = async () => {
    squeezeAnim();
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
      <header className={classNames(style.title, style.iso_container)}>
        <Cube>
          <h1 style={{ padding: "2rem" }}>GIF it</h1>
        </Cube>
      </header>

      <If condition={ready}>
        <section
          className={classNames(style.video_upload, style.iso_container)}
        >
          <Cube>
            <p style={{ padding: "2rem" }}>
              Upload video file to convert to animated gif
            </p>
          </Cube>
          <If condition={video}>
            <Cube>
              <video
                controls
                width={400}
                src={video ? URL.createObjectURL(video) : ""}
              />
            </Cube>
          </If>
        </section>
        <div className={classNames(style.controls, style.iso_container)}>
          <FileUploader onChange={handleFileUpload} />
          <If condition={video}>
            <Cube ref={convertBtnCubeRef}>
              <button onClick={convertToGif}>Convert</button>
            </Cube>
          </If>
        </div>
        <section className={classNames(style.gif_result, style.iso_container)}>
          <If condition={gif}>
            <Cube yangle={-30}>
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
