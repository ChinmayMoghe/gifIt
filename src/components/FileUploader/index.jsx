import { useRef } from "react";

const FileUploader = ({ onChange }) => {
  const fileUploadRef = useRef();
  const handleClick = () => {
    fileUploadRef.current.click();
  };

  return (
    <>
      <button onClick={handleClick}>Upload file</button>
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
