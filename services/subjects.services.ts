import useSWR from "swr";

import { fetcher } from "./helpers/fetcher";

export function swrClasses() {
    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/api/v1/subjects/classes",
        fetcher
    );
};