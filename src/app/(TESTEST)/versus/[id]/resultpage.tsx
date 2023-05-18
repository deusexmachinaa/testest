import { Candidate } from './gameComponent';

interface ResultPageProps {
  winner: Candidate | null;
}

export default function ResultPage({ winner }: ResultPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-semibold mb-8">{winner?.name}👏</h1>
      <div className="text-center">
        <img
          className="mx-auto mb-4 w-fit h-[80vh] object-cover object-center"
          src={winner?.imageUrl}
          alt={winner?.name}
        />
      </div>
      <button onClick={() => window.location.reload()}>재시작</button>
    </div>
  );
}
