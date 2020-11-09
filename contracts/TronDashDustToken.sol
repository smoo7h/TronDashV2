// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity >=0.4.23;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address public owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor() public {
        owner = msg.sender;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

// File: openzeppelin-solidity/contracts/ownership/Whitelist.sol

/**
 * @title Whitelist
 * @dev The Whitelist contract has a whitelist of addresses, and provides basic authorization control functions.
 * @dev This simplifies the implementation of "user permissions".
 */
contract Whitelist is Ownable {
    mapping(address => bool) public whitelist;

    event WhitelistedAddressAdded(address addr);
    event WhitelistedAddressRemoved(address addr);

    /**
     * @dev Throws if called by any account that's not whitelisted.
     */
    modifier onlyWhitelisted() {
        require(whitelist[msg.sender]);
        _;
    }

    /**
     * @dev add an address to the whitelist
     * @param addr address
     * @return true if the address was added to the whitelist, false if the address was already in the whitelist
     */
    function addAddressToWhitelist(address addr)
        public
        onlyOwner
        returns (bool success)
    {
        if (!whitelist[addr]) {
            whitelist[addr] = true;
            emit WhitelistedAddressAdded(addr);
            success = true;
        }
    }

    /**
     * @dev add addresses to the whitelist
     * @param addrs addresses
     * @return true if at least one address was added to the whitelist,
     * false if all addresses were already in the whitelist
     */
    function addAddressesToWhitelist(address[] addrs)
        public
        onlyOwner
        returns (bool success)
    {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (addAddressToWhitelist(addrs[i])) {
                success = true;
            }
        }
    }

    /**
     * @dev remove an address from the whitelist
     * @param addr address
     * @return true if the address was removed from the whitelist,
     * false if the address wasn't in the whitelist in the first place
     */
    function removeAddressFromWhitelist(address addr)
        public
        onlyOwner
        returns (bool success)
    {
        if (whitelist[addr]) {
            whitelist[addr] = false;
            emit WhitelistedAddressRemoved(addr);
            success = true;
        }
    }

    /**
     * @dev remove addresses from the whitelist
     * @param addrs addresses
     * @return true if at least one address was removed from the whitelist,
     * false if all addresses weren't in the whitelist in the first place
     */
    function removeAddressesFromWhitelist(address[] addrs)
        public
        onlyOwner
        returns (bool success)
    {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (removeAddressFromWhitelist(addrs[i])) {
                success = true;
            }
        }
    }
}

/// math.sol -- mixin for inline numerical wizardry

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity ^0.4.25;

