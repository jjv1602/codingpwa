import { timeStamp } from "console";

const addZero = (i: number) => {
  if (i < 10) {
    let formattedString = "0" + i;
    return formattedString;
  }
  return i;
};

export const getExactTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hour = addZero(date.getHours());
  let minute = addZero(date.getMinutes());
  return { hour, minute };
};

export const googleFormatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear(); // YYYY
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0"); 
  const hour = String(date.getHours()).padStart(2, "0"); // HH
  const minute = String(date.getMinutes()).padStart(2, "0"); // MM
  const second = String(date.getSeconds()).padStart(2, "0"); // SS, usually 00

  return `${year}${month}${day}T${hour}${minute}${second}`;
};
