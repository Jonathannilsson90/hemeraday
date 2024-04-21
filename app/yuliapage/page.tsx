"use client"

import AprilImage from "../../public/images/april.png"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";


interface TimeRangeArgs {
  start: Date;
  end: Date;
}

export default function YuliaPage() {
  const pictureInitialSize = { height: 780, width: 291 };
  const [isClient, setIsClient] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(date);
  const events: any = [];
  const [cellSize, setCellSize] = useState({ width: 0, height: 0 });
  const [weekSellSize, setWeekCellSize] = useState({ width: 0, height: 0 });
  const [backgroundSize, setBackgroungSize] = useState({ height: "", width: "" });
  const [pictureSize, setPictureSize] = useState({ height: "", width: "" });
  const [pictureBackgroundSize, setPictureBackgroungSize] = useState({ height: "", width: "" });
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",

    onTimeRangeSelected: async (args: any) => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("This is DayPilot dialog");
      dp.clearSelection();
      if (!modal.result) { return; }
    },

  });

  const calendarRef = useRef<InstanceType<typeof DayPilotCalendar>>(null);

  useEffect(() => {
    setIsClient(true);
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

      let pHeight, pWidth, backHeigth, backWidth: number;
      if (window.innerWidth >= 1536) {
        backHeigth = 1024;
        backWidth = 1500;
        pHeight = pictureInitialSize.height * 1.2;
        pWidth = pictureInitialSize.width * 1.2;
      } else if (window.innerWidth >= 1280) {
        backHeigth = 700;
        backWidth = 1100;
        pHeight = pictureInitialSize.height * 0.75;
        pWidth = pictureInitialSize.width * 0.75;
      } /* else if (window.innerWidth >= 1024) {
        backHeigth = 428;
        backWidth = 926;
        pHeight = 585;
        pWidth = 218;
      } else if (window.innerWidth >= 768) {
        backHeigth = 620;
        backWidth = 1133;
        pHeight = pictureInitialSize.height * 0.5;
        pWidth = pictureInitialSize.width * 0.5;
      }*/ else {
        pHeight = pictureInitialSize.height * 0.5;
        pWidth = pictureInitialSize.width * 0.5;
        backHeigth = 0, 75 * width;
        backWidth = height;
      }


      setPictureSize({ height: `${pHeight}px`, width: `${pWidth}px` });
      setPictureBackgroungSize({ height: `${pHeight + 20}px`, width: `${pWidth + 20}px` });
      setBackgroungSize({ height: `${backHeigth}px`, width: `${backWidth}px` });

      const cellWidth = pWidth / 8;
      const cellHeight = pWidth / 8;
      setCellSize({ width: cellWidth, height: cellHeight });

      const weekCellWidth = backWidth / 20;
      const weekCellHeight = backHeigth / 25;
      setWeekCellSize({ width: weekCellWidth, height: weekCellHeight });

    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  console.log(parseInt(pictureSize.width, 10));
  console.log(cellSize.width);
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  if (!date) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[85vh] box-border w-[100vw] bg-gray-300  flex flex-col justify-center items-center">

      <div style={{ height: backgroundSize.height, width: backgroundSize.width }}
        className="bg-gradient-to-r from-red-200 to-cyan-200 flex flex-row justify-between items-center">
        {/* calendar area*/}
        <div style={{ height: pictureBackgroundSize.height, width: pictureBackgroundSize.width }}
          className="flex flex-col justify-center items-center bg-cyan-600 rounded-[20px] ml-[10px] relative">
          <div style={{ height: pictureSize.height, width: pictureSize.width }}
            className="flex flex-row justify-center items-left">
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
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-50  hover:opacity-80 transition-opacity duration-200">
            <div className="mt-[20px]">
              <DayPilotNavigator
                selectMode={"Week"}
                showMonths={1}
                skipMonths={1}
                startDate={date}
                selectionDay={startDate}
                cellWidth={cellSize.width}
                cellHeight={cellSize.height}
                onTimeRangeSelected={(args: { day: any }) => {
                  if (calendarRef.current) {
                    calendarRef.current.control.update({
                      startDate: args.day
                    });
                    setStartDate(args.day);
                  }
                }}
              />
            </div>
          </div>
          <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center">
            <button className="w-[70%] h-[40px] bg-yellow-400 rounded-[10px] hover:bg-yellow-500 transition-bg duration-200 opacity-50 hover:opacity-80 transition-opacity duration-200 my-2 font-roboto">
              Birthdays
            </button>
            <button className="w-[70%] h-[40px] bg-red-400 rounded-[10px] hover:bg-red-500 transition-bg duration-200 opacity-50 hover:opacity-80 transition-opacity duration-200 my-2 font-roboto">
              Weather
            </button>
            <button className="w-[70%] h-[40px] bg-lime-400 rounded-[10px] hover:bg-lime-500 transition-bg duration-200 opacity-50 hover:opacity-80 transition-opacity duration-200 my-2 font-roboto">
              Swidish Holidays
            </button>
            <button className="w-[70%] h-[40px] bg-cyan-400 rounded-[10px] hover:bg-cyan-500 transition-bg duration-200 opacity-50 hover:opacity-80 transition-opacity duration-200 my-2 font-roboto">
              Worldwide Holidays
            </button>
          </div>
        </div>
        {/* /calendar area*/}
        <div className="xl:w-[75%] 2xl:w-[75%] lg:w-[75%] h-full flex flex-col justify-top items-center">
          <div className="flex flex-row justify-top items-center font-bold h-[10%]">
            <h1 className="mt-[20px] font-pacifico mr-4 text-h1">{months[date.getMonth()]} {date.getFullYear()}, {days[date.getDay()]}, </h1>
            <h2 className="mt-[20px] font-pacifico text-h2 min-w-[130px]">
              {date.getHours()} : {date.getMinutes()}
              {isClient && ` :: ${date.getSeconds()}`}
            </h2>
          </div>
          <div className="mx-2 my-2 flex flex-col justify-center items-center h-[90%]">
            <DayPilotCalendar
              cellWidth={weekSellSize.width}
              cellHeight={weekSellSize.height}
              {...calendarConfig}
              ref={calendarRef}
            />
          </div>
        </div>
      </div>
    </div>
  )
}