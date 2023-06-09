'use client';

import React, { useEffect, useRef, useState } from 'react';
import ResultPage from './resultpage';
import useCandidates from '@/app/Hooks/useCandidates';
import { usePathname } from 'next/navigation';
import { supabase } from '@/supabaseClient';
import { toast } from 'react-hot-toast';

export interface Candidate {
  id: number;
  imageUrl: string;
  name: string;
  versusItemId: number;
  rank: number | null;
}

interface GameComponentProps {
  numOfRounds: number;
  onGameStart: () => void;
  candidates: Candidate[];
}

interface CandidatePair {
  first: Candidate;
  second: Candidate;
}

const GameComponent = ({ numOfRounds, onGameStart, candidates }: GameComponentProps) => {
  const rawPathName = usePathname();
  const pathName = rawPathName.split('/')[1];
  // const [candidates, setCandidates] = useState(candidate);

  // useEffect(() => {
  //   async function fetchGameElement() {
  //     const { data: candidates } = await supabase.from('Candidates').select();
  //     setCandidates(candidates);
  //   }
  //   fetchGameElement();
  // }, []);

  // const { candidates, isLoading, isError } = useCandidates();
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);
  const [currentRound, setCurrentRound] = useState(numOfRounds);
  const [currentPair, setCurrentPair] = useState<CandidatePair | null>(null);
  const [roundPairs, setRoundPairs] = useState<CandidatePair[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [nextPairIndex, setNextPairIndex] = useState(0);
  const winners = useRef([] as Candidate[]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    candidates ? candidates[0] : null,
  );
  const [showSelectedCandidate, setShowSelectedCandidate] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState<Candidate | null>(candidates ? candidates[0] : null);

  const startGame = () => {
    if (numOfRounds === 0) {
      toast.error('후보가 없어요');
      return;
    }
    if (!candidates) {
      toast.error('후보가 없어요');
      return;
    }
    if (candidates!.length < 2) {
      toast.error('최소 2명의 후보자가 필요해요.');
      return;
    }
    if (numOfRounds > candidates!.length) {
      toast.error(`최대 ${candidates!.length} 강전까지만 가능해요`);
      return;
    }
    onGameStart();
    setGameStarted(true);
    setCurrentRound(numOfRounds);

    const shuffledCandidates = shuffleArray(candidates).slice(0, numOfRounds);
    const initialPairs = createPairs(shuffledCandidates);
    setRoundPairs(initialPairs);
    setCurrentPair(initialPairs[0]);
    setTimeout(() => {
      window.scrollTo(window.innerHeight / 2, window.innerHeight);
    }, 0);
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
    // 선택한 후보를 저장하고 전체 화면에 표시
    setSelectedCandidate(selected);
    setShowSelectedCandidate(true);

    // 1초 후에 원래 로직을 실행
    setTimeout(() => {
      // 전체 화면에서 선택한 후보를 숨김
      setShowSelectedCandidate(false);

      // 다음 라운드로 진출한 후보를 저장
      winners.current.push(selected);
      setNextPairIndex((nextPairIndex) => nextPairIndex + 1);

      if (nextPairIndex < roundPairs.length - 1) {
        // 처음엔 handleSelection이 실행되지 않아서 nextPairIndex를 +1 해줘야함.
        setCurrentPair(roundPairs[nextPairIndex + 1]);
      } else {
        // 다음 라운드로 이동
        if (roundPairs.length < 2) {
          // 최종 결과 출력
          console.log('이상형 월드컵 결과:', selected);
          setGameStarted(false);
          setCurrentPair(null);
          winners.current = [] as Candidate[];
          setWinner(selected);
          setGameEnded(true);
          return;
        }
        setNextPairIndex(0);
        setCurrentRound((currentRound) => currentRound / 2);
        const nextRoundPairs = createPairs(winners.current);
        setRoundPairs(nextRoundPairs);
        setCurrentPair(nextRoundPairs[0]);
        console.log('다음 라운드시작');
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 선택한 후보를 화면 전체에 표시하는 컴포넌트 */}
      {selectedCandidate && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-1000 ease-in z-50"
          style={{
            zIndex: 10,
            backgroundColor: showSelectedCandidate ? 'black' : 'transparent',
            opacity: showSelectedCandidate ? 1 : 0,
            pointerEvents: showSelectedCandidate ? 'auto' : 'none',
          }}
        >
          <div
            className="text-center transition-transform duration-2000 ease-in"
            style={{
              transform: showSelectedCandidate ? 'scale(1)' : 'scale(0.5)',
            }}
          >
            <img
              className="mx-auto mb-4 w-full h-[90vh] object-cover object-center"
              src={selectedCandidate.imageUrl}
              alt={selectedCandidate.name}
            />
            <h2 className="text-4xl font-semibold text-gray-700">{selectedCandidate.name}</h2>
          </div>
        </div>
      )}
      {/* 게임이 끝났을 때 결과를 보여주는 컴포넌트 */}
      {gameEnded && <ResultPage winner={winner} />}
      {/* 게임이 시작되지 않았을 때 보여주는 컴포넌트 */}
      {!gameEnded && !gameStarted ? (
        <div className="flex flex-col items-center mt-8">
          <ul className="mb-4 text-lg font-semibold text-gray-700 dark:text-white">
            <li>{candidates ? candidates.length : 0}명의 후보가 있습니다.</li>
          </ul>
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={startGame}
          >
            이상형 월드컵 시작하기
          </button>
        </div>
      ) : (
        <>
          {!gameEnded && (
            <h1 className="text-center text-2xl font-semibold text-gray-700 dark:text-white z-10 absolute top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {currentRound === 2 ? '결승' : currentRound + ' 강'}
            </h1>
          )}
          {!gameEnded && currentPair && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {([currentPair.first, currentPair.second] as Candidate[]).map(
                (candidate: Candidate) => (
                  <div
                    key={candidate.id}
                    className="rounded shadow-md p-4 cursor-pointer transform hover:scale-105 transition-transform h-[90vh] dark:bg-black"
                    onClick={() => handleSelection(candidate)}
                  >
                    <img
                      className="mx-auto mb-2 h-full w-fit "
                      src={candidate?.imageUrl}
                      alt={candidate?.name}
                    />
                    <h2 className="text-center text-white outline-1 1px 1px text-lg z-10 absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {candidate.name}
                    </h2>
                  </div>
                ),
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameComponent;
