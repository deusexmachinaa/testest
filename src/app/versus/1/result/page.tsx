import { Candidate } from "../gameComponent";

export interface ResultPageProps {
  winner: Candidate;
}

const ResultPage: React.FC<ResultPageProps> = ({ winner }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-semibold mb-8">우승자</h1>
      <div className="text-center">
        <img
          className="mx-auto mb-4 w-full h-96 object-cover object-center"
          src={winner?.imageUrl}
          alt={winner.name}
        />
        <h2 className="text-4xl font-semibold text-gray-700">{winner.name}</h2>
      </div>
    </div>
  );
};

export default ResultPage;
