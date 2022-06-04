import classNames from "classnames";
import { useRef } from "react";
import Cube from "../Cube";

const FileUploader = ({ onChange }) => {
  const cubeRef = useRef();
  const fileUploadRef = useRef();
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
    cubeRef.current.animate(squeezeKeyFrames, 150);
  };
  const handleClick = () => {
    fileUploadRef.current.click();
    squeezeAnim();
  };

  return (
    <>
      <Cube ref={cubeRef}>
        <button onClick={handleClick}>Upload file</button>
      </Cube>
      <input
        ref={fileUploadRef}
        style={{ display: "none" }}
        type="file"
        onChange={onChange}
      />
    </>
  );
};

export default FileUploader;
