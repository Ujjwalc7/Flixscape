import { useEffect } from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { fetchDataFromApi } from "./utils/api"
import { useDispatch, useSelector } from "react-redux"
import { getApiConfig,getGenres } from "./store/features/homeSlice"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import Details from "./pages/details/Details"
import SearchResult from "./pages/search result/SearchResult"
import Explore from "./pages/explore/Explore"
import Footer from "./components/footer/Footer"
import PageNotFound from "./pages/404/PageNotFound"
function App() {
  const dispatch=useDispatch();
  const {url}=useSelector((store)=>store.home)
  // console.log(url);
  useEffect(()=>{
    fetchApiConfig()
  genresCall()

  },[])

  const fetchApiConfig=()=>{
    fetchDataFromApi('/configuration')
    .then((resp)=>{
      const urls= {
        backdrop:resp.images.secure_base_url+"original",
        poster:resp.images.secure_base_url+"original",
        profile:resp.images.secure_base_url+"original",

    }
    dispatch(getApiConfig(urls));})
  }

  const genresCall= async ()=>{
    let promises=[]
    let endPoints=["tv", "movie"]
    let allGenres={

    }

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`)) 
    });
    const data= await Promise.all(promises);
    // console.log(data);

    data.map(({genres})=>{
     return genres.map((item)=>(allGenres[item.id]=item))
    })
    dispatch(getGenres(allGenres))
    // console.log(allGenres);

  }

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/:mediaType/:id" element={<Details/>}/>
      <Route path="/search/:query" element={<SearchResult/>}/>
      <Route path="/explore/:mediaType" element={<Explore/>}/>
      <Route path="*" element={<PageNotFound/>}/>

    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
