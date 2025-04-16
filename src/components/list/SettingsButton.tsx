"use client";
import { useState } from "react";

import SettingsFilterModal from "./SettingsFilterModal";
import CounterList from "./CounterList";
import { TbFilter } from "react-icons/tb";
const SettingsButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-neutral-500 dark:text-neutral-100"
      ><TbFilter className="text-xl"/>
    
      </button>
      <CounterList></CounterList>

      {open && <SettingsFilterModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default SettingsButton;
