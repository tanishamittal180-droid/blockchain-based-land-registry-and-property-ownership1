// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract LandRegistry {

    address public immutable admin;

    mapping(address => bool) public isAuthority;

    mapping(address => uint256[]) private ownerProperties;

    mapping(uint256 => uint256) private ownerPropertyIndex;

    enum PropertyStatus {
        REGISTERED,
        VERIFIED,
        TRANSFERRED,
        DISPUTED
    }

    struct Property {

        uint256 propertyId;

        string propertyNumber;

        string location;

        uint256 area;

        string propertyType;

        address currentOwner;

        address previousOwner;

        bytes32 documentHash;

        bool verified;

        PropertyStatus status;

        uint256 registeredAt;

        uint256 lastTransferredAt;
    }

    mapping(uint256 => Property) private properties;

    mapping(uint256 => bool) public propertyExists;


    event AuthorityUpdated(
        address indexed account,
        bool enabled
    );


    event PropertyRegistered(
        uint256 indexed propertyId,
        string propertyNumber,
        address indexed owner,
        bytes32 documentHash
    );


    event PropertyVerified(
        uint256 indexed propertyId,
        address indexed verifier
    );


    event OwnershipTransferred(
        uint256 indexed propertyId,
        address indexed previousOwner,
        address indexed newOwner
    );


    event PropertyStatusUpdated(
        uint256 indexed propertyId,
        PropertyStatus status
    );


    modifier onlyAdmin() {

        require(
            msg.sender == admin,
            "Only admin"
        );

        _;
    }


    modifier onlyAuthority() {

        require(
            isAuthority[msg.sender],
            "Only authority"
        );

        _;
    }


    modifier existingProperty(
        uint256 propertyId
    ) {

        require(
            propertyExists[propertyId],
            "Property does not exist"
        );

        _;
    }


    modifier onlyPropertyOwner(
        uint256 propertyId
    ) {

        require(
            properties[propertyId].currentOwner == msg.sender,
            "Only current owner"
        );

        _;
    }


    constructor() {

        admin = msg.sender;

        isAuthority[msg.sender] = true;

        emit AuthorityUpdated(
            msg.sender,
            true
        );
    }


    function setAuthority(
        address account,
        bool enabled
    )
        external
        onlyAdmin
    {

        require(
            account != address(0),
            "Zero address"
        );

        isAuthority[account] = enabled;

        emit AuthorityUpdated(
            account,
            enabled
        );
    }


    function registerProperty(
        uint256 propertyId,
        string calldata propertyNumber,
        string calldata location,
        uint256 area,
        string calldata propertyType,
        address initialOwner,
        bytes32 documentHash
    )
        external
        onlyAuthority
    {

        require(
            propertyId > 0,
            "Invalid property ID"
        );

        require(
            !propertyExists[propertyId],
            "Property ID already exists"
        );

        require(
            bytes(propertyNumber).length > 0,
            "Property number required"
        );

        require(
            bytes(location).length > 0,
            "Location required"
        );

        require(
            area > 0,
            "Area must be greater than zero"
        );

        require(
            bytes(propertyType).length > 0,
            "Property type required"
        );

        require(
            initialOwner != address(0),
            "Zero owner"
        );

        require(
            documentHash != bytes32(0),
            "Document hash required"
        );


        Property memory propertyData =
            Property({

                propertyId: propertyId,

                propertyNumber: propertyNumber,

                location: location,

                area: area,

                propertyType: propertyType,

                currentOwner: initialOwner,

                previousOwner: address(0),

                documentHash: documentHash,

                verified: false,

                status: PropertyStatus.REGISTERED,

                registeredAt: block.timestamp,

                lastTransferredAt: 0
            });


        properties[propertyId] =
            propertyData;


        propertyExists[propertyId] =
            true;


        _addPropertyToOwner(
            initialOwner,
            propertyId
        );


        emit PropertyRegistered(
            propertyId,
            propertyNumber,
            initialOwner,
            documentHash
        );
    }


    function verifyProperty(
        uint256 propertyId
    )
        external
        onlyAuthority
        existingProperty(propertyId)
    {

        Property storage propertyData =
            properties[propertyId];


        require(
            !propertyData.verified,
            "Already verified"
        );


        propertyData.verified =
            true;


        propertyData.status =
            PropertyStatus.VERIFIED;


        emit PropertyVerified(
            propertyId,
            msg.sender
        );


        emit PropertyStatusUpdated(
            propertyId,
            PropertyStatus.VERIFIED
        );
    }


    function transferOwnership(
        uint256 propertyId,
        address newOwner
    )
        external
        existingProperty(propertyId)
        onlyPropertyOwner(propertyId)
    {

        require(
            newOwner != address(0),
            "Zero new owner"
        );


        require(
            newOwner != msg.sender,
            "Already owner"
        );


        Property storage propertyData =
            properties[propertyId];


        require(
            propertyData.verified,
            "Property not verified"
        );


        require(
            propertyData.status != PropertyStatus.DISPUTED,
            "Property disputed"
        );


        address oldOwner =
            propertyData.currentOwner;


        _removePropertyFromOwner(
            oldOwner,
            propertyId
        );


        _addPropertyToOwner(
            newOwner,
            propertyId
        );


        propertyData.previousOwner =
            oldOwner;


        propertyData.currentOwner =
            newOwner;


        propertyData.lastTransferredAt =
            block.timestamp;


        propertyData.status =
            PropertyStatus.TRANSFERRED;


        emit OwnershipTransferred(
            propertyId,
            oldOwner,
            newOwner
        );


        emit PropertyStatusUpdated(
            propertyId,
            PropertyStatus.TRANSFERRED
        );
    }


    function updatePropertyStatus(
        uint256 propertyId,
        PropertyStatus newStatus
    )
        external
        onlyAuthority
        existingProperty(propertyId)
    {

        require(
            newStatus != PropertyStatus.REGISTERED,
            "Use registration"
        );


        properties[propertyId].status =
            newStatus;


        emit PropertyStatusUpdated(
            propertyId,
            newStatus
        );
    }


    function getProperty(
        uint256 propertyId
    )
        external
        view
        existingProperty(propertyId)
        returns (Property memory)
    {

        return properties[propertyId];
    }


    function getPropertiesByOwner(
        address owner
    )
        external
        view
        returns (uint256[] memory)
    {

        return ownerProperties[owner];
    }


    function getOwnerPropertyCount(
        address owner
    )
        external
        view
        returns (uint256)
    {

        return ownerProperties[owner].length;
    }


    function getPropertyStatus(
        uint256 propertyId
    )
        external
        view
        existingProperty(propertyId)
        returns (PropertyStatus)
    {

        return properties[propertyId].status;
    }


    function _addPropertyToOwner(
        address owner,
        uint256 propertyId
    )
        internal
    {

        ownerPropertyIndex[propertyId] =
            ownerProperties[owner].length;


        ownerProperties[owner].push(
            propertyId
        );
    }


    function _removePropertyFromOwner(
        address owner,
        uint256 propertyId
    )
        internal
    {

        uint256 index =
            ownerPropertyIndex[propertyId];


        uint256 lastIndex =
            ownerProperties[owner].length - 1;


        if (index != lastIndex) {

            uint256 lastPropertyId =
                ownerProperties[owner][lastIndex];


            ownerProperties[owner][index] =
                lastPropertyId;


            ownerPropertyIndex[lastPropertyId] =
                index;
        }


        ownerProperties[owner].pop();


        delete ownerPropertyIndex[propertyId];
    }
}