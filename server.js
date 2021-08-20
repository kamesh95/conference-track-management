pragma solidity ^0.8.4;

contract SDXO2 {
    mapping(address => uint) balances;
    uint public totalSupply = 10000 * 10 ** 18;
    string public name = "SDXO";
    uint public decimals = 18;
    
    constructor() {
        balances[msg.sender] = totalSupply;
    }
    
    event Transfer(address indexed from, address indexed to, uint value);
    
    function mint(address account, uint amount) external {
        require(account != address(0), "BEP20: mint to the zero address");

        totalSupply += amount;
        balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }
    
    function balanceOf(address owner) public view returns (uint) {
        return balances[owner];
    }
    
    function transfer(address to, uint value) public returns (bool) {
        require(balanceOf(msg.sender) >= value, 'Low balance');
        balances[to] += value;
        balances[msg.sender] -= value; 
        emit Transfer(msg.sender, to, value);
        return true;
    }
}
