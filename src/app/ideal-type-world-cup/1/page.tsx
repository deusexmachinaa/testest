"use client";

import { useState } from "react";
import GameComponent from "./gameComponent";

const candidates11 = [
  {
    id: 1,
    name: "햄버거",
    imageUrl: "https://source.unsplash.com/1600x900/?burger",
  },
  {
    id: 2,
    name: "볶음밥",
    imageUrl: "https://source.unsplash.com/1600x900/?friedrice",
  },
  {
    id: 3,
    name: "파스타",
    imageUrl: "https://source.unsplash.com/1600x900/?pasta",
  },
  {
    id: 4,
    name: "라면",
    imageUrl: "https://source.unsplash.com/1600x900/?ramen",
  },
];

const candidates = [
  { id: 1, name: "후보자 1", imageUrl: "https://via.placeholder.com/150" },
  { id: 2, name: "후보자 2", imageUrl: "https://via.placeholder.com/150" },
  { id: 3, name: "후보자 3", imageUrl: "https://via.placeholder.com/150" },
  { id: 4, name: "후보자 4", imageUrl: "https://via.placeholder.com/150" },
  // ... 추가 후보자
];

const HomePage: React.FC = () => {
  const [numOfRounds, setNumOfRounds] = useState<number>(32);

  const handleNumOfRoundsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumOfRounds(parseInt(e.target.value));
  };

  return (
    <div className="container mx-auto">
      <div className="mx-4">
        <label htmlFor="numOfRounds">강전 선택: </label>
        <select
          name="numOfRounds"
          value={numOfRounds}
          onChange={handleNumOfRoundsChange}
        >
          <option value={2}>2강전</option>
          <option value={4}>4강전</option>
          <option value={8}>8강전</option>
          <option value={16}>16강전</option>
          <option value={32}>32강전</option>
          {/* 원하는 강전 추가 */}
        </select>
      </div>
      <GameComponent candidates={candidates} numOfRounds={numOfRounds} />
    </div>
  );
};

export default HomePage;
