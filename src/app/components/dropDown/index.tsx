"use client";
import { useEffect, useRef, useState } from "react";
export default function DropDownContainer({
  label,
  options,
  priority,
  setPriority,
}: {
  label: string;
  options: string[];
  priority: string;
  setPriority: (priority: string) => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<any>();
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-4 ">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          className="w-full text-left bg-white p-2 rounded-sm"
          onClick={() => {
            setShow((show) => !show);
          }}
        >
          {priority ? priority : `Select ${label}`}
        </button>

        <div
          ref={ref}
          className={`appearance-none border rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-purple-50 absolute top-10 shadow-md left-0 max-h-40 overflow-scroll w-full flex  flex-col z-2  ${
            show ? "" : "hidden"
          }`}
        >
          {options.map((option, index) => (
            <div
              className="cursor-pointer p-2 hover:bg-purple-300 hover:text-white"
              onClick={() => {
                setPriority(option);
                setShow((show) => !show);
              }}
              key={index}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
