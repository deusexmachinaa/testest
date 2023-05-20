// TestCard.tsx
import React from 'react';

interface TestCardProps {
  title: string;
  description?: string | null;
  children?: React.ReactNode;
}

const TestCard: React.FC<TestCardProps> = ({ title, description, children }) => {
  const paragraphs = description?.split('. ').map((sentence, index) => (
    <p key={index} className="py-2">
      {sentence}.
    </p>
  ));

  return (
    <div className="sm:w-[70vh] w-fit rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow transform">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {paragraphs}
      {children}
    </div>
  );
};

export default TestCard;
