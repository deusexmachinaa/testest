"use client";
import React, { useState, useEffect, useRef } from "react";

function ReactionTest() {
  const [status, setStatus] = useState<"waiting" | "ready" | "clicked">(
    "waiting"
  );
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState<number[]>([]);

  const startTime = useRef(0);
  const endTime = useRef(0);

  useEffect(() => {
    if (status === "ready") {
      const timerId = setTimeout(() => {
        setStatus("clicked");
        setMessage("지금 클릭하세요!");
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 뒤에 변경

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [status]);

  const onClickScreen = () => {
    if (status === "waiting") {
      setStatus("ready");
      setMessage("초록색이 되면 클릭하세요");
      startTime.current = new Date().getTime();
    } else if (status === "ready") {
      setStatus("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
    } else if (status === "clicked") {
      endTime.current = new Date().getTime();
      setStatus("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prevResult) => [
        ...prevResult,
        endTime.current - startTime.current,
      ]);
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };

  return (
    <>
      <div
        id="screen"
        style={{
          width: "100%",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: status === "ready" ? "green" : "white",
          color: status === "ready" ? "white" : "black",
        }}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
}

export default ReactionTest;
