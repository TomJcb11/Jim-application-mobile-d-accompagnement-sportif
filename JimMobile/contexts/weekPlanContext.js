import React, { createContext, useState } from 'react';

const WeekPlanContext = createContext({
  userProviding: {},
  programData: {},
  weekPlan: {},
  setUserProviding: () => {},
  setProgramData: () => {},
  setWeekPlan: () => {},
});

export const WeekPlanProvider = ({ children }) => {
  const [userProviding, setUserProviding] = useState({});
  const [programData, setProgramData] = useState({});
  const [weekPlan, setWeekPlan] = useState({});

  return (
    <WeekPlanContext.Provider value={{ userProviding, setUserProviding, programData, setProgramData, weekPlan, setWeekPlan }}>
      {children}
    </WeekPlanContext.Provider>
  );
};

export default WeekPlanContext;