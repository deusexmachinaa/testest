"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const items = [
  {
    name: "햄버거",
    src: "https://source.unsplash.com/1600x900/?reaction",
  },
  {
    name: "볶음밥",
    src: "https://source.unsplash.com/1600x900/?reaction",
  },
  {
    name: "파스타",
    src: "https://source.unsplash.com/1600x900/?reaction",
  },
  {
    name: "라면",
    src: "https://source.unsplash.com/1600x900/?reaction",
  },
];

type Food = {
  name: string;
  src: string;
};

export const Game: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [displays, setDisplays] = useState<Food[]>([]);
  const [winners, setWinners] = useState<Food[]>([]);

  useEffect(() => {
    items.sort(() => Math.random() - 0.5);
    setFoods(items);
    setDisplays([items[0], items[1]]);
  }, []);

  const clickHandler = (food: Food) => () => {
    if (foods.length <= 2) {
      if (winners.length === 0) {
        setDisplays([food]);
      } else {
        let updatedFood = [...winners, food];
        setFoods(updatedFood);
        setDisplays([updatedFood[0], updatedFood[1]]);
        setWinners([]);
      }
    } else if (foods.length > 2) {
      setWinners([...winners, food]);
      setDisplays([foods[2], foods[3]]);
      setFoods(foods.slice(2));
    }
  };

  return (
    <div className="flex flex-wrap h-screen relative">
      <h1 className="title absolute z-10 top-0 left-1/2 transform -translate-x-1/2 bg-white px-8 text-uppercase pb-2">
        Favorite Worldcup
      </h1>
      {displays.map((d) => {
        return (
          <div
            className="flex-1 overflow-hidden bg-black relative"
            key={d.name}
            onClick={clickHandler(d)}
          >
            <Image
              className="food-img w-full h-full transition duration-500 ease-in-out cursor-pointer hover:scale-110 hover:opacity-80"
              src={d.src}
              alt={d.name}
            />
            <div className="name absolute z-20 text-white bottom-10 text-6xl left-1/2 transform -translate-x-1/2">
              {d.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
