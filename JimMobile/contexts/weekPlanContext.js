import React, { createContext, useState } from 'react';

const WeekPlanContext = createContext({
  userProviding: {},
  programData: {},
  weekPlan: {},
  weekPlanId:{},
  setUserProviding: () => {},
  setProgramData: () => {},
  setWeekPlan: () => {},
  setweekPlanId:()=>{},
});

export const WeekPlanProvider = ({ children }) => {
  const [userProviding, setUserProviding] = useState({});
  const [programData, setProgramData] = useState({});
  const [weekPlan, setWeekPlan] = useState({});
  const [weekPlanId, setweekPlanId] = useState(null);

  return (
    <WeekPlanContext.Provider value={{ userProviding, setUserProviding, programData, setProgramData, weekPlan, setWeekPlan,weekPlanId, setweekPlanId}}>
      {children}
    </WeekPlanContext.Provider>
  );
};

export default WeekPlanContext;