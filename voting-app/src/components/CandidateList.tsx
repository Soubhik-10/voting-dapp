import React from "react";

interface Candidate {
  candidateAddress: string;
  name: string;
  symbol: string;
  desc: string;
  votes: bigint;
}

interface CandidateListProps {
  candidates: Candidate[];
  onVote: (candidateAddress: string) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({
  candidates,
  onVote,
}) => {
  return (
    <div className="candidate-list space-y-4 p-4 white-glassmorphism">
      {candidates.map((candidate) => (
        <div
          key={candidate.candidateAddress}
          className="flex items-center w-full justify-between p-4 bg-gray-800 rounded-md blue-glassmorphism shadow-md"
        >
          <div className="flex items-center w-96">
            <div
              className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center
             text-white text-sm font-bold"
            >
              {candidate.symbol}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-50">
                {candidate.name}
              </h2>
              <p className="text-gray-300">{candidate.desc}</p>
            </div>
          </div>
          <button
            onClick={() => onVote(candidate.candidateAddress)}
            className="bg-green-500 text-white py-2 px-4 mx-4 rounded-md hover:bg-green-600"
          >
            Vote
          </button>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
