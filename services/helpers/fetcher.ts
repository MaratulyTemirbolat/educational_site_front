type PomiseResponse = {
    isOk: boolean;
    response: any;
}
export const fetcher = async (url: string, init?: RequestInit): Promise<PomiseResponse> => {
    const res: Response = await fetch(url, init);
    const isOk: boolean = res.ok;
    const response = await res.json();
    return new Promise(resolve => resolve({isOk, response}));
}