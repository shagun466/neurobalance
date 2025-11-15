// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ProofOfCareNFT is ERC721 {
    uint256 public tokenCounter;
    constructor() ERC721("ProofOfCare", "POC") {}
    function mintBadge(address user) public {
        _safeMint(user, tokenCounter++);
    }
}
