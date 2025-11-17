"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Orange_btn = (props) => {
  const router = useRouter();

  const handleClick = () => {
    if (props.href) {
      router.push(props.href);
    }
  };

  return (
    <div className="orange_btns">
      <button className={props.class} onClick={handleClick}>
        {props.text}
      </button>
    </div>
  );
};

export default Orange_btn;
