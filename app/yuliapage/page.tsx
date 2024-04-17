"use client"

import AprilImage from "../../public/images/april.png"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";

export default function YuliaPage() {
  const [date, setDate] = useState(new Date());
  const startDate = new Date();
  const events: any = [];
  const [cellSize, setCellSize] = useState({ width: 0, height: 0 });
  //const [pictureWidth, setPictureWidth] = useState(0); //TODO: count picture size
  const calendarRef = useRef<InstanceType<typeof DayPilotCalendar>>(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.control.update({ startDate, events });
    }
  }, [startDate, events]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cellWidth = Math.max(28, Math.floor(width / 50));
      const cellHeight = Math.max(28, Math.floor(height / 30));

      setCellSize({ width: cellWidth, height: cellHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  if (!date) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[85vh] box-border w-[100vw] bg-gray-300  flex flex-col justify-center items-center">

      <div className="2xl:h-[1117px] 2xl:w-[1728px] 
                      xl:h-[620px] xl:w-[1133px] 
                      bg-gradient-to-r from-red-200 to-cyan-200 flex flex-row justify-between items-center">
        {/* calendar area*/}
        <div className="2xl:h-[1034px] 2xl:w-[398px] 
                        xl:h-[605px] xl:w-[238px] 
                        flex flex-col justify-center items-center 
                        bg-cyan-600 rounded-[20px] ml-[10px] relative">
          <div className="2xl:h-[1014px] 2xl:w-[378px] 
                          xl:h-[585px] xl:w-[218px] 
                          flex flex-row justify-center items-left">
            <Image
              className="h-full rounded-[20px]"
              src={AprilImage}
              alt="april image"
              priority
              style={{
                objectFit: 'cover',
                zIndex: 0
              }} />
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2  w-[200px], h-[200px] opacity-50  hover:opacity-80 transition-opacity duration-200">
            <div className="mt-[20px]">
              <DayPilotNavigator
                selectMode={"Week"}
                showMonths={1}
                skipMonths={1}
                startDate={date}
                selectionDay={date}
                cellWidth={cellSize.width}
                cellHeight={cellSize.height}
              />
            </div>
          </div>
          <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]  flex flex-col justify-center items-center">
              <button className="w-[80%] h-[40px] bg-yellow-400 rounded-[20px] hover:bg-yellow-500 transition-bg duration-200 opacity-50 hover:opacity-80 transition-opacity duration-200 my-2">
                Birthdays
              </button>
              <button className="w-[80%] h-[40px] bg-red-400 rounded-[20px] hover:bg-red-500 transition-bg duration-200 opacity-50 hover:opacity-80 transition-opacity duration-200 my-2">
                Weather
              </button>
              <button className="w-[80%] h-[40px] bg-lime-400 rounded-[20px] hover:bg-lime-500 transition-bg duration-200 opacity-50 hover:opacity-80 transition-opacity duration-200 my-2">
                Swidish Holidays
              </button>
              <button className="w-[80%] h-[40px] bg-cyan-400 rounded-[20px] hover:bg-cyan-500 transition-bg duration-200 opacity-50 hover:opacity-80 transition-opacity duration-200 my-2">
                Worldwide Holidays
              </button>
            </div>
        </div>
        {/* /calendar area*/}
        <div className="xl:w-[75%] 2xl:w-[75%] h-full flex flex-col justify-top items-center">
          <h1 className="mt-[20px] italic">{months[date.getMonth()]} {date.getFullYear()}, {days[date.getDay()]} </h1>
          <h2 className="mt-[20px]">Time: {date.getHours()} : {date.getMinutes()} :: {date.getSeconds()}</h2>
        </div>
      </div>
    </div>
  )
}