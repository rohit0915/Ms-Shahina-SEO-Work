/** @format */

export const ViewDescription = ({ description }) => {
  return <div dangerouslySetInnerHTML={{ __html: description }} />;
};

export const getCorrectTime = (time) => {
  const updateTime = new Date(time);
  const timezoneOffset = updateTime?.getTimezoneOffset();
  const adjustedTime = new Date(updateTime.getTime() + timezoneOffset * 60000);
  const format = adjustedTime?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return format;
};

export const getCorrectTime2 = (time) => {
  const updateTime = new Date(time);
  const timezoneOffset = updateTime?.getTimezoneOffset();
  const adjustedTime = new Date(updateTime.getTime() + timezoneOffset * 60000);
  return adjustedTime;
};



export const getServiceDate = (time) => {
  const updateTime = new Date(time);
  const timezoneOffset = updateTime?.getTimezoneOffset();
  const adjustedTime = new Date(updateTime.getTime() + timezoneOffset * 60000);
  const month = adjustedTime.getMonth() + 1;
  const day = adjustedTime.getDate();
  const year = adjustedTime.getFullYear();
  const hasAll = month && year && day;
  const TimeForm = adjustedTime?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    hasAll &&
    `${month <= 9 ? `0${month}` : month}-${
      day <= 9 ? `0${day}` : day
    }-${year} ${TimeForm} `
  );

}