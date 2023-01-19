import { useRouter } from "next/router";
import Seo from "../../components/Seo";
import { useState, useEffect } from "react";

const API_KEY = "b8b0852d0c661345d7eb6d16956dabec";

export default function Detail({params}){
    const router = useRouter();
    const [title, id] = params || [];
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const data = await (
                await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            ).json();
            console.log(data);
            setMovies(data);
            setLoading(false);
        })();
    }, []);
    return (
        <div>
            {loading ? "Loading..." : (
                <div>
                    <Seo title={title}/>
                    <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}/>
                    <h1>{title}</h1>
                    <h2>{movies.tagline}</h2>
                    <hr/>
                    <p>{movies.release_date}</p>
                    <p>Runtime: {movies.runtime} min</p>
                    <p>Rating: {movies.vote_average}/10</p>
                    <hr/>
                    <h3>Genres</h3>
                    <div>
                        {movies.genres.map((g)=>(
                            <li key={g.id}>{g.name}</li>
                        ))}
                    </div>
                    <hr/>
                    <h3>Overview</h3>
                    <p>{movies.overview}</p>
                </div>
            )}
            <style jsx>{`
                .container{
                    display: grid;
                }    
            `}</style>
        </div>
    );
}

export function getServerSideProps({params:{params}}){
    return {
        props: {
            params,
        },
    };
}