//SPDX-License-identifier: MIT
pragma solidity ^0.8.0;

contract UserLogin {
    struct User {
        uint userId;
        string ethereumId;
    }

    mapping(uint => User) public users;
    uint public userCount;

    event UserLoggedIn(uint userId, string ethereumId);

    function loginUserAgeGated(uint _userId, string memory _ethereumId, uint _userAge) public view returns (bool) {
        require(_userId > 0 && _userId <= userCount, "Invalid user ID");

        User memory user = users[_userId];
        require(keccak256(abi.encodePacked(user.ethereumId)) == keccak256(abi.encodePacked(_ethereumId)), "Invalid Ethereum ID");

        require(_userAge >= 21, "You are not above 21");

       
        return true;
    }

    function loginUserNonAgeGated(uint _userId, string memory _ethereumId) public view returns (bool) {
        require(_userId > 0 && _userId <= userCount, "Invalid user ID");

        User memory user = users[_userId];
        require(keccak256(abi.encodePacked(user.ethereumId)) == keccak256(abi.encodePacked(_ethereumId)), "Invalid Ethereum ID");

      
        return true;
    }
}
