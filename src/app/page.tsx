"use client";
import { useRequest } from "@/api/customHook";
import {
  ContestInfoResponse,
  ErrorResponseType,
  HttpMethod,
} from "@/api/types";
import EventCard from "@/components/EventCard";
import Heading from "@/components/Heading";
import Subcalendar from "@/components/Subcalendar";
import Tabs from "@/components/Tabs";
import { useStoreContext, useStoreDispatch } from "@/context";
import { builderFormatDataIntoMap } from "@/context/helper";
import { formatDateToYYYYMMDD } from "@/helper";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import NoEventsFoundImage from "../../public/noEventsFound.png";

export default function Home() {
  const { competitionMap, contestData, selectedDate } = useStoreContext();
  const dispatch = useStoreDispatch();
  const getApiInfo = useRequest<void, ContestInfoResponse, ErrorResponseType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponseType>();

  const getContestData = (contestFilter?: string) => {
    const dateKey = formatDateToYYYYMMDD(selectedDate as Date);
    const getAllContestOfThatDate = competitionMap?.get(dateKey);
    console.log({ getAllContestOfThatDate });
    if (!getAllContestOfThatDate) {
      dispatch({
        type: "STORE_STATE",
        payload: {
          contestData: null,
        },
      });
      return;
    }
    if (contestFilter?.trim()) {
      dispatch({
        type: "STORE_STATE",
        payload: {
          contestData: getAllContestOfThatDate?.get(contestFilter) ?? [],
        },
      });
    }

    const combined: ContestInfoResponse = Array.from(
      getAllContestOfThatDate.values()
    ).flat();

    combined.sort((a, b) => a.startTime - b.startTime);

    dispatch({
      type: "STORE_STATE",
      payload: {
        contestData: combined,
      },
    });

    return;
  };

  useEffect(() => {
    getContestData();
  }, [competitionMap, selectedDate]);

  useEffect(() => {
    getApiInfo.makeRequest(
      "https://competeapi.vercel.app/contests/upcoming/",
      HttpMethod.GET
    );
  }, []);

  useEffect(() => {
    if (getApiInfo.apiData) {
      const updatedData = builderFormatDataIntoMap(getApiInfo.apiData);

      dispatch({
        type: "STORE_STATE",
        payload: {
          competitionMap: updatedData,
        },
      });
      const today = new Date();
    }
  }, [getApiInfo.apiData]);

  useEffect(() => {
    setLoading(getApiInfo.loading);
  }, [getApiInfo.loading]);

  useEffect(() => {
    if (getApiInfo.error) {
      setError(getApiInfo.error);
    }
  }, [getApiInfo.error]);

  return (
    <div className="w-[432px] h-[932px] justify-center p-4 ">
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <Heading />
          <Tabs />
          <Subcalendar />

          {!contestData?.length ? (
            <div className="flex items-center justify-center flex-col pt-[20%] gap-10">
              <Image
                src={NoEventsFoundImage}
                alt="no events "
                className=" p-0"
              />
              <div className="text-white text-2xl font-bold text-center mx-[5%]">
                No events found for the selected date
              </div>
            </div>
          ) : (
            contestData?.map((content, index) => (
              <EventCard
                key={index}
                eventTitle={content.title}
                startTimestamp={content.startTime}
                endTimestamp={content.endTime}
                link={content.url}
              />
            ))
          )}
        </Fragment>
      )}
    </div>
  );
}
