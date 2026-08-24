import { expect } from "chai";
import { ethers } from "hardhat";

describe("LandRegistry", function () {

  async function deployFixture() {

    const [
      admin,
      authority,
      ownerA,
      buyerB,
      unauthorized
    ] = await ethers.getSigners();


    const Registry =
      await ethers.getContractFactory(
        "LandRegistry"
      );


    const registry =
      await Registry.deploy();


    await registry.waitForDeployment();


    await registry
      .connect(admin)
      .setAuthority(
        authority.address,
        true
      );


    return {
      registry,
      admin,
      authority,
      ownerA,
      buyerB,
      unauthorized
    };
  }


  function documentHash(text: string) {

    return ethers.keccak256(
      ethers.toUtf8Bytes(text)
    );
  }


  async function registeredProperty() {

    const data =
      await deployFixture();


    await data.registry
      .connect(data.authority)
      .registerProperty(

        1,

        "P001",

        "Mudki Demo Zone",

        1500,

        "Residential",

        data.ownerA.address,

        documentHash(
          "property-001"
        )
      );


    return data;
  }


  it(
    "should deploy correctly",
    async function () {

      const {
        registry,
        admin
      } = await deployFixture();


      expect(
        await registry.admin()
      ).to.equal(
        admin.address
      );


      expect(
        await registry.isAuthority(
          admin.address
        )
      ).to.equal(true);
    }
  );


  it(
    "should register property",
    async function () {

      const {
        registry,
        authority,
        ownerA
      } = await deployFixture();


      const hash =
        documentHash(
          "property-001"
        );


      await expect(

        registry
          .connect(authority)
          .registerProperty(

            1,

            "P001",

            "Mudki Demo Zone",

            1500,

            "Residential",

            ownerA.address,

            hash
          )

      )
        .to.emit(
          registry,
          "PropertyRegistered"
        );


      const property =
        await registry.getProperty(1);


      expect(
        property.currentOwner
      ).to.equal(
        ownerA.address
      );


      expect(
        property.propertyNumber
      ).to.equal(
        "P001"
      );
    }
  );


  it(
    "should reject duplicate property",
    async function () {

      const data =
        await registeredProperty();


      await expect(

        data.registry
          .connect(data.authority)
          .registerProperty(

            1,

            "P002",

            "Location B",

            2000,

            "Commercial",

            data.ownerA.address,

            documentHash(
              "property-002"
            )
          )

      ).to.be.revertedWith(
        "Property ID already exists"
      );
    }
  );


  it(
    "should verify property",
    async function () {

      const data =
        await registeredProperty();


      await data.registry
        .connect(data.authority)
        .verifyProperty(1);


      const property =
        await data.registry.getProperty(1);


      expect(
        property.verified
      ).to.equal(true);


      expect(
        property.status
      ).to.equal(1n);
    }
  );


  it(
    "should reject unauthorized verification",
    async function () {

      const data =
        await registeredProperty();


      await expect(

        data.registry
          .connect(data.unauthorized)
          .verifyProperty(1)

      ).to.be.revertedWith(
        "Only authority"
      );
    }
  );


  it(
    "should reject transfer before verification",
    async function () {

      const data =
        await registeredProperty();


      await expect(

        data.registry
          .connect(data.ownerA)
          .transferOwnership(
            1,
            data.buyerB.address
          )

      ).to.be.revertedWith(
        "Property not verified"
      );
    }
  );


  it(
    "should transfer ownership",
    async function () {

      const data =
        await registeredProperty();


      await data.registry
        .connect(data.authority)
        .verifyProperty(1);


      await expect(

        data.registry
          .connect(data.ownerA)
          .transferOwnership(
            1,
            data.buyerB.address
          )

      )
        .to.emit(
          data.registry,
          "OwnershipTransferred"
        );


      const property =
        await data.registry.getProperty(1);


      expect(
        property.currentOwner
      ).to.equal(
        data.buyerB.address
      );


      expect(
        property.previousOwner
      ).to.equal(
        data.ownerA.address
      );
    }
  );


  it(
    "should reject old owner",
    async function () {

      const data =
        await registeredProperty();


      await data.registry
        .connect(data.authority)
        .verifyProperty(1);


      await data.registry
        .connect(data.ownerA)
        .transferOwnership(
          1,
          data.buyerB.address
        );


      await expect(

        data.registry
          .connect(data.ownerA)
          .transferOwnership(
            1,
            data.unauthorized.address
          )

      ).to.be.revertedWith(
        "Only current owner"
      );
    }
  );


  it(
    "should reject zero owner",
    async function () {

      const data =
        await registeredProperty();


      await expect(

        data.registry
          .connect(data.authority)
          .registerProperty(

            2,

            "P002",

            "Location",

            1000,

            "Residential",

            ethers.ZeroAddress,

            documentHash(
              "property"
            )
          )

      ).to.be.revertedWith(
        "Zero owner"
      );
    }
  );


  it(
    "should store document hash",
    async function () {

      const data =
        await registeredProperty();


      const hash =
        documentHash(
          "property-001"
        );


      const property =
        await data.registry.getProperty(1);


      expect(
        property.documentHash
      ).to.equal(hash);
    }
  );


  it(
    "should reject unknown property",
    async function () {

      const {
        registry
      } = await deployFixture();


      await expect(
        registry.getProperty(999)
      ).to.be.revertedWith(
        "Property does not exist"
      );
    }
  );

});