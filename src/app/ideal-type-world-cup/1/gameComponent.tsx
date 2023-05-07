"use client";

import React, { useRef, useState } from "react";

interface Candidate {
  id: number;
  name: string;
  imageUrl: string;
}

interface GameComponentProps {
  candidates: Candidate[];
  numOfRounds: number;
}

interface CandidatePair {
  first: Candidate;
  second: Candidate;
}

const GameComponent: React.FC<GameComponentProps> = ({
  candidates,
  numOfRounds,
}) => {
  const [currentRound, setCurrentRound] = useState(numOfRounds);
  const [currentPair, setCurrentPair] = useState<CandidatePair | null>(null);
  const [roundPairs, setRoundPairs] = useState<CandidatePair[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [nextPairIndex, setNextPairIndex] = useState(0);
  const winners = useRef([] as Candidate[]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [showSelectedCandidate, setShowSelectedCandidate] = useState(false);

  const startGame = () => {
    if (candidates.length < 2) {
      alert("최소 2명의 후보자가 필요합니다.");
      return;
    }
    if (numOfRounds > candidates.length) {
      alert(`최대 ${candidates.length} 강전까지만 가능합니다.`);
      return;
    }
    setGameStarted(true);
    setCurrentRound(numOfRounds);

    const shuffledCandidates = shuffleArray(candidates.slice(0, numOfRounds));
    const initialPairs = createPairs(shuffledCandidates);
    setRoundPairs(initialPairs);
    setCurrentPair(initialPairs[0]);
  };

  const shuffleArray = (array: Candidate[]): Candidate[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  const createPairs = (items: Candidate[]): CandidatePair[] => {
    const pairs = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push({ first: items[i], second: items[i + 1] });
    }
    return pairs;
  };

  const handleSelection = (selected: Candidate) => {
    // 다음 라운드로 진출한 후보를 저장
    winners.current.push(selected);

    setNextPairIndex((nextPairIndex) => nextPairIndex + 1);

    if (nextPairIndex < roundPairs.length - 1) {
      //처음엔 handleSelection이 실행되지 않아서 nextPairIndex를 +1 해줘야함.
      setCurrentPair(roundPairs[nextPairIndex + 1]);
    } else {
      // 다음 라운드로 이동
      if (roundPairs.length < 2) {
        // 최종 결과 출력
        console.log("이상형 월드컵 결과:", selected);
        setGameStarted(false);
        setCurrentPair(null);
        winners.current = [] as Candidate[];
        return;
      }
      setNextPairIndex(0);
      setCurrentRound((currentRound) => currentRound / 2);
      const nextRoundPairs = createPairs(winners.current);
      setRoundPairs(nextRoundPairs);
      setCurrentPair(nextRoundPairs[0]);
      console.log("다음 라운드시작");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!gameStarted ? (
        <>
          <li>{candidates.length}명의 후보가 있습니다.</li>
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={startGame}
          >
            이상형 월드컵 시작하기
          </button>
        </>
      ) : (
        <>
          <h1 className="text-center text-2xl font-semibold mb-4">
            {currentRound === 2 ? "결승" : currentRound + " 강"}
          </h1>
          {currentPair && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {([currentPair.first, currentPair.second] as Candidate[]).map(
                (candidate: Candidate) => (
                  <div
                    key={candidate.id}
                    className="border border-gray-300 rounded shadow-md p-4 cursor-pointer transform hover:scale-105 transition-transform"
                    onClick={() => handleSelection(candidate)}
                  >
                    <img
                      className="mx-auto mb-2"
                      src={candidate?.imageUrl}
                      alt={candidate?.name}
                    />
                    <h2 className="text-center">{candidate.name}</h2>
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameComponent;
