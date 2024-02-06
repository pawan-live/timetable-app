import GreetingCard from "@/components/GreetingCard/GreetingCard";

const TimeTable = () => {
  const days = [
    {
      bgImage: "https://i.ibb.co/MptNYNz/greetingcard-Image.png",
      greetingText: "Good Morning",
      name: "Nisal",
      dayNumber: 6,
      dayText: "Saturday",
    },
  ];

  return (
    <div>
      {days.map((day, index) => (
        <GreetingCard
          key={index}
          bgImage={day.bgImage}
          greetingText={day.greetingText}
          name={day.name}
          dayNumber={day.dayNumber}
          dayText={day.dayText}
        />
      ))}
    </div>
  );
};

export default TimeTable;
