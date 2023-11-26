"use client";

import React, { useState } from "react";

export default function Clock(toggle: any) {
  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    setTime(time);
  };
  setInterval(UpdateTime);

  return (
    <span
      className={`${
        toggle ? "text-sm pl-2" : "text-4xl pl-3"
      } font-bold transition-all duration-500`}
    >
       {ctime}
    </span>
  );
}