contract DSMath {
    /*
    standard uint256 functions
     */
    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }

    function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x - y) <= x, "ds-math-sub-underflow");
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }

    function min(uint256 x, uint256 y) internal pure returns (uint256 z) {
        return x <= y ? x : y;
    }

    function max(uint256 x, uint256 y) internal pure returns (uint256 z) {
        return x >= y ? x : y;
    }

    /*
    uint128 functions (h is for half)
    */
    function hadd(uint128 x, uint128 y) internal pure returns (uint128 z) {
        require((z = x + y) >= x);
    }

    function hsub(uint128 x, uint128 y) internal pure returns (uint128 z) {
        require((z = x - y) <= x);
    }

    function hmul(uint128 x, uint128 y) internal pure returns (uint128 z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }

    function hmin(uint128 x, uint128 y) internal pure returns (uint128 z) {
        return x <= y ? x : y;
    }

    function hmax(uint128 x, uint128 y) internal pure returns (uint128 z) {
        return x >= y ? x : y;
    }

    /*
     * int256 functions
     **/
    function imin(int256 x, int256 y) internal pure returns (int256 z) {
        return x <= y ? x : y;
    }

    function imax(int256 x, int256 y) internal pure returns (int256 z) {
        return x >= y ? x : y;
    }

    /*
     * WAD math
     **/
    uint256 constant WAD = 10**18;
    uint256 constant RAY = 10**27;

    function wmul(uint128 x, uint128 y) internal pure returns (uint128 z) {
        z = cast((uint256(x) * y + WAD / 2) / WAD);
    }

    function whdiv(uint128 x, uint128 y) internal pure returns (uint128 z) {
        z = cast((uint256(x) * WAD + y / 2) / y);
    }

    function wmul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = add(mul(x, y), WAD / 2) / WAD;
    }

    function wdiv(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = add(mul(x, WAD), y / 2) / y;
    }

    function rmul(uint128 x, uint128 y) internal pure returns (uint128 z) {
        z = cast((uint256(x) * y + RAY / 2) / RAY);
    }

    function rdiv(uint128 x, uint128 y) internal pure returns (uint128 z) {
        z = cast((uint256(x) * RAY + y / 2) / y);
    }

    function rmul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = add(mul(x, y), RAY / 2) / RAY;
    }

    function rdiv(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = add(mul(x, RAY), y / 2) / y;
    }

    // This famous algorithm is called "exponentiation by squaring"
    // and calculates x^n with x as fixed-point256 and n as regular unsigned.
    //
    // It's O(log n), instead of O(n) for naive repeated multiplication.
    //
    // These facts are why it works:
    //
    //  If n is even, then x^n = (x^2)^(n/2).
    //  If n is odd,  then x^n = x * x^(n-1),
    //   and applying the equation for even x gives
    //    x^n = x * (x^2)^((n-1) / 2).
    //
    //  Also, EVM division is flooring and
    //    floor[(n-1) / 2] = floor[n / 2].
    //
    function rpow(uint256 x, uint256 n) internal pure returns (uint256 z) {
        z = n % 2 != 0 ? x : RAY;

        for (n /= 2; n != 0; n /= 2) {
            x = rmul(x, x);

            if (n % 2 != 0) {
                z = rmul(z, x);
            }
        }
    }

    function cast(uint256 x) internal pure returns (uint128 z) {
        require((z = uint128(x)) == x);
    }
}

/// stop.sol -- mixin for enable/disable functionality

// Copyright (C) 2017  DappHub, LLC

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity >=0.4.23;

contract DSStop is Whitelist {
    bool public stopped;

    modifier stoppable {
        if (!overrideStop()) {
            require(!stopped, "ds-stop-is-stopped");
            _;
        } else {
            _;
        }
    }

    function overrideStop() internal view returns (bool) {
        if (msg.sender == owner) {
            return true;
        } else {
            return false;
        }
    }

    function stop() public onlyWhitelisted {
        stopped = true;
    }

    function start() public onlyWhitelisted {
        stopped = false;
    }
}
/// TRC20.sol -- API for the TRC20 token standard

// See <https://github.com/tronprotocol/tips/blob/master/tip-20.md>.

// This file likely does not meet the threshold of originality
// required for copyright to apply.  As a result, this is free and
// unencumbered software belonging to the public domain.

pragma solidity ^0.4.8;

contract TRC20Events {
    event Approval(
        address indexed src,
        address indexed account,
        uint256 amount
    );
    event Transfer(address indexed src, address indexed dst, uint256 amount);
}

contract TRC20 is TRC20Events {
    function totalSupply() public view returns (uint256);

    function balanceOf(address account) public view returns (uint256);

    function allowance(address src, address account)
        public
        view
        returns (uint256);

    function approve(address account, uint256 amount) public returns (bool);

    function transfer(address dst, uint256 amount) public returns (bool);

    function transferFrom(
        address src,
        address dst,
        uint256 amount
    ) public returns (bool);
}

/// base.sol -- basic ERC20 implementation

// Copyright (C) 2015, 2016, 2017  DappHub, LLC

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity >=0.4.23;

