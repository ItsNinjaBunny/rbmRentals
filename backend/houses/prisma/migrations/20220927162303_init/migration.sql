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
    "occupied" BOOLEAN NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" SERIAL NOT NULL,
    "amenity_name" TEXT NOT NULL,
    "hasAmenity" BOOLEAN NOT NULL DEFAULT false,
    "house_id" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "room_number" TEXT NOT NULL,
    "occupied" BOOLEAN NOT NULL,
    "house_id" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Amenity" ADD CONSTRAINT "Amenity_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
