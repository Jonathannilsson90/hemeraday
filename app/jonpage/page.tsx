import React from 'react'
import Image from "next/image";
import mainImage from "../../public/images/image.jpg";
const Page = () => {
  return (
    <div className="h-screen box-border flex flex-col">
      <main className="flex justify-center items-center">
        <div className="absolute inset-100 flex justify-center items-center bg-black bg-opacity-50">
          <div className="">
            <p>PLACEHOLDER</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image className="" src={mainImage} alt="treetops"></Image>
        </div>
      </main>
      <footer className="border-2 border-black">Footer</footer>
    </div>
  );
}

export default Page