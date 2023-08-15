import { useState } from "react";
import ContentWrapper from "../../../components/content Wrapper/ContentWrapper"
import SwitchTab from "../../../components/switch tabs/SwitchTab"
import useFetch from "../../../hooks/useFetch"
import Carousel from "../../../components/caraousel/Carousel";
const Trending = () => {
    const [endpoint,setEndpoint]=useState("day");

    const {data,loading}=useFetch(`/trending/all/${endpoint}`); 

    const onTabChange=(tab)=>{
      setEndpoint(tab==="Day" ? "day" : "week");
    
    };
  return (
    <div className="caraouselSection">
        <ContentWrapper>
            <span className="caraouselTitle">Trending</span>
            <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
    </div>
  )
}
export default Trending