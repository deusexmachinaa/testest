"use client";
import Image from "next/image";
import React, { useState } from "react";

export interface Candidate {
  id: number;
  name: string;
  imageUrl: string;
}

export interface GameComponentProps {
  candidates: Candidate[];
}

const GameComponent: React.FC<GameComponentProps> = ({ candidates }) => {
  const [round, setRound] = useState(0);
  const [currentPair, setCurrentPair] = useState<[Candidate, Candidate] | null>(
    null
  );
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);

  const startGame = () => {
    if (candidates.length < 2) {
      alert("최소 2명의 후보자가 필요합니다.");
      return;
    }
    setRound(1);
    setCurrentPair([candidates[0], candidates[1]]);
  };

  const handleSelection = (selected: Candidate) => {
    setSelectedCandidates([...selectedCandidates, selected]);

    if (selectedCandidates.length + 1 === candidates.length) {
      if (candidates.length === 2) {
        // 최종 결과 출력
        console.log("이상형 월드컵 결과:", selected);
      } else {
        // 다음 라운드로
        setRound(round + 1);
        setSelectedCandidates([]);
      }
      setCurrentPair(null);
      return;
    }

    const nextPairIndex = selectedCandidates.length + 1;
    setCurrentPair([candidates[nextPairIndex], candidates[nextPairIndex + 1]]);
  };

  return (
    <div className="container mx-auto">
      {round === 0 ? (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={startGame}
        >
          이상형 월드컵 시작하기
        </button>
      ) : (
        <>
          <h1 className="text-center text-2xl font-semibold mb-4">
            Round {round}
          </h1>
          {currentPair && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPair.map((candidate) => (
                <div
                  key={candidate.id}
                  className="border border-gray-300 rounded shadow-md p-4 cursor-pointer transform hover:scale-105 transition-transform"
                  onClick={() => handleSelection(candidate)}
                >
                  <img
                    className="mx-auto mb-2"
                    src={candidate.imageUrl}
                    alt={candidate.name}
                  />
                  <h2 className="text-center">{candidate.name}</h2>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default GameComponent;
