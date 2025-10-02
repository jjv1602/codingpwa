"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FilterIcon,
} from "@/assets/icons/Icons";
import { useStoreContext, useStoreDispatch } from "@/context";
import { CalendarViewModeType } from "@/context/type";
import { cn } from "@/utils";

const Tabs = () => {
  const { calendarViewMode } = useStoreContext();
  const dispatch = useStoreDispatch();
  const weekSelected = calendarViewMode === "week";
  const setDurationClick = (calendarViewMode: CalendarViewModeType) => {
    dispatch({
      type: "STORE_STATE",
      payload: {
        calendarViewMode: calendarViewMode,
      },
    });
  };
  return (
    <div className="flex items-center mt-5 px-2">
      <ArrowLeftIcon className="text-white size-6 cursor-pointer" />
      <div className="flex items-center justify-between w-[30%] ml-auto mr-auto ">
        <div
          className={cn(
            " cursor-pointer text-white",
            !weekSelected && "text-secondary"
          )}
          onClick={() => setDurationClick("day")}
        >
          Day
          {!weekSelected && <div className="h-0.5 w-full bg-secondary"></div>}
        </div>

        <div
          className={cn(
            " cursor-pointer text-white",
            weekSelected && "text-secondary"
          )}
          onClick={() => setDurationClick("week")}
        >
          Week
          {weekSelected && <div className="h-0.5 w-full bg-secondary"></div>}
        </div>
      </div>
      <ArrowRightIcon className="text-white size-6 cursor-pointer" />
    </div>
  );
};
export default Tabs;