contract TronDashDustTokenBase is TRC20, DSMath {
    uint256 _supply;
    mapping(address => uint256) _balances;
    mapping(address => mapping(address => uint256)) _approvals;

    constructor(uint256 supply) public {
        _balances[msg.sender] = supply;
        _supply = supply;
    }

    function totalSupply() public view returns (uint256) {
        return _supply;
    }

    function balanceOf(address src) public view returns (uint256) {
        return _balances[src];
    }

    function allowance(address src, address account)
        public
        view
        returns (uint256)
    {
        return _approvals[src][account];
    }

    function transfer(address dst, uint256 amount) public returns (bool) {
        return transferFrom(msg.sender, dst, amount);
    }

    function transferFrom(
        address src,
        address dst,
        uint256 amount
    ) public returns (bool) {
        if (src != msg.sender) {
            require(
                _approvals[src][msg.sender] >= amount,
                "ds-token-insufficient-approval"
            );
            _approvals[src][msg.sender] = sub(
                _approvals[src][msg.sender],
                amount
            );
        }

        require(_balances[src] >= amount, "ds-token-insufficient-balance");
        _balances[src] = sub(_balances[src], amount);
        _balances[dst] = add(_balances[dst], amount);

        emit Transfer(src, dst, amount);

        return true;
    }

    function approve(address account, uint256 amount) public returns (bool) {
        _approvals[msg.sender][account] = amount;

        emit Approval(msg.sender, account, amount);

        return true;
    }
}

/// token.sol -- ERC20 implementation with minting and burning

// Copyright (C) 2015, 2016, 2017  DappHub, LLC

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity >=0.4.23;

contract TronDashDustToken is TronDashDustTokenBase(0), DSStop {
    string public symbol;
    uint256 public decimals = 6; // standard token precision. override to customize

    constructor(string symbol_) public {
        symbol = symbol_;
    }

    event Mint(address indexed account, uint256 amount);
    event Burn(address indexed account, uint256 amount);

    function approve(address account) public stoppable returns (bool) {
        return super.approve(account, uint256(-1));
    }

    function approve(address account, uint256 amount)
        public
        stoppable
        returns (bool)
    {
        return super.approve(account, amount);
    }

    function transferFrom(
        address src,
        address dst,
        uint256 amount
    ) public stoppable returns (bool) {
        if (src != msg.sender && _approvals[src][msg.sender] != uint256(-1)) {
            require(
                _approvals[src][msg.sender] >= amount,
                "ds-token-insufficient-approval"
            );
            _approvals[src][msg.sender] = sub(
                _approvals[src][msg.sender],
                amount
            );
        }

        require(_balances[src] >= amount, "ds-token-insufficient-balance");
        _balances[src] = sub(_balances[src], amount);
        _balances[dst] = add(_balances[dst], amount);

        emit Transfer(src, dst, amount);

        return true;
    }

    function push(address dst, uint256 amount) public {
        transferFrom(msg.sender, dst, amount);
    }

    function pull(address src, uint256 amount) public {
        transferFrom(src, msg.sender, amount);
    }

    function move(
        address src,
        address dst,
        uint256 amount
    ) public {
        transferFrom(src, dst, amount);
    }

    function mint(uint256 amount) public {
        mint(msg.sender, amount);
    }

    function burn(uint256 amount) public {
        burn(msg.sender, amount);
    }

    function mint(address account, uint256 amount)
        public
        onlyWhitelisted
        stoppable
    {
        _balances[account] = add(_balances[account], amount);
        _supply = add(_supply, amount);
        emit Mint(account, amount);
    }

    function burn(address account, uint256 amount)
        public
        onlyWhitelisted
        stoppable
    {
        if (
            account != msg.sender &&
            _approvals[account][msg.sender] != uint256(-1)
        ) {
            require(
                _approvals[account][msg.sender] >= amount,
                "ds-token-insufficient-approval"
            );
            _approvals[account][msg.sender] = sub(
                _approvals[account][msg.sender],
                amount
            );
        }

        require(_balances[account] >= amount, "ds-token-insufficient-balance");
        _balances[account] = sub(_balances[account], amount);
        _supply = sub(_supply, amount);
        emit Burn(account, amount);
    }

    // Optional token name
    string public name = "TronDash Dust";

    function setName(string name_) public onlyWhitelisted {
        name = name_;
    }

    // Optional symbol name
    function setSymbol(string symbol_) public onlyWhitelisted {
        symbol = symbol_;
    }
}
