
import { useEffect, useRef, useState } from "react"
import "./style.scss"
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyload-images/Img";
import ContentWrapper from "../../../components/content Wrapper/ContentWrapper";
const HeroBanner = () => {
    const [backGround,setBackground]=useState("");
    const [query,setQuery]=useState('');
    const navigate=useNavigate();

    const {url}=useSelector((store)=>store.home)


    const {data,loading,err}=useFetch('/movie/upcoming');
    // console.log(data);

    // console.log(query);
    const searchQueryHandle=(e)=>{
        if (e.key==='Enter' && query.length>0) {
            navigate(`/search/${query}`)
        }
    }
    useEffect(()=>{
        const bg=url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path; 
        setBackground(bg);
    },[data])
    
  return (
    <div className="heroBanner">
        
        {loading ? <h1>{loading}</h1>:<div className="backdropImg">
            <Img src={backGround}/>
        </div>}
        

        <div className="opacityLayer"></div>
    <ContentWrapper>
        <div className="heroBannerContent">
    <span className="title">Welcome.</span>
    <span className="subtitle"> Millions of movies, TV shows and people to discover. Explore now.</span>
    <div className="searchBar">
        <input type="text" onChange={(e)=>setQuery(e.target.value)} onKeyUp={searchQueryHandle} name="searchBar" id="searchBar" placeholder="Search for a movie or a tv show..."/>
        <button onClick={()=>navigate(`/search/${query}`)}>Search</button>
    </div>
        </div>
    </ContentWrapper>
    </div>
  )
}
export default HeroBanner