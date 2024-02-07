const getModuleColor = (moduleType: string) => {
  if (moduleType === "Tutorial") {
    return "bg-lime-300 text-lime-600";
  } else if (moduleType === "Lecture") {
    return "bg-blue-300 text-blue-600";
  } else if (moduleType === "Lab") {
    return "bg-yellow-300 text-yellow-600";
  }
};

export default getModuleColor;
