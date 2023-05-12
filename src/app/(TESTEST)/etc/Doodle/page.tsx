"use client";
import Head from "next/head";
import { useEffect, useState } from "react";

const Doodle: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  // 로컬 스토리지에서 낙서장을 불러오는 함수
  const loadLogsFromLocalStorage = () => {
    const storedLogs = localStorage.getItem("devlogs");
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  };

  useEffect(() => {
    loadLogsFromLocalStorage();
  }, []);

  //추가
  const handleAddLog = () => {
    const newLog = prompt("새 낙서를 입력해주세요.");
    if (newLog) {
      const updatedLogs = [...logs, newLog];
      setLogs(updatedLogs);
      localStorage.setItem("devlogs", JSON.stringify(updatedLogs));
    }
  };

  //삭제
  const handleDeleteLog = (indexToDelete: number) => {
    const updatedLogs = logs.filter((_, index) => index !== indexToDelete);
    setLogs(updatedLogs);
    localStorage.setItem("devlogs", JSON.stringify(updatedLogs));
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center ">
      <Head>
        <title>낙서장</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 w-full max-w-3xl bg-white rounded-xl shadow-md flex flex-col items-center justify-center text-gray-800">
        <h1 className="text-3xl mb-4 ">낙서장</h1>
        <button
          onClick={handleAddLog}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4 "
        >
          새 낙서 추가
        </button>
        <ul className="list-none w-full px-4">
    {logs.map((log, index) => (
      <li key={index} className="mb-2 flex items-center flex-nowrap">
        <div className="flex-grow mr-4 max-w-xl">{log}</div>
        <button
          onClick={() => handleDeleteLog(index)}
          className="bg-red-500 text-white rounded-lg px-2 py-1 min-w-[48px]"
        >
          삭제
        </button>
      </li>
    ))}
  </ul>
      </main>
    </div>
  );
};

export default Doodle;
