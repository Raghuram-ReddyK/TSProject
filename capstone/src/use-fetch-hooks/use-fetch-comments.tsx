import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useFetchComments = (sortField: string, sortOrder: 'asc' | 'desc', limit: number) => {
    const url = `https://dummyjson.com/products?limit=${limit}&sort=${sortField}&order=${sortOrder}`;

    const { data, error, isLoading } = useSWR(url, fetcher);
    return { data, error, isLoading };
};

export default useFetchComments;
