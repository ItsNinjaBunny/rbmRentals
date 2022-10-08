-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "property_name" VARCHAR(30) NOT NULL,
    "house_type" VARCHAR(10) NOT NULL,
    "beds" INTEGER NOT NULL,
    "baths" DOUBLE PRECISION NOT NULL,
    "workspaces" INTEGER NOT NULL,
    "stay" TIMESTAMP(3)[],
    "houseAmenitiesId" TEXT,
    "zipcode" VARCHAR(5) NOT NULL,
    "address_id" INTEGER,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "house_id" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "state" VARCHAR(2) NOT NULL,

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
    "room_number" TEXT NOT NULL,
    "occupied" BOOLEAN NOT NULL DEFAULT false,
    "house_id" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "House_houseAmenitiesId_key" ON "House"("houseAmenitiesId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_city_state_key" ON "Address"("city", "state");

-- CreateIndex
CREATE UNIQUE INDEX "Room_room_number_key" ON "Room"("room_number");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_houseAmenitiesId_fkey" FOREIGN KEY ("houseAmenitiesId") REFERENCES "HouseAmenity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;
