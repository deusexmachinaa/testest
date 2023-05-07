"use client";

import { useState } from "react";
import GameComponent from "./gameComponent";
import { candidates } from "../dummyData";

const HomePage: React.FC = () => {
  const [numOfRounds, setNumOfRounds] = useState<number>(32);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const handleNumOfRoundsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumOfRounds(parseInt(e.target.value));
  };

  const handleGameStart = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="container mx-auto">
      {!isGameStarted && (
        <div className="mx-4">
          <label htmlFor="numOfRounds">총 라운드 선택: </label>
          <select
            name="numOfRounds"
            value={numOfRounds}
            onChange={handleNumOfRoundsChange}
            className=" text-gray-800"
          >
            <option value={2}>2강전</option>
            <option value={4}>4강전</option>
            <option value={8}>8강전</option>
            <option value={16}>16강전</option>
            <option value={32}>32강전</option>
            {/* 원하는 강전 추가 */}
          </select>
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
