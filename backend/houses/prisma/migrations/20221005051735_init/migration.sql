-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "property_name" VARCHAR(30) NOT NULL,
    "house_type" VARCHAR(10) NOT NULL,
    "beds" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,
    "workspace" INTEGER NOT NULL,
    "stay" TIMESTAMP(3)[],
    "houseAmenitiesId" TEXT,
    "zipcode" VARCHAR(5) NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "state_code" VARCHAR(2) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseAmenity" (
    "id" TEXT NOT NULL,
    "master_bedroom" BOOLEAN NOT NULL,
    "outdoor_patio" BOOLEAN NOT NULL,
    "fireplace" BOOLEAN NOT NULL,
    "firepit" BOOLEAN NOT NULL,
    "pet_friendly" BOOLEAN NOT NULL,
    "locked_rooms" BOOLEAN NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "backyard" BOOLEAN NOT NULL,

    CONSTRAINT "HouseAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "room_number" TEXT NOT NULL,
    "occupied" BOOLEAN NOT NULL DEFAULT false,
    "house_id" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "House_houseAmenitiesId_key" ON "House"("houseAmenitiesId");

-- CreateIndex
CREATE UNIQUE INDEX "House_address_id_key" ON "House"("address_id");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_houseAmenitiesId_fkey" FOREIGN KEY ("houseAmenitiesId") REFERENCES "HouseAmenity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;
