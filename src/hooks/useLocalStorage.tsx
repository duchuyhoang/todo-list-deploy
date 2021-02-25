import React, { useState } from "react";

const useLocalStorage = (key: string): any[] => {
  const [keyLocal] = useState<string>(key);
  const getData = () => {
    const local = localStorage.getItem(keyLocal);
    if (typeof local === "string") {
      return JSON.parse(local);
    } else return [];
  };
  const updateData = (arr: any[]) => {
    localStorage.setItem(keyLocal, JSON.stringify(arr));
  };

  return [getData, updateData];
};

export default useLocalStorage;
