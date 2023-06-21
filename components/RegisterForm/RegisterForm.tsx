"use client";
import "./RegisterForm.scss";

import {
  useState,
  useMemo,
  useCallback,
  FormEvent,
  useEffect,
} from "react";
import { useSWRConfig } from "swr";
import * as localForage from "localforage";
import { useRouter } from 'next/navigation'

import PasswordInput from "../shared/PasswordInput/PasswordInput";
import Button from "../shared/Buttons/Button";

import { isValidForm, isValidInputForm } from "../../tools/validators";
import { fetcher } from "../../services/helpers/fetcher";
import { useUser } from "@/store/user.store";

type RegisterForm = {
  name: string;
  labelText: string;
  placeholderText: string;
  required: boolean;
  type: string;
  value: string;
  errorMsg: string;
}

const RegisterForm = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [user, setUser] = useUser((state: any) => [
    state.user,
    state.setUser
  ])
  console.log(user)
  const [registerFormList, setRegisterFormList] = useState<Array<RegisterForm>>([
    {
      name: "email",
      labelText: "Почта",
      placeholderText: "Введите почту",
      required: true,
      type: "email",
      value: "",
      errorMsg: " ",
    },
    {
      name: "last_name",
      labelText: "Фамилия",
      placeholderText: "Введите фамилию",
      required: true,
      type: "text",
      value: "",
      errorMsg: " ",
    },
    {
      name: "first_name",
      labelText: "Имя",
      placeholderText: "Введите имя",
      required: true,
      type: "text",
      value: "",
      errorMsg: " ",
    },
    {
      name: "password",
      labelText: "Пароль",
      placeholderText: "Введите пароль",
      required: true,
      type: "password",
      value: "",
      errorMsg: " ",
    },
  ]);

  const handleChangeInput = useCallback((e: any) => {
    const newArray = structuredClone(registerFormList);
    const { errorMsg } = isValidInputForm(e.target.name, e.target.value);
    const formInputInd = newArray.findIndex((formInp) => formInp.name == e.target.name);
    if (formInputInd != -1) {
      newArray[formInputInd].errorMsg = errorMsg;
      setRegisterFormList([...newArray]);
    }
  }, [registerFormList]);

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const validForm = useMemo(() => isValidForm(registerFormList), [registerFormList]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (validForm) {
      let res = await mutate(
        "http://localhost:8000/api/v1/auths/users/register_user",
        fetcher("http://localhost:8000/api/v1/auths/users/register_user", {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          body: formData
        })
      )
      if (!res?.isOk) {
        const newArray = structuredClone(registerFormList);
        let formInputInd: number = -1;
        for(const key of Object.keys(res?.response)){
          formInputInd = newArray.findIndex((formInput: RegisterForm) => formInput.name === key);
          if (formInputInd != -1) {
            newArray[formInputInd].errorMsg = res?.response[key];
          }
        }
        if (formInputInd != -1) setRegisterFormList([...newArray]);
      } else {
        localForage.setItem("access", res.response["access"]);
        localForage.setItem("refresh", res.response["refresh"]);
        setUser({
          id: res.response["data"]["id"],
          email: res.response["data"]["email"],
          firstName: res.response["data"]["first_name"],
          lastName: res.response["data"]["last_name"],
          datetime_created: new Date(res.response["data"]["datetime_created"]),
          isDeleted: res.response["data"]["is_deleted"],
          isStaff: res.response["data"]["is_staff"],
          isActive: res.response["data"]["is_active"],
          groups: res.response["data"]["groups"],
          student: res.response["data"]["student"],
          teacher: res.response["data"]["teacher"]
        })
        router.push("/");
      }
    }
  };
  const [modal, setModal] = useState(false);
  return (
    <>
      <div id="login__container">
        {!modal && (
          <div id="form__container">
            <div className="form__content">
              <div className="title__wrapper">
                <h1 className="form__title">Регистрация</h1>
              </div>
              <form
                method="post"
                onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                <div className="inputs">
                  {registerFormList.map((value, index) => (
                    <div key={index} className="reg__form__row">
                      <div className="reg__input__description">
                        <label className="reg__input__label">
                          {value.labelText}
                        </label>
                        <div className="reg__input__error">
                          {value.errorMsg}
                        </div>
                      </div>
                      <div className="input__wrapper">
                        {value.type != "password" ? (
                          <input
                            name={value.name}
                            type={value.type}
                            placeholder={value.placeholderText}
                            required={value.required}
                            onBlur={e => handleChangeInput(e)}
                          />
                        ) : (
                          <PasswordInput
                            name={value.name}
                            placeholder={value.placeholderText}
                            handleEventChange={handleChangeInput}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="reg__form__row">
                      <div className="reg__input__description">
                        <label className="reg__input__label">
                          Кем вы будете
                        </label>
                        <div className="reg__input__error">
                        </div>
                      </div>
                      <div className="input__wrapper" id="last_reg_wrapper">
                        <select name="position" id="position">
                          <option value="student">Студент</option>
                          <option value="teacher">Преподаватель</option>
                        </select>
                      </div>
                  </div>
                </div>

                <div className="enter__btn">
                  <Button
                    isEnable={validForm}
                    text={"Зарегестироваться"}
                    handleSuccess={() => {}}
                  />
                </div>
                <div className="form__footer">
                  Продолжая, вы принимаете
                  <span onClick={() => setModal(true)} id="user__agreement">
                    Пользовательское соглашение
                  </span>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* {modal && <ModalAgreement handleModal={handleModal} />} */}
      </div>
    </>
  )
};

export default RegisterForm;