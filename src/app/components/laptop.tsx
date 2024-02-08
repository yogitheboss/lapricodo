import Link from "next/link";
import React from "react";

interface LaptopCardProps {
  name: string;
  Brand: string;
  graphicProcessor: string;
  Price: number;
  ram: number;
  ssdCapacity: string;
  index: number;
}

const LaptopCard: React.FC<LaptopCardProps> = ({
  name,
  Brand,
  graphicProcessor,
  Price,
  ram,
  ssdCapacity,
  index,
}) => {
  console.log( name,
    Brand,
    graphicProcessor,
    Price,
    ram,
    ssdCapacity,
    index);
  
  return (
    <div className="flex bg-gray-100  shadow-sm shadow-indigo-500/50 rounded-lg">
      <div className="md:flex">
        <div className="md:flex-shrink-0 p-1 flex justify-center">
          <img
            className="h-48 my-auto w-full object-cover md:w-48"
            src={
              index === 1
                ? "https://m.media-amazon.com/images/I/71-3Gw+9KCL._SL1500_.jpg"
                : "https://m.media-amazon.com/images/I/81Nwu5Hp0jS._SL1500_.jpg"
            }
            alt="Laptop"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide  text-indigo-500 text-lg font-bold">
            {Brand}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">
            {name}
          </p>
          <p className="mt-2 text-gray-500">{graphicProcessor}</p>
          <p className="mt-2 text-gray-600 text-md">
            <strong>₹ {Price}</strong>
          </p>
          <p className="mt-2 text-gray-600">{ram} GB RAM</p>
          <p className="mt-2 text-gray-600">SSD: {ssdCapacity?.toLocaleUpperCase()}</p>
          <Link
            className="text-blue-600 text-gray-600"
            href={
              "https://www.amazon.in/ASUS-Zephyrus-GeForce-GTX-1650-Office-2019-GA401QH-HZ069TS/dp/B096VKNKSG?th=1"
            }
          >
            Click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;
