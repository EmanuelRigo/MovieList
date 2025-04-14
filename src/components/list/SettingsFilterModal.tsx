"use client";
import FilterFormatsButtons from "../menu/FilterFormatsButtons";
import OrderListButtons from "../menu/OrderListButtons";

import React from "react";

const SettingsFilterModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl w-[90%] max-w-md shadow-lg flex flex-col">
        <FilterFormatsButtons></FilterFormatsButtons>
        <OrderListButtons></OrderListButtons>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SettingsFilterModal;
