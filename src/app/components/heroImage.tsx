import React from "react";
import Image from "next/image";
import heroImage from "../assets/hero.jpg";
function HeroImage() {
  return (
    <div className="w-[50%]">
      <Image
      className="object-cover h-[100%] w-[100%]"
        src={heroImage}
        width={500}
        height={500}
        alt="people holding laptops and working"
      />
    </div>
  );
}

export default HeroImage;
