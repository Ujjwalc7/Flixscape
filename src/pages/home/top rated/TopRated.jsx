import { useState } from "react";
import ContentWrapper from "../../../components/content Wrapper/ContentWrapper"
import SwitchTab from "../../../components/switch tabs/SwitchTab"
import useFetch from "../../../hooks/useFetch"
import Carousel from "../../../components/caraousel/Carousel";
const TopRated = () => {
    const [endpoint,setEndpoint]=useState("movie");

    const {data,loading}=useFetch(`/${endpoint}/top_rated`); 
    // console.log(data);

    const onTabChange=(tab)=>{
      setEndpoint(tab==="Movies" ? "movie" : "tv");
    
    };
  return (
    <div className="caraouselSection">
        <ContentWrapper>
            <span className="caraouselTitle">Top Rated</span>
            <SwitchTab data={["Movies", "Tv Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}
export default TopRated