"use client";
import "./ClassSubjectFilter.scss";

import useSWR from "swr";
import {
  // ReadonlyURLSearchParams,
  usePathname,
  // useSearchParams,
  // useRouter,
} from "next/navigation";
import {
  useState,
  // useMemo,
} from "react";

import { fetcher } from "@/services/helpers/fetcher";
import FilterItem from "../FilterItem/FilterItem";
import Button from "@/components/shared/Buttons/Button";
import { getReplacedInsertedParamToPath } from "@/tools/navigation";
import {
  Class,
  GeneralSubject
} from "@/models/subjects.models";
import { useClassGenSubjectStore } from "@/store/subjects.store";

type FilterModalProps = {
  page: string | undefined;
  classID: string | undefined;
  genSubjectID: string | undefined;
};

type FilterOptions = {
  classID: string;
  genSubjectID: string;
};

export default function FilterModal() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    classID: "",
    genSubjectID: ""
  });
  const [setClassID, setGenSubjectID] = useClassGenSubjectStore((state) => [
    state.setClassID,
    state.setGenSubjectID
  ]);
  const pathNoParams: string = usePathname();
  const classes = useSWR<{ isOk: boolean, response: { data: Array<Class> }}>(
    "http://localhost:8000/api/v1/subjects/classes",
    fetcher
  );
  const generalSubjects = useSWR<{ isOk: boolean, response: { data: Array<GeneralSubject> }}>(
    "http://localhost:8000/api/v1/subjects/general_subjects",
    fetcher
  );
  const handleChaneOption = (searchName: string, id: number) => {
    const newObj: any = Object.assign({}, filterOptions);
    newObj[searchName] = String(id);
    setFilterOptions(newObj);
  };
  const handleConfirm = (): void => {
      // let path: string = pathNoParams;
      // for(let [key, value] of Object.entries(filterOptions)){
      //   if (value.trim()){
      //     path = getReplacedInsertedParamToPath(
      //       path,
      //       value,
      //       searchParams,
      //       key
      //     )
      //   }
      // }
      // router.push(path);
      setClassID(filterOptions.classID);
      setGenSubjectID(filterOptions.genSubjectID);
  };
  return (
    <div className="filter__container">
      <div className="filter__title">Фильтр предметов</div>
      <div className="filter__body">
        {classes.data?.isOk && <FilterItem
          titleName="Класс"
          searchName="classID"
          options={classes.data.response.data}
          handleChangeOption={handleChaneOption}
          isClass={true}
        />}
        {
          generalSubjects.data?.isOk &&
          <FilterItem
            titleName="Предмет"
            searchName="genSubjectID"
            options={generalSubjects.data.response.data}
            handleChangeOption={handleChaneOption}
            isClass={false}
          />
        }
      </div>
      <div className="confirmation__button">
        <Button
          text="Применить"
          isEnable={true}
          handleSuccess={handleConfirm}
        />
      </div>
    </div>
  );
};