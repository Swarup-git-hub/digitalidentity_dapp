// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract DIDRegistry is Ownable {
    struct Identity {
        address owner;
        string didDocument;
        string[] credentials;
        bool isActive;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct Credential {
        string id;
        string type;
        string issuer;
        string hash;
        uint256 issuedAt;
        bool isRevoked;
    }
    
    mapping(address => Identity) public identities;
    mapping(address => mapping(address => bool)) public delegates;
    mapping(string => Credential) public credentials;
    
    event IdentityCreated(address indexed user, string did);
    event IdentityUpdated(address indexed user, string did);
    event CredentialAdded(address indexed user, string credentialHash);
    event CredentialRevoked(string indexed credentialId);
    
    function createIdentity(string memory didDocument) external {
        require(!identities[msg.sender].isActive, "Identity already exists");
        
        identities[msg.sender] = Identity({
            owner: msg.sender,
            didDocument: didDocument,
            credentials: new string[](0),
            isActive: true,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        emit IdentityCreated(msg.sender, didDocument);
    }
    
    function updateIdentity(string memory didDocument) external {
        require(identities[msg.sender].isActive, "Identity not found");
        
        identities[msg.sender].didDocument = didDocument;
        identities[msg.sender].updatedAt = block.timestamp;
        
        emit IdentityUpdated(msg.sender, didDocument);
    }
    
    function addCredential(string memory credentialId, string memory credentialHash) external {
        require(identities[msg.sender].isActive, "Identity not found");
        
        identities[msg.sender].credentials.push(credentialHash);
        identities[msg.sender].updatedAt = block.timestamp;
        
        emit CredentialAdded(msg.sender, credentialHash);
    }
    
    function getIdentity(address user) external view returns (Identity memory) {
        return identities[user];
    }
    
    function getCredentials(address user) external view returns (string[] memory) {
        return identities[user].credentials;
    }
    
    function revokeCredential(string memory credentialId) external {
        // Implementation for credential revocation
        emit CredentialRevoked(credentialId);
    }
}
