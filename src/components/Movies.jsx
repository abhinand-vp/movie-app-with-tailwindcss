import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from './Pagination';
import { Oval } from "react-loader-spinner";
import Banner from './Banner';
function Movies() {
    let [movies, setMovies] = useState([]);
    let [pageNum, setPage] = useState(1);
    // console.log("bb", pageNum);
    let [hovered, setHovered] = useState("");
    let [favourites, setFavorites] = useState([]);

    console.log("favourites", favourites);

    useEffect(()=>{
        localStorage.setItem('favId',  JSON.stringify(favourites))
    },[favourites])

    useEffect(() => {
        fetchFilmsLists();
    }, [pageNum])

    const fetchFilmsLists = () => {
        axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=565dda78aae2b75fafddbc4320a33b38&page=" + pageNum)

            .then((res) => {
                setMovies(res.data.results);
            })
    }
    
    /* Pagination handlers*/
    const onPrev = () => {
        if (pageNum > 1) {
            setPage(pageNum - 1);
        }
    }
    const onNext = () => {
        setPage(pageNum + 1);

    }
    /*emoji show and hide on hover*/
    const showEmoji = (id) => {
        setHovered(id);
    }
    const hideEmoji = () => {
        setHovered("");
    }
    
    /*adding / removeing emojis to fav*/

    const addEmoji = (id) => {
        const newFav = [...favourites, id];
        setFavorites(newFav);
    }
    const removeEmoji = (id) => {
        // whichever elem -> not equal to my id 
        const filteredFav = favourites.filter(elem => {
            return elem != id;
        })
        setFavorites(filteredFav);
    }


    return (
        <>
        <Banner />
        <div className="mt-8">
            <div className="mb-8
            font-bold text-2xl text-center
            "
            >Trending Movies</div>
            <div className="flex 
            flex-wrap
            justify-center
            ">
                {
                    movies.length == 0 ? <Oval
                        height="50"
                        width="50"
                        radius="9"
                        color="gray"
                    secondaryColor='gray'
                        ariaLabel="loading"

                    /> : movies.map((movie) => {

                        return <div
                            onMouseOver={
                                () => { showEmoji(movie.id) }
                            }
                            onMouseLeave={
                                () => { hideEmoji(movie.id) }
                            }

                            key={movie.id}
                            className="
                bg-center bg-cover    
                w-[280px]
                h-[30vh]
                md: h-[45vh]
                md:w-[250px]
                m-4
                mt-10
                rounded-xl
                hover:scale-110
                duration-300
                 flex items-end 
                 relative
                "
                            style={{
                                backgroundImage:
                                    `url(
                                    https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`
                            }}
                        >
                            <div
                                className="p-2
                                bg-gray-900
                                absolute top-2 right-2
                                rounded-xl
                               "
                                style={{
                                    display: hovered == movie.id ?
                                        "block" : "none"
                                }}
                            >
                                {favourites.includes(movie.id) == false ? <div className="
                                text-2xl
                                "
                                    onClick={() => { addEmoji(movie.id) }}
                                >
                                    😍
                                </div> : <div className="
                                text-2xl
                                "
                                    onClick={() => { removeEmoji(movie.id) }}

                                >
                                    ❌
                                </div>

                                }

                            </div>
                            <div
                                className="
                    font-bold text-white
                    bg-gray-900 bg-opacity-60
                    p-2
                    text-center
                    w-full
                    rounded-b-xl
                "> {movie.title || movie.name}</div>
                        </div>
                    })
                }
            </div>
            <Pagination
                pageNum={pageNum}
                onPrev={onPrev}
                onNext={onNext}
            ></Pagination>
        </div >
        </>

    )
}

export default Movies;