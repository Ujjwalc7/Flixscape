import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(null);
  const [err,setErr]=useState(null);

  useEffect(()=>{
    setLoading('Loading....');

    fetchDataFromApi(url).then((resp)=>{
        setLoading(false);
        setData(resp);
    }).catch((err=>{
        setLoading(false);
        setErr('Something went wrong !!')
    }))
  },[url])

  return {data,loading,err};
}
export default useFetch