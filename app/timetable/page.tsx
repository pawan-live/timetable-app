import GreetingCard from "@/components/GreetingCard/GreetingCard";
import MouduleCard from "@/components/ModuleCard/ModuleCard";

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

  const modules = [
    {
      moduleType: "Lecture",
      moduleName: "Case Studies in Software Engineering",
      moduleCode: "SE3170",
      timeDuration: "08:30 AM – 09:30 AM",
      locationName: "A-501",
    },
    {
      moduleType: "Tutorial",
      moduleName: "Data Structures and Algorithms",
      moduleCode: "SE3190",
      timeDuration: "09:30 AM – 10:30 AM",
      locationName: "B-508",
    },
    {
      moduleType: "Lab",
      moduleName: "Software Process Management",
      moduleCode: "SE3170",
      timeDuration: "10:30 AM – 12:30 AM",
      locationName: "G-501",
    },
  ];

  return (
    <div className='bg-gray-200 p-2 h-screen'>
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

      <div className='mt-16'>
        {modules.map((module, index) => (
          <MouduleCard
            key={index}
            moduleType={module.moduleType}
            moduleName={module.moduleName}
            moduleCode={module.moduleCode}
            timeDuration={module.timeDuration}
            locationName={module.locationName}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeTable;
