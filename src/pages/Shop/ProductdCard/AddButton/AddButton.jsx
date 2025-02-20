import React, { useState } from "react";
//Images
import AddLogo from "../../../../assets/svg/Add.svg?react";
//Styles
import styles from './style.module.css'

const AddButton = ({onClick}) => {

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative inline-flex pt-[2px] bg-transparent border-0 cursor-pointer transition-transform duration-300 ease-in-out ${isClicked ? styles.clicked : ""}
      }`}
    >
      <AddLogo className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125 hover:opacity-70 " />
    </button>
  );
};

export default AddButton;
