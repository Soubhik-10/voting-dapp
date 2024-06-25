//SPDX-License-Identifier:MIT
pragma solidity ^0.8.26;

error VotingSystem_Not_A_Voter();
error VotingSystem_Not_A_VotingInspector();
error VotingSystem_NotOwner();
error VotingSystem_VoteEnded();
error VotingSystem_VoteNotStarted();
error VotingSystem_AlreadyVoted();
error VotingSystem_VoteNotEnded();

contract VotingSystem {
    address private immutable i_owner;
    uint256 private endTime;
    uint256 noOfVoters;

    struct Candidate {
        address candidateAddress;
        string name;
        string symbol;
        string desc;
        uint256 votes;
    }
    Candidate[] candidates;

    mapping(address => bool) public isVoter;
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public isInspector;
    mapping(address => uint256) public noOfVotes;

    constructor() {
        i_owner = msg.sender;
        isInspector[i_owner] = true;
        isVoter[i_owner] = true;
    }

    function addCandidates(
        address _candidateAddress,
        string memory _name,
        string memory _symbol,
        string memory _desc
    ) public onlyInspector {
        if (!isVoter[_candidateAddress]) revert VotingSystem_Not_A_Voter();
        candidates.push(Candidate(_candidateAddress, _name, _symbol, _desc, 0));
    }

    function addInspector(address _inspector) public onlyOwner {
        isInspector[_inspector] = true;
        isVoter[_inspector] = true;
    }

    function addVoters(address _voter) public onlyInspector {
        isVoter[_voter] = true;
    }

    function startVote(uint256 time) public onlyOwner {
        endTime = time + block.timestamp;
        noOfVoters = 0;
    }

    function vote(address toBeVoted) public {
        //checks all the conditions
        if (!isVoter[msg.sender]) revert VotingSystem_Not_A_Voter();
        if (block.timestamp > endTime) revert VotingSystem_VoteEnded();
        if (endTime == 0) revert VotingSystem_VoteEnded();
        if (hasVoted[msg.sender]) revert VotingSystem_AlreadyVoted();

        noOfVotes[toBeVoted] += 1;
        noOfVoters++;
        hasVoted[msg.sender] = true;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    //sets the number of votes and returns the candidates array
    function getResults() public returns (Candidate[] memory) {
        if (block.timestamp < endTime) revert VotingSystem_VoteNotEnded();
        for (uint256 i = 0; i < candidates.length; i++) {
            candidates[i].votes = noOfVotes[candidates[i].candidateAddress];
        }
        return candidates;
    }

    function getRemainingTime() public view returns (uint256) {
        return (endTime - block.timestamp);
    }

    function getNoOfVotes() public view returns (uint256) {
        return noOfVoters;
    }

    //Modifiers to check that no one from outside can add fake voters or candidates
    modifier onlyOwner() {
        if (msg.sender != i_owner) revert VotingSystem_NotOwner();
        _;
    }
    modifier onlyInspector() {
        if (!isInspector[msg.sender]) revert VotingSystem_NotOwner();
        _;
    }
}
