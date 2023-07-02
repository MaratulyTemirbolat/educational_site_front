import { HOST, TOKEN_KEY_NAME, } from "./index";
import localforage from "localforage";
import axios from "axios";
import { User } from "@/models/auths.models";

type RegisterUserResponse = {
    errorMsg: string;
};

type RegisterUserRequest = {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    is_superuser: boolean;
    is_teacher: boolean;
};

export async function registerUser(url: string , init?: RequestInit): Promise<any> {
    const res: Response = await fetch(url, init);
    const isError: boolean = res.ok;
    const response = await res.json();
    return new Promise((resolve, reject) => {
        if (!isError) reject({isError, response})
        resolve({isError, response});
    });
};

export async function updateAccessToken(): Promise<{ ok: boolean, msg: string } > {
    const refreshToken: string | null = await localforage.getItem("refresh");
    return new Promise(resolve => {
        if (refreshToken) {
            axios.post(
                `${HOST}/api/token/refresh/`,
                { refresh: refreshToken }
            ).then(response => {
                localforage.setItem("access", response.data["access"]);
                resolve({ok: true, msg: ""});
            }).catch(reason => resolve(
                {
                    ok: false,
                    msg: reason.response.data.detail
                }
            ));
        } else return resolve({ ok: false, msg: "Авторизуйтесь повторно в систему." });
    })
};

export async function isRefreshToken(): Promise<{ ok: boolean, msg: string }> {
    const refreshToken: string | null = await localforage.getItem("refresh");
    if (refreshToken) return { ok: true, msg: ""};
    else return { ok: false, msg: "Авторизуйтесь повторно в систему." };
}

export async function getUserByToken(): Promise<User | null> {
    const res: { ok: boolean, msg: string } = await isRefreshToken();
    const accessToken: string | null = await localforage.getItem("access");
    return new Promise(resolve => {
        if (res.ok) {
            axios.get(`${HOST}/api/v1/auths/users/personal_account`, {
                headers: {
                    Authorization: TOKEN_KEY_NAME + " " + accessToken
                }
            }).then(response => resolve(response.data.data))
            .catch(() => resolve(null));
        } else return resolve(null);
    })
};