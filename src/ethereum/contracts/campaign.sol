pragma solidity ^0.4.21;

contract CampaignFactory {
  address[] public deployedCampaigns;

  function createCampaign(uint _minimumContribution) public {
    address newCampaign = new Campaign(_minimumContribution, msg.sender);
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns() public view returns (address[])  {
    return deployedCampaigns;
  }
}


contract Campaign {
  struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    uint approvalCount;
    mapping(address => bool) approvals;
  }

  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public approvers;
  uint public approverCount;
  Request[] public requests;

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }

  function Campaign(uint _minimumContribution, address _manager) public {
    manager = _manager;
    minimumContribution = _minimumContribution;
  }

  function contribute() public payable {
    require(msg.value > minimumContribution);

    approvers[msg.sender] = true;
    approverCount++;
  }

  function createRequest(string _description, uint _value, address _recipient) public restricted {
    Request memory newRequest = Request({
      description: _description,
      value: _value,
      recipient: _recipient,
      complete: false,
      approvalCount: 0
      // We don't init `approvals` because it's a reference type (not of a value type).
    });

    requests.push(newRequest);
  }

  function approveRequest(uint _index) public {
    Request storage request = requests[_index];

    require(approvers[msg.sender]);
    require(!request.approvals[msg.sender]);

    request.approvals[msg.sender] = true;
    request.approvalCount++;
  }

  function finalizeRequest(uint _index) public restricted {
    Request storage request = requests[_index];

    require(request.approvalCount > (approverCount / 2));
    require(!request.complete);

    request.recipient.transfer(request.value);
    request.complete = true;
  }
}
