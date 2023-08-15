//there is a bug in tv release date it will be first air date

import dayjs from "dayjs"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import ContentWrapper from "../../../components/content Wrapper/ContentWrapper"
import useFetch from "../../../hooks/useFetch"
import Genres from "../../../components/genres/Genres"
import CircleRating from "../../../components/circle rating/CircleRating"
import Img from "../../../components/lazyload-images/Img"
import "./style.scss"
import PosterFallBack from "../../../assets/no-poster.png"
import PlayIcon from "../PlayIcon"
import VideoPopup from "../../../components/videoPopUp/VideoPopUp"

const DetailsBanner = ({video, crew}) => {
    const [show,setShow]=useState(false);
    const [videoId,setVideoId]=useState(null);

    const {mediaType, id}=useParams();
    const {data,loading}= useFetch(`/${mediaType}/${id}`);
    const {url}=useSelector((store)=>store.home);

    const _gernres=data?.genres.map((g)=>g.id);

    const director = crew?.filter((f)=>f.job==="Director");
    const writer = crew?.filter((f)=>f.job==="Screenplay" || f.job==="Writer" || f.job==="Story")

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    
    return (
        <div className="detailsBanner">
        {!loading ? (
            <>
                {!!data && (
                    <>
                        <div className="backdrop-img">
                            <Img src={url.backdrop + data?.backdrop_path} />
                        </div>
                        <div className="opacity-layer"></div>
                        <ContentWrapper>
                            <div className="content">
                                <div className="left">
                                    {data?.poster_path ? (
                                        <div className="posterImgContainer">
                                            <Img className="posterImg" src={url.backdrop + data?.poster_path} />
                                        </div>
                                    ):(
                                        <Img className="posterImg" src={PosterFallBack} />

                                    )}
                                </div>
                                <div className="right">
                                    <div className="title">
                                        {`${data?.name || data?.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                    </div>
                                    <div className="subtilte">
                                        {data?.tagline}
                                    </div>
                                    <Genres data={_gernres} />
                                    <div className="row">
                                        <CircleRating rating={data?.vote_average.toFixed(1)}/>
                                        <div className="playbtn" onClick={()=>{
                                            setShow(true)
                                            setVideoId(video.key)
                                        }}>
                                            <PlayIcon/>
                                            <span>Watch Trailer</span>
                                        </div>
                                    </div>
                                    <div className="overview">
                                        <div className="heading">
                                            Overview
                                        </div>
                                        <div className="description">
                                            {data?.overview}
                                        </div>
                                    </div>
                                    <div className="info">
                                        {data?.status && (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Status:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.status}
                                                </span>
                                            </div>
                                        )}
                                        {data?.release_date ? (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Release date:{" "}
                                                </span>
                                                <span className="text">
                                                    {dayjs(data?.release_date).format("MMM D, YYYY")}
                                                </span>
                                            </div>
                                        ) : 
                                        (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    First air date:{" "}
                                                </span>
                                                <span className="text">
                                                    {dayjs(data?.first_air_date).format("MMM D, YYYY")}
                                                </span>
                                            </div>
                                        )}
                                        {data?.runtime && (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Runtime:{" "}
                                                </span>
                                                <span className="text">
                                                    {toHoursAndMinutes(data?.runtime)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {director?.length > 0 && (
                                        <div className="info">
                                           <span className="text bold">
                                            Director:{" "}
                                            </span> 
                                            <span className="text">
                                                {director?.map((d, i)=>(
                                                    <span key={i}>
                                                        {d.name}
                                                        {director.length - 1 !==i && ", "}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                    )}

                                    {writer?.length > 0 && (
                                        <div className="info">
                                           <span className="text bold">
                                            Writer:{" "}
                                            </span> 
                                            <span className="text">
                                                {writer?.map((d, i)=>(
                                                    <span key={i}>
                                                        {d.name}
                                                        {writer.length - 1 !==i && ", "}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                    )}

                                    {data?.created_by?.length > 0 && (
                                        <div className="info">
                                           <span className="text bold">
                                            Created by:{" "}
                                            </span> 
                                            <span className="text">
                                                {data?.created_by?.map((d, i)=>(
                                                    <span key={i}>
                                                        {d.name}
                                                        {data?.created_by.length - 1 !==i && ", "}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
                        </ContentWrapper>
                    </>
                )}
            </>
        ) : (
            <div className="detailsBannerSkeleton">
                <ContentWrapper>
                    <div className="left skeleton"></div>
                    <div className="right">
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                    </div>
                </ContentWrapper>
            </div>
        )}
    </div>
  )
}
export default DetailsBanner