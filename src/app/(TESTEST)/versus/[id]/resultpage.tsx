import { Candidate } from './gameComponent';

interface ResultPageProps {
  winner: Candidate | null;
}

export default function ResultPage({ winner }: ResultPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-semibold mb-8">우승자</h1>
      <div className="text-center">
        <img
          className="mx-auto mb-4 w-full h-96 object-cover object-center"
          src={winner?.imageUrl}
          alt={winner?.name}
        />
        <h2 className="text-4xl font-semibold text-gray-700">{winner?.name}</h2>
      </div>
      <button onClick={() => window.location.reload()}>재시작</button>
    </div>
  );
}
