// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CipherCouncil is SepoliaConfig {
    using FHE for *;
    
    struct Proposal {
        euint32 proposalId;
        euint32 votesFor;
        euint32 votesAgainst;
        euint32 totalVotes;
        bool isActive;
        bool isExecuted;
        string title;
        string description;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        bytes32 proposalHash;
    }
    
    struct Vote {
        euint32 voteId;
        ebool voteChoice; // true for yes, false for no
        address voter;
        uint256 timestamp;
        euint32 votingPower;
    }
    
    struct Member {
        euint32 memberId;
        euint32 votingPower;
        euint32 reputation;
        bool isActive;
        address memberAddress;
        uint256 joinTime;
        string role;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => Vote) public votes;
    mapping(address => Member) public members;
    mapping(address => euint32) public memberReputation;
    mapping(address => euint32) public memberVotingPower;
    
    uint256 public proposalCounter;
    uint256 public voteCounter;
    uint256 public memberCounter;
    
    address public owner;
    address public verifier;
    euint32 public totalMembers;
    euint32 public quorumThreshold;
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed voteId, uint256 indexed proposalId, address indexed voter);
    event ProposalExecuted(uint256 indexed proposalId, bool success);
    event MemberAdded(address indexed member, string role);
    event MemberRemoved(address indexed member);
    event ReputationUpdated(address indexed member, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        quorumThreshold = FHE.asEuint32(30); // 30% quorum threshold
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyMember() {
        require(members[msg.sender].memberAddress != address(0), "Only members can call this function");
        _;
    }
    
    function addMember(
        address _memberAddress,
        string memory _role,
        uint32 _initialVotingPower
    ) public onlyOwner returns (uint256) {
        require(members[_memberAddress].memberAddress == address(0), "Member already exists");
        
        uint256 memberId = memberCounter++;
        
        members[_memberAddress] = Member({
            memberId: FHE.asEuint32(0), // Will be set properly later
            votingPower: FHE.asEuint32(_initialVotingPower),
            reputation: FHE.asEuint32(100), // Initial reputation
            isActive: true,
            memberAddress: _memberAddress,
            joinTime: block.timestamp,
            role: _role
        });
        
        memberVotingPower[_memberAddress] = FHE.asEuint32(_initialVotingPower);
        memberReputation[_memberAddress] = FHE.asEuint32(100);
        
        totalMembers = FHE.add(totalMembers, FHE.asEuint32(1));
        
        emit MemberAdded(_memberAddress, _role);
        return memberId;
    }
    
    function removeMember(address _memberAddress) public onlyOwner {
        require(members[_memberAddress].memberAddress != address(0), "Member does not exist");
        
        members[_memberAddress].isActive = false;
        totalMembers = FHE.sub(totalMembers, FHE.asEuint32(1));
        
        emit MemberRemoved(_memberAddress);
    }
    
    function createProposal(
        string memory _title,
        string memory _description,
        uint256 _duration
    ) public onlyMember returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 proposalId = proposalCounter++;
        
        proposals[proposalId] = Proposal({
            proposalId: FHE.asEuint32(0), // Will be set properly later
            votesFor: FHE.asEuint32(0),
            votesAgainst: FHE.asEuint32(0),
            totalVotes: FHE.asEuint32(0),
            isActive: true,
            isExecuted: false,
            title: _title,
            description: _description,
            proposer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            proposalHash: keccak256(abi.encodePacked(_title, _description, msg.sender, block.timestamp))
        });
        
        emit ProposalCreated(proposalId, msg.sender, _title);
        return proposalId;
    }
    
    function castVote(
        uint256 proposalId,
        externalEuint32 votingPower,
        bytes calldata inputProof
    ) public onlyMember returns (uint256) {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting period has ended");
        
        uint256 voteId = voteCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalVotingPower = FHE.fromExternal(votingPower, inputProof);
        
        votes[voteId] = Vote({
            voteId: FHE.asEuint32(0), // Will be set properly later
            voteChoice: FHE.asEbool(true), // This would be encrypted based on user choice
            voter: msg.sender,
            timestamp: block.timestamp,
            votingPower: internalVotingPower
        });
        
        // Update proposal vote counts (encrypted)
        proposals[proposalId].totalVotes = FHE.add(proposals[proposalId].totalVotes, internalVotingPower);
        // Note: In a real implementation, we would need to handle yes/no votes separately
        // This is simplified for demonstration
        
        emit VoteCast(voteId, proposalId, msg.sender);
        return voteId;
    }
    
    function executeProposal(uint256 proposalId) public onlyMember {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp > proposals[proposalId].endTime, "Voting period has not ended");
        require(!proposals[proposalId].isExecuted, "Proposal already executed");
        
        // Check if quorum is met (simplified - in reality would need FHE comparison)
        // For demonstration, we'll assume quorum is met if there are votes
        
        proposals[proposalId].isActive = false;
        proposals[proposalId].isExecuted = true;
        
        emit ProposalExecuted(proposalId, true);
    }
    
    function updateReputation(address member, euint32 newReputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(members[member].memberAddress != address(0), "Member does not exist");
        
        memberReputation[member] = newReputation;
        members[member].reputation = newReputation;
        
        emit ReputationUpdated(member, 0); // FHE.decrypt(newReputation) - will be decrypted off-chain
    }
    
    function updateVotingPower(address member, euint32 newVotingPower) public onlyOwner {
        require(members[member].memberAddress != address(0), "Member does not exist");
        
        memberVotingPower[member] = newVotingPower;
        members[member].votingPower = newVotingPower;
    }
    
    function getProposalInfo(uint256 proposalId) public view returns (
        string memory title,
        string memory description,
        uint8 votesFor,
        uint8 votesAgainst,
        uint8 totalVotes,
        bool isActive,
        bool isExecuted,
        address proposer,
        uint256 startTime,
        uint256 endTime
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.title,
            proposal.description,
            0, // FHE.decrypt(proposal.votesFor) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.votesAgainst) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.totalVotes) - will be decrypted off-chain
            proposal.isActive,
            proposal.isExecuted,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime
        );
    }
    
    function getMemberInfo(address member) public view returns (
        uint8 votingPower,
        uint8 reputation,
        bool isActive,
        uint256 joinTime,
        string memory role
    ) {
        Member storage memberData = members[member];
        return (
            0, // FHE.decrypt(memberData.votingPower) - will be decrypted off-chain
            0, // FHE.decrypt(memberData.reputation) - will be decrypted off-chain
            memberData.isActive,
            memberData.joinTime,
            memberData.role
        );
    }
    
    function getVoteInfo(uint256 voteId) public view returns (
        bool voteChoice,
        address voter,
        uint256 timestamp,
        uint8 votingPower
    ) {
        Vote storage vote = votes[voteId];
        return (
            false, // FHE.decrypt(vote.voteChoice) - will be decrypted off-chain
            vote.voter,
            vote.timestamp,
            0 // FHE.decrypt(vote.votingPower) - will be decrypted off-chain
        );
    }
    
    function getQuorumThreshold() public view returns (uint8) {
        return 0; // FHE.decrypt(quorumThreshold) - will be decrypted off-chain
    }
    
    function getTotalMembers() public view returns (uint8) {
        return 0; // FHE.decrypt(totalMembers) - will be decrypted off-chain
    }
}
