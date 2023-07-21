import React, { useState } from "react";
import useThrottle from "./useThrottle";

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const [throttledCount, lastUpdated] = useThrottle(count, 1000);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>Throttled Count: {throttledCount}</p>
      <p>Last Updated: {lastUpdated}</p>
      <button onClick={handleClick}>Increment Count</button>
    </div>
  );
};

export default MyComponent;
