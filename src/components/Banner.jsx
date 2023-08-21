import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Circles } from "react-loader-spinner";

function Banner() {
    let [bannerMovie, setBanner] = useState("");

    useEffect(() => {
        fetchBannerImage();
    }, [])

    const fetchBannerImage = () => {
        axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=565dda78aae2b75fafddbc4320a33b38")
            .then((res) => {
                setBanner(res.data.results[0]);
            })
    }
    
    return (
        <>
            {
                bannerMovie == "" ?
                    <div className="
                    flex justify-center"><Circles
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /></div>
                    :
                    <div className={`
                    h-[40vh] md:h-[60vh]
                    bg-center bg-cover
                    flex items-end 
            `}
                        style={{
                            backgroundImage:
                                `url(
                                    https://image.tmdb.org/t/p/original/t/p/original/${bannerMovie.backdrop_path})`
                        }}
                    >
                        <div
                            className="text-xl md:text-3xl text-white bg-gray-900 bg-opacity-50 p-4 text-center w-full"
                        >{bannerMovie.original_title}</div>
                    </div>
            }


        </>
    )
}

export default Banner;