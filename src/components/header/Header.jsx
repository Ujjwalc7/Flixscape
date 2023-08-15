import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../content Wrapper/ContentWrapper";
import logo from "../../assets/logo-name.png";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[location]);

  const controlNavbar=()=>{
    if (window.scrollY>200) {
      
      if(window.scrollY>lastScrollY && !mobileMenu){
        setShow("hide")
      }else{
        setShow("show")
      }
      
    }else{
      
        setShow("top")
    }
    setLastScrollY(window.scrollY)
    
  }

    useEffect(()=>{
      window.addEventListener("scroll",controlNavbar)
      return ()=>{
        removeEventListener("scroll",controlNavbar);
      }
    }
    ,[lastScrollY])

    const handleNavigate=(type)=>{
      if(type==="movie"){
        navigate("/explore/movie")
      }else{
        navigate("/explore/tv")
      }
    }
    const searchQueryHandle=(e)=>{
      if (e.key==='Enter' && query.length>0) {
          navigate(`/search/${query}`)
          setTimeout(() => {
            setShowSearch(false);
          }, 1000);
      }
  }
    const openSearch=()=>{
      setMobileMenu(false)
      setShowSearch(true)
    }
    const openMobibleMenu=()=>{
      setMobileMenu(true)
      setShowSearch(false)
    }

    return (
        <header className={`header ${mobileMenu? "mobileView":""} ${show}`}>
          <ContentWrapper>
            <div className="logo" onClick={()=>navigate("/")}>
              <img src={logo} alt="logo" />
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={()=>{handleNavigate("movie")}}>Movies</li>
              <li className="menuItem" onClick={()=>{handleNavigate("tv")}}>TV Shows</li>
              <li className="menuItem">
              <HiOutlineSearch onClick={openSearch}/>
              </li>
            </ul>

            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
              {mobileMenu?
              (<VscChromeClose onClick={()=>setMobileMenu(false)}/>):
              (<SlMenu onClick={openMobibleMenu}/>)}
              
            </div>

          </ContentWrapper>
          {showSearch && <div className="searchBar">
            <div className="searchInput">
          <input type="text" onChange={(e)=>setQuery(e.target.value)} onKeyUp={searchQueryHandle} name="searchInput" id="searchInput" placeholder="Search for a movie or a tv show..."/>
          
          <HiOutlineSearch className="searchMobileIcon" onClick={()=>navigate(`/search/${query}`)}/>
            <VscChromeClose onClick= {()=>setShowSearch(false)}/>
            </div>

          </div>}
        </header>
    );
};

export default Header;