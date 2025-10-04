"use client";
import { useStoreContext } from "@/context";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
type dateType = {
  date: string;
  month: string;
  startTimestamp: number;
  endTimestamp: number;
};
const Subcalendar = ({
  updateFilter,
}: {
  updateFilter: (timestamp: number) => void;
}) => {
  const { calendarViewMode } = useStoreContext();
  const [selectedDate, setSelectedDate] = useState<dateType>();

  const weekSelected = calendarViewMode === "week";
  const [dates, setDates] = useState<dateType[]>([]);
  useEffect(() => {
    computeDate();
  }, []);
  const computeDate = () => {
    const result: {
      date: string;
      month: string;
      startTimestamp: number;
      endTimestamp: number;
    }[] = [];
    const today = new Date();
    for (let i = 0; i < 4; i++) {
      const current = new Date(today);
      current.setDate(today.getDate() + i);
      const start = new Date(current);
      start.setHours(0, 0, 0, 0);
      const end = new Date(current);
      end.setHours(23, 59, 59, 999);

      const item = {
        date: current.getDate().toString(),
        month: current.toLocaleString("en-US", { month: "short" }),
        startTimestamp: start.getTime(),
        endTimestamp: end.getTime(),
      };
      result.push(item);

      if (i == 0) {
        setSelectedDate(item);
      }
    }

    setDates(result);
  };
  const selectHandler = (item: dateType) => {
    updateFilter?.(item.startTimestamp);
    setSelectedDate(item);
  };
  console.log(dates);
  return (
    <div className="mt-10 w-full px-[15%]">
      {weekSelected ? (
        <div className="flex items-center justify-between ">
          
          {dates.map((item, i) => (
            <div
              className={cn(
                "bg-primary flex items-center flex-col text-white rounded-2xl p-4 gap-2 hover:scale-120 cursor-pointer hover:bg-secondary",
                item === selectedDate && "bg-secondary"
              )}
              key={i}
              onClick={() => selectHandler(item)}
            >
              <div className="text-xs font-bold">{item.date}</div>
              <div className="text-sm">{item.month}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-primary flex items-center flex-col text-white rounded-2xl p-4 gap-2 hover:scale-105  hover:bg-secondary w-full">
          <div className="text-xs font-bold">{selectedDate?.date}</div>
          <div className="text-sm">{selectedDate?.month}</div>
        </div>
      )}
    </div>
  );
};
export default Subcalendar;
