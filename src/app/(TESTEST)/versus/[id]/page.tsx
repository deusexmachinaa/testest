'use client';

import { useEffect, useState } from 'react';
import GameComponent from './gameComponent';
// import { candidates } from '../../../../Data/dummyData';
// import { versusTestItems } from '@/Data/versusTeestItem';
import { supabase } from '@/supabaseClient';
import useCandidates from '@/app/Hooks/useCandidates';
import { useParams, usePathname } from 'next/navigation';

// export const generateStaticParams = async () => {
//   const { data: VersusItems } = await supabase.from('VersusItems').select();

//   const { data: Candidates } = await supabase.from('Candidates').select();
// };

export interface Candidate {
  id: number;
  imageUrl: string;
  name: string;
  versusItemId: number;
  rank: number | null;
}

const HomePage = () => {
  const pathName = useParams().id;
  const [candidates, setCandidates] = useState(null as Candidate[] | null);
  console.log(pathName);

  useEffect(() => {
    async function fetchGameElement() {
      const { data: candidates } = await supabase
        .from('Candidates')
        .select()
        .eq('versusItemId', pathName);
      setCandidates(candidates);
    }
    fetchGameElement();
  }, []);
  // const filteredCandidates = candidates?.filter((candidate) => candidate.versusItemId === 1);

  const [numOfRounds, setNumOfRounds] = useState<number>(() => {
    let maxRound = 2 ** Math.floor(Math.log2(candidates?.length ?? 0));
    return maxRound;
  });
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const renderRoundOptions = () => {
    const rounds = [];
    let round = 4;

    while (round < (candidates?.length ?? 0)) {
      rounds.unshift(
        <option key={round} value={round}>
          {round}강전
        </option>,
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
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center">
      {!isGameStarted && (
        <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
          <div className="flex justify-between items-center">
            <label htmlFor="numOfRounds" className="text-lg font-semibold text-gray-800">
              총 라운드 선택:
            </label>
            <select
              name="numOfRounds"
              onChange={handleNumOfRoundsChange}
              className="w-40 text-gray-800 bg-gray-200 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value=""> 라운드를 선택해주세요 </option>
              {renderRoundOptions()}
            </select>
          </div>
        </div>
      )}
      <GameComponent
        candidates={candidates!}
        numOfRounds={numOfRounds}
        onGameStart={handleGameStart}
      />
    </div>
  );
};

export default HomePage;
