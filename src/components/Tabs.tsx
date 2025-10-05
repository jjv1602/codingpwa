"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/icons/Icons";
import { useStoreContext, useStoreDispatch } from "@/context";
import { CalendarViewModeType } from "@/context/type";
import { cn } from "@/utils";

const Tabs = () => {
  const { calendarViewMode, baseDate } = useStoreContext();
  const dispatch = useStoreDispatch();
  const weekSelected = calendarViewMode === "week";

  const updateNavigation = (navigation: "forward" | "backward") => {
    const isForwardNavigation = navigation === "forward";
    const daysToUpdate = calendarViewMode === "week" ? 4 : 1;
    const newDate = new Date(baseDate as Date) ?? new Date();
    newDate.setDate(
      (baseDate as Date).getDate() +
        (isForwardNavigation ? daysToUpdate : -daysToUpdate)
    );
    dispatch({
      type: "STORE_STATE",
      payload: {
        calendarViewMode: calendarViewMode,
        baseDate: newDate,
        selectedDate: newDate,
      },
    });
  };
  const setDurationClick = (calendarViewMode: CalendarViewModeType) => {
    dispatch({
      type: "STORE_STATE",
      payload: {
        calendarViewMode: calendarViewMode,
      },
    });
  };
  const setDefaultView = () => {
    dispatch({
      type: "STORE_STATE",
      payload: {
        calendarViewMode: "week",
        baseDate: new Date(),
        selectedDate: new Date(),
      },
    });
  };
  return (
    <div className="flex items-center mt-5 px-2">
      <ArrowLeftIcon
        className="text-white size-6 cursor-pointer"
        onClick={() => updateNavigation("backward")}
      />
      <div className="flex items-center justify-between w-[50%] ml-auto mr-auto ">
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

        <div
          className={cn(" cursor-pointer text-white")}
          onClick={() => setDefaultView()}
        >
          Default
        </div>
      </div>
      <ArrowRightIcon
        className="text-white size-6 cursor-pointer"
        onClick={() => updateNavigation("forward")}
      />
    </div>
  );
};
export default Tabs;
