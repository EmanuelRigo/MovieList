"use client";
import FilterFormatsButtons from "../menu/FilterFormatsButtons";
import OrderListButtons from "../menu/OrderListButtons";
import CheckedFilter from "./CheckedFilter";
import { IoIosArrowBack } from "react-icons/io";

import React from "react";

const SettingsFilterModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-neutral-800 p-9 rounded-xl w-[90%] max-w-md shadow-lg flex flex-col justify-between min-h-72 ">
        <div className="flex-col flex-grow h-full  justify-center">
          <div className="border-b-2 border-neutral-950 pb-5 w-full flex justify-between">
            <FilterFormatsButtons></FilterFormatsButtons>
          </div>
          <div className="border-b-2 border-neutral-950 py-5 w-full flex justify-between text-3xl">
            <CheckedFilter className="w-2/3 py-3 text-neutral-600 dark:text-neutral-200 flex items-center gap-2 text-xl"></CheckedFilter>
            <OrderListButtons></OrderListButtons>
          </div>
          <div className="py-3"></div>
        </div>

        <button onClick={onClose} className="flex justify-end">
          <IoIosArrowBack className="text-blue-500 dark:text-yellow-500 text-3xl"></IoIosArrowBack>
        </button>
      </div>
    </div>
  );
};

export default SettingsFilterModal;
