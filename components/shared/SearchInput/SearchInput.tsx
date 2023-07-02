"use client";
import "./SearchInput.scss";

type SearchInputProps = {
  handleInput: (fullName: string) => void;
  name: string;
  placeholderText: string;
};

export default function SearchInput(
  { 
    handleInput,
    name,
    placeholderText
  }: SearchInputProps
){
  return (
    <input
      type="search"
      name={name}
      placeholder={placeholderText}
      id="name"
      onChange={(e) => handleInput(e.target.value)}
    />
  );
};