import { useState, useEffect } from 'react';

const useThrottle = (value, delay) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const [lastUpdated, setLastUpdated] = useState(Date.now());

    useEffect(() => {
        const timer = setTimeout(() => {
            setThrottledValue(value);
            setLastUpdated(Date.now());
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return [throttledValue, lastUpdated];
};

export default useThrottle;
