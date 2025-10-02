"use client";
import { getExactTime, googleFormatTimestamp } from "@/helper";
type EventCardProps = {
  startTimestamp: number;
  endTimestamp: number;
  link: string;
  eventTitle: string;
};

const EventCard = (props: EventCardProps) => {
  const { startTimestamp, endTimestamp, link, eventTitle } = props;
  const { hour: startHour, minute: startMin } = getExactTime(startTimestamp);
  const { hour: endHour, minute: endMin } = getExactTime(endTimestamp);
  return (
    <div className=" text-white mt-10 font-bold">
      <div className="w-full bg-primary py-3 px-4 rounded-xl">
        <div className="flex justify-between">
          <div className="max-w-[70%] truncate">{eventTitle}</div>
          <div className="text-secondary">
            {`${startHour}:${startMin}`} - {`${endHour}`}:{`${endMin}`}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <a href={link} target="_blank" className="text-secondary cursor-pointer">
            View Contest
          </a>
          <button
            className="bg-[#017bfe] text-white cursor-pointer p-2 rounded-md"
            onClick={() => {
              window.open(
                `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${googleFormatTimestamp(
                  startTimestamp
                )}/${googleFormatTimestamp(
                  endTimestamp
                )}&details=Contest+Link:+${link}`,
                "_blank"
              );
            }}
          >
            Add to calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
