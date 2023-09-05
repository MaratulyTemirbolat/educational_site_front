"use client";
import "./LoginForm.scss";

import { useRouter } from "next/navigation";
import localforage from "localforage";
import {
    useEffect,
    FormEvent,
    useState,
    useMemo,
} from "react";

import { useUserStore, UseUser } from "@/store/user.store";
import { isValidEmail } from "@/tools/validators";
import PasswordInput from "../shared/PasswordInput/PasswordInput";
import Button from "../shared/Buttons/Button";
import { useSWRConfig } from "swr";
import { fetcher, PomiseResponse } from "@/services/helpers/fetcher";

export default function LoginForm() {

    const { mutate } = useSWRConfig();
    const [user, setUser] = useUserStore((state: UseUser) => [
        state.user,
        state.setUser
    ]);
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [generalError, setGeneralError] = useState<string>("");
    const [startedTypingEmail, setStartedTypingEmail] = useState<boolean>(false);
    const [startedTypingPass, setStartedTypingPass] = useState<boolean>(false);

    useEffect(() => {if (user) router.push('/main/')}, [user]);
    console.log(user);
    const isValidPassword = (): boolean => {
        if (!password.trim()) {
          if (startedTypingPass) setPasswordError("пароль должен быть предоставлен!");
          return false;
        }
        setPasswordError("");
        return true;
    };
    const isValidEm = (): boolean => {
        const emailError: {errorMsg: string} = isValidEmail(email);
        if (emailError.errorMsg) {
          if (startedTypingEmail) setEmailError(emailError.errorMsg);
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
                localforage.setItem("refresh", res.response["refresh"]);
                localforage.setItem("access", res.response["access"]);
                setUser({
                    id: res.response["id"],
                    email: res.response["email"],
                    first_name: res.response["first_name"],
                    last_name: res.response["last_name"],
                    datetime_created: res.response["datetime_created"],
                    is_deleted: res.response["is_deleted"],
                    is_staff: res.response["is_staff"],
                    is_active: res.response["is_active"],
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
                    onBlur={(e) => {
                      if (!startedTypingEmail) setStartedTypingEmail(true);
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form__row">
                <div className="input__wrapper">
                  <PasswordInput
                    name="password"
                    placeholder="Пароль"
                    handleEventChange={
                      (e) => {
                        if (!startedTypingPass) setStartedTypingPass(true);
                        setPassword(e.target.value);
                      }
                    }
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
              У вас нет аккаунта?
              <a
                id="user__agreement"
                href="/register"
                style={{ textDecoration: "none" }}
              >
                Зарегистрироваться
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* {modal && <ModalAgreement handleModal={handleModal}/>} */}
    </div>
    );
};