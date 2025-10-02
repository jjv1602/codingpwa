"use client";
import { useStoreContext } from "@/context";
import { useEffect, useState } from "react";

const Subcalendar = () => {
  const { calendarViewMode } = useStoreContext();

  const weekSelected = calendarViewMode === "week";
  const [dates, setDates] = useState<any>([]);
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

    for (let i = 0; i < 6; i++) {
      const current = new Date(today);
      current.setDate(today.getDate() + i);
      const start = new Date(current);
      start.setHours(0, 0, 0, 0);
      const end = new Date(current);
      end.setHours(23, 59, 59, 999);

      result.push({
        date: current.getDate().toString(),
        month: current.toLocaleString("en-US", { month: "short" }),
        startTimestamp: start.getTime(),
        endTimestamp: end.getTime(),
      });
    }

    setDates(result);
  };

  return (
    <div className="mt-10">
      {weekSelected ? (
        <div className="flex items-center justify-between ">
          {dates.map((item, i) => (
            <div
              className="bg-primary flex items-center flex-col text-white rounded-2xl p-4 gap-2 hover:scale-120  hover:bg-secondary cursor-pointer  "
              key={i}
            >
              <div className="text-xs font-bold">{item.date}</div>
              <div className="text-sm">{item.month}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-primary flex items-center flex-col text-white rounded-2xl p-4 gap-2 hover:scale-105  hover:bg-secondary w-full">
          <div className="text-xs font-bold">23</div>
          <div className="text-sm">23</div>
        </div>
      )}
    </div>
  );
};
export default Subcalendar;
