import { ContestInfoResponse } from "@/api/types";
import { ContestStructure } from "./type";
import { formatDateToYYYYMMDD } from "@/helper";
import { useStoreContext, useStoreDispatch } from ".";

export const builderFormatDataIntoMap = (
  data: ContestInfoResponse
): ContestStructure => {
  const dateContestMap: ContestStructure = new Map();
  for (const item of data) {
    const dateKey = formatDateToYYYYMMDD(item.startTime);
    if (!dateContestMap.has(dateKey)) {
      dateContestMap.set(dateKey, new Map());
    }
    const nestedContestMap = dateContestMap.get(dateKey)!;

    if (!nestedContestMap.has(item.site)) nestedContestMap.set(item.site, []);

    nestedContestMap.get(item.site)!.push(item);
  }
  return dateContestMap;
};


