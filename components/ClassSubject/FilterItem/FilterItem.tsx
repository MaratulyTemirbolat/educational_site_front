"use client";
import "./FilterItem.scss";
import ArrowIcon from "@/components/shared/icons/ArrowIcon/ArrowIcon";

type FilterItemProps = {
  titleName: string;
  options: Array<any> | undefined;
  searchName: string;
  handleChangeOption: (searchName: string, id: number) => void;
  isClass: boolean;
};

export default function FilterItem(
  {
    titleName,
    searchName,
    options,
    handleChangeOption,
    isClass=false,
  }: FilterItemProps
) {
  return (
    <div className="filter__item">
      <input
        type="checkbox"
        className="item__fake__checboxes"
        id={`item__fake__checkbox__${searchName}`}
      />
      <label htmlFor={`item__fake__checkbox__${searchName}`}>
        <div className="title__name">{titleName}</div>
        <div className="icon__wrapper"><ArrowIcon /></div>
      </label>
      <div className="filter__options">
        {options?.map(({id, name, number}) => (
          <div key={id} className="filter__option">
            <input
              type="radio"
              id={name ? name: number}
              name={titleName}
              value={id}
              className="radio__option"
              onChange={() => handleChangeOption(searchName, id)}
            />
            <label htmlFor={name ? name: number}>{name ? name: number} {isClass ? "класс" : ""}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
