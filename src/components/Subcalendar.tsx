"use client";
import { useStoreContext, useStoreDispatch } from "@/context";
import { DateListType } from "@/context/type";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

const Subcalendar = () => {
  const { calendarViewMode, baseDate, selectedDate } = useStoreContext();
  const dispatch = useStoreDispatch();
  const weekSelected = calendarViewMode === "week";
  const [dates, setDates] = useState<DateListType[]>([]);

  useEffect(() => {
    computeDateItems(baseDate);
  }, [baseDate]);

  const computeDateItems = (baseDate?: Date) => {
    const result: DateListType[] = [];
    const start = baseDate ? new Date(baseDate) : new Date();
    start.setHours(0, 0, 0, 0);

    for (let i = 0; i < 4; i++) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);

      const item = {
        date: current,
        dateNumeric: current.getDate().toString(),
        month: current.toLocaleString("en-US", { month: "short" }),
      };

      result.push(item);
      if (i == 0) {
        dispatch({
          type: "STORE_STATE",
          payload: {
            selectedDate: current,
          },
        });
      }
    }

    setDates(result);
  };

  const selectHandler = (item: Date) => {
    dispatch({
      type: "STORE_STATE",
      payload: {
        selectedDate: item,
      },
    });
  };

  return (
    <div className="mt-10 w-full px-[15%]">
      {weekSelected ? (
        <div className="flex items-center justify-between ">
          {dates.map((item, i) => (
            <div
              className={cn(
                "bg-primary flex items-center flex-col text-white rounded-2xl p-4 gap-2 hover:scale-120 cursor-pointer hover:bg-secondary",
                item.date === selectedDate && "bg-secondary"
              )}
              key={i}
              onClick={() => selectHandler(item.date)}
            >
              <div className="text-xs font-bold">{item.dateNumeric}</div>
              <div className="text-sm">{item.month}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center flex-col text-white rounded-2xl p-4 gap-2 hover:scale-105  bg-secondary w-full">
          <div className="text-xs font-bold">
            {selectedDate?.getDate().toString()}
          </div>
          <div className="text-sm">
            {selectedDate?.toLocaleString("en-US", { month: "short" })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Subcalendar;
