"use client";

import { useState } from "react";
import GameComponent from "./gameComponent";
import { candidates } from "../dummyData";
import { versusTestItems } from "@/Data/versusTeestItem";



//todo: candidates,TestItems 를 db에서 가져오기
//candidates 를 TestItems랑 매칭하기

export const generateStaticParams = async () => versusTestItems.map((item) => ({ id: item.index }))


const HomePage: React.FC = () => {
  const [numOfRounds, setNumOfRounds] = useState<number>(() => {
    let maxRound = 2 ** Math.floor(Math.log2(candidates.length));
    return maxRound;
  });
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const renderRoundOptions = () => {
    const rounds = [];
    let round = 4;

    while (round < candidates.length) {
      rounds.push(
        <option key={round} value={round}>
          {round}강전
        </option>
      );
      round *= 2;
    }

    return rounds;
  };

  const handleNumOfRoundsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumOfRounds(parseInt(e.target.value));
  };

  const handleGameStart = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      {!isGameStarted && (
        <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
          <div className="flex justify-between items-center">
            <label
              htmlFor="numOfRounds"
              className="text-lg font-semibold text-gray-800"
            >
              총 라운드 선택:
            </label>
            <select
              name="numOfRounds"
              value={numOfRounds}
              onChange={handleNumOfRoundsChange}
              className="w-40 text-gray-800 bg-gray-200 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {/* 원하는 강전 추가 */}
              {renderRoundOptions()}
            </select>
          </div>
        </div>
      )}
      <GameComponent
        candidates={candidates}
        numOfRounds={numOfRounds}
        onGameStart={handleGameStart}
      />
    </div>
  );
};

export default HomePage;
