import React, { createContext, useState } from "react";

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState([]);

  const addToSchedule = (item) => {
    setSchedule((prev) => [...prev, item]);
  };

  return (
    <ScheduleContext.Provider value={{ schedule, addToSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};
