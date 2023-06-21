import { resolve } from "path";
import { host } from "./index";

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
