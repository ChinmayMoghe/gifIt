import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import style from "./style.module.css";
import classNames from "classnames";
const Cube = ({ children }) => {
  const cubeRef = useRef();
  const sizeRef = useRef();
  const resizeObserver = useRef(
    new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      console.log("%cindex.jsx line:9 {width,height}", "color: #007acc;", {
        width,
        height,
      });
      setBorderBoxSize();
    })
  );
  const setBorderBoxSize = (element) => {
    const widthWithPadding = sizeRef.current.offsetWidth;
    const heightWithPadding = sizeRef.current.offsetHeight;
    cubeRef.current.style.setProperty("--cube-width", `${widthWithPadding}px`);
    cubeRef.current.style.setProperty(
      "--cube-height",
      `${heightWithPadding}px`
    );
  };
  useEffect(() => {
    if (sizeRef.current) {
      resizeObserver.current.observe(sizeRef.current);
    }
    return () => {
      resizeObserver.current.unobserve(sizeRef.current);
    };
  }, []);
  useLayoutEffect(() => {
    setBorderBoxSize();
  }, []);
  return (
    <div ref={cubeRef} className={style.cube_container}>
      <div
        ref={sizeRef}
        className={classNames(style.cube_face, style.front_face)}
      >
        {children}
      </div>
      <div className={classNames(style.cube_face, style.back_face)}></div>
      <div className={classNames(style.cube_face, style.top_face)}></div>
      <div className={classNames(style.cube_face, style.bottom_face)}></div>
      <div className={classNames(style.cube_face, style.right_face)}></div>
      <div className={classNames(style.cube_face, style.left_face)}></div>
    </div>
  );
};

export default Cube;
