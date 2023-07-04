"use client";
import "./InformMessage.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type InformMessageProps = {
  msg: string;
  isError?: boolean;
  handleClose: () => void;
};

export default function InformMessage({
  msg,
  isError = false,
  handleClose,
}: InformMessageProps) {
  return (
    <div
      className={`inform__container ${isError ? "error__cont" : ""}`}
    >
      {msg}
      <div onClick={handleClose} className="close__wrapper">
        <FontAwesomeIcon icon={faXmark}/>
      </div>
    </div>
  );
};