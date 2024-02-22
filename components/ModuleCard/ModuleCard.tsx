import getModuleColor from "@/utils/helpers/getModuleTypeColor";
import React from "react";

const ModuleCard = ({
  moduleType,
  moduleName,
  moduleCode,
  timeDuration,
  locationName,
}: {
  moduleType: string;
  moduleName: string;
  moduleCode: string;
  timeDuration: string;
  locationName: string;
}) => {
  return (
    <div className='flex bg-white rounded-lg shadow-md w-96 h-28 mt-4 '>
      <div
        className={`flex flex-col rounded-s-lg w-6 h-28 p-2 ${getModuleColor(
          moduleType
        )}`}>
        <div
          className='text-moduleType font-bold  transform rotate-180 uppercase tracking-moduleType '
          style={{ writingMode: "vertical-rl", alignSelf: "center" }}>
          {moduleType}
        </div>
      </div>

      <div className='flex flex-col ml-4 mt-2 mr-2'>
        <div className='flex flex-row justify-between gap-20'>
          <div className='text-black text-sm font-semibold w-52'>
            {moduleName}
          </div>
          <div className='text-location rounded-lg bg-gray-200 w-12 text-center h-6  text-gray-700 mb-2 flex items-center pr-1'>
            <img
              src='https://i.ibb.co/8BSDCPp/building.png'
              alt='Location Icon'
              className='mr-1 ml-1'
            />

            {locationName}
          </div>
        </div>

        <div className='text-gray-600 text-xs'>{moduleCode}</div>
        <div className='text-gray-400 font-semibold mt-auto mb-2'>
          {timeDuration}
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
