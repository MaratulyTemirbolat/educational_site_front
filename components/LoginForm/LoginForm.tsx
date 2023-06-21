"use client";
import "./LoginForm.scss";

import { useRouter } from "next/navigation";
import { setItem } from "localforage";
import {
    useEffect,
    FormEvent,
    useState,
    useMemo,
} from "react";

import { useUser, UseUser } from "@/store/user.store";
import { isValidEmail } from "@/tools/validators";
import PasswordInput from "../shared/PasswordInput/PasswordInput";
import Button from "../shared/Buttons/Button";
import { useSWRConfig } from "swr";
import { fetcher, PomiseResponse } from "@/services/helpers/fetcher";

export default function LoginForm() {
    const { mutate } = useSWRConfig();
    const [modal, setModal] = useState<boolean>(false);
    const [user, setUser] = useUser((state: UseUser) => [
        state.user,
        state.setUser
    ]);
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [generalError, setGeneralError] = useState<string>("");
    
    useEffect(() => {if (user) router.push('/')}, [user]);
    console.log(user);
    const isValidPassword = (): boolean => {
        if (!password.trim()) {
            setPasswordError("Пароль должен быть предоставлен!");
            return false;
        }
        setPasswordError("");
        return true;
    };
    const isValidEm = (): boolean => {
        const emailError: {errorMsg: string} = isValidEmail(email);
        if (emailError.errorMsg) {
            setEmailError(emailError.errorMsg);
            return false;
        }
        setEmailError("");
        return true;
    }
    const isValidForm = useMemo(() => {
        return (isValidEm() && isValidPassword());
    }, [email, password]);

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGeneralError("");
        const formData: FormData = new FormData(e.currentTarget);
        if (isValidForm) {
            const res: PomiseResponse | undefined = await mutate(
              "http://localhost:8000/api/v1/auths/users/login",
              fetcher("http://localhost:8000/api/v1/auths/users/login", {
                method: "POST",
                body: formData
              })
            )
              console.log(res);
            if (!res?.isOk) setGeneralError(res?.response.response);
            else {
                setItem("refresh", res.response["refresh"]);
                setItem("access", res.response["access"]);
                setUser({
                    id: res.response["id"],
                    email: res.response["email"],
                    firstName: res.response["first_name"],
                    lastName: res.response["last_name"],
                    datetime_created: new Date(res.response["datetime_created"]),
                    isDeleted: res.response["is_deleted"],
                    isStaff: res.response["is_staff"],
                    isActive: res.response["is_active"],
                    groups: res.response["groups"],
                    student: res.response["student"],
                    teacher: res.response["teacher"]
                  })
            }
        }
    };

    return (
    <div id="login__container">
      <div id="form__container">
        <div className="form__content">
          <div className="title__wrapper">
            <h1 className="form__title">Войдите</h1>
          </div>
          <form
            method="post"
            onSubmit={(e: FormEvent<HTMLFormElement>) => submitForm(e)}>
            <div className="inputs">
              <div className="form__row">
                <div className="input__wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="Введите email"
                    required
                    onBlur={(e) => {setEmail(e.target.value);}}
                  />
                </div>
              </div>

              <div className="form__row">
                <div className="input__wrapper">
                  <PasswordInput
                    name="password"
                    placeholder="Пароль"
                    handleEventChange={(e) => {setPassword(e.target.value)}}
                  />
                </div>
              </div>

              <div className="form__row">
                <div className="error__msg" style={{color: "red"}}>
                    <p>{emailError}</p>
                    <p>{passwordError}</p>
                    <p>{generalError}</p>
                </div>
              </div>
            </div>
        
            <div className="enter__btn">
              <Button
                text="Войти"
                isEnable={isValidForm}
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
      {/* {modal && <ModalAgreement handleModal={handleModal}/>} */}
    </div>
    );
};