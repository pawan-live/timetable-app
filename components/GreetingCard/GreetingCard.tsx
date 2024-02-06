import React from "react";
import "tailwindcss/tailwind.css";

const GreetingCard = ({
  bgImage,
  greetingText,
  name,
  dayNumber,
  dayText,
}: {
  bgImage: string;
  greetingText: string;
  name: string;
  dayNumber: number;
  dayText: string;
}) => {
  return (
    <div
      className='relative rounded-2xl overflow-hidden shadow-lg bg-cover bg-center pl-4 pr-4 mt-2 w-96 h-32'
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
      }}>
      <div className='absolute bottom-0 left-0 text-left pb-2 pl-4 text-gray-200'>
        <div className='text-greetingCardgreeting'>
          {greetingText}, {name}!
        </div>
        <p className='font-semibold text-greetingCardDate'>
          {dayText}, {dayNumber}
        </p>
      </div>
    </div>
  );
};

export default GreetingCard;
