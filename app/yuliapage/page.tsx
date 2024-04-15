"use client"

import AprilImage from "../../public/images/april.png"
import Image from 'next/image'
import { useEffect, useState } from "react";

export default function YuliaPage() {
  const [date, setDate] = useState(new Date()); 

  let today = new Date();

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    }
  }, []);

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  if (!date) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="h-[85vh] box-border w-[100vw] bg-gray-300  flex flex-col justify-center items-center">
      <div className="2xl:h-[1024px] 2xl:w-[1440px] xl:h-[620px] xl:w-[1133px] bg-gradient-to-r from-red-200 to-cyan-200  flex flex-row justify-between items-center">
        <div className="2xl:h-[956px] 2xl:w-[369px] xl:h-[566px] xl:w-[224px] flex flex-col justify-center items-center bg-cyan-600 ml-[10px] rounded-[20px]">
          <div className="2xl:h-[936px] 2xl:w-[349px] xl:h-[546px] xl:w-[204px] flex flex-row justify-center justify-center items-left">
            <Image
              className="h-full rounded-[20px]"
              src={AprilImage}
              alt="april image"
              priority />
          </div>
        </div>
        <div className="w-[80%] h-full flex flex-col justify-top items-center">
          <h1 className="mt-[20px] italic">{months[date.getMonth()]} {date.getFullYear()}, {days[date.getDay()]} </h1>
          <h2 className="mt-[20px]">Time: {date.getHours()} : {date.getMinutes()} :: {date.getSeconds()}</h2>
        </div>
      </div>
    </div>
  )
}