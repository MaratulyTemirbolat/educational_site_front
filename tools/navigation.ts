import { ReadonlyURLSearchParams } from "next/navigation";

export const getFullPath = (queryParams: ReadonlyURLSearchParams, reqParams: Array<string>): string => {
  let fullPath: string = "/main/subjects";
  let isFound: boolean = false;
  let value: string | null = null;
  for(let k=0; k<reqParams.length; k++) {
    value = queryParams.get(reqParams[k]);
    if (value) {
      if (!isFound) {
        fullPath += "?";
        isFound = true;
      } else fullPath += "&";
    fullPath += `${reqParams[k]}=${value}`
    }
  }
  return fullPath;
};

export const getPagePath = (
  path: string,
  reqPage: number,
  searchParams: ReadonlyURLSearchParams,
  urlName: string = "page"
): string => {
  if (searchParams.has(urlName)) {
    const value: string | null = searchParams.get(urlName);
    return path.replace(`${urlName}=${value}`, `${urlName}=${reqPage}`);
  }
  else if (path.indexOf("?") != -1) return path + `&${urlName}=` + reqPage;
  return path + `?${urlName}=` + reqPage;
};

export const getReplacedInsertedParamToPath = (
  path: string,
  value: any,
  searchParams: ReadonlyURLSearchParams,
  keyName: string
): string => {
  if (searchParams.has(keyName)) {
    const curValue: string | null = searchParams.get(keyName);
    return path.replace(`${keyName}=${curValue}`, `${keyName}=${value}`);
  }
  else if (path.indexOf("?") != -1) return `${path}&${keyName}=${value}`;
  return `${path}?${keyName}=${value}`;
};
