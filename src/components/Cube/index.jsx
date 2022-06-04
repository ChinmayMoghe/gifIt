import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import style from "./style.module.css";
import classNames from "classnames";
const Cube = forwardRef(({ children, xangle = 0, yangle = 30 }, ref) => {
  const cubeRef = useRef();
  const sizeRef = useRef();
  const resizeObserver = useRef(
    new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setBorderBoxSize();
    })
  );
  const setBorderBoxSize = () => {
    if (sizeRef.current) {
      const widthWithPadding = sizeRef.current.offsetWidth;
      const heightWithPadding = sizeRef.current.offsetHeight;
      cubeRef.current.style.setProperty(
        "--cube-width",
        `${widthWithPadding}px`
      );
      cubeRef.current.style.setProperty(
        "--cube-height",
        `${heightWithPadding}px`
      );
    }
  };
  const setAngles = () => {
    if (cubeRef && cubeRef.current) {
      cubeRef.current.style.setProperty("--cube-x-angle", `${xangle}deg`);
      cubeRef.current.style.setProperty("--cube-y-angle", `${yangle}deg`);
    }
  };

  useEffect(() => {
    if (ref) {
      ref.current = cubeRef?.current;
    }
  }, [ref?.current, cubeRef?.current]);
  useEffect(() => {
    if (sizeRef.current) {
      resizeObserver.current.observe(sizeRef.current);
    }
    return () => {
      if (sizeRef.current) {
        resizeObserver.current.unobserve(sizeRef.current);
      }
    };
  }, []);
  useLayoutEffect(() => {
    setBorderBoxSize();
    setAngles();
  }, []);
  return (
    <div
      ref={cubeRef}
      className={classNames(style.cube_container, style.three_d)}
    >
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
});

export default Cube;
