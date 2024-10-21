import { useEffect, useState } from "react";

// creating a custom hook for debouncing
const useDebounce=(value,delay)=>{
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);


    return debouncedValue;

}
export default useDebounce