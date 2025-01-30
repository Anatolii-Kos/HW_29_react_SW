import {useEffect, useState} from "react";
import SWSpinner from "../utils/spinner/SWSpinner.jsx";
import {apiSW, storageTime} from "../utils/constants.js";


const RandomOpeningCrawl = () => {

    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const loadingDelay = 3000

    useEffect(() => {

        const fetchData = async () => {
            if (localStorage.localOpening_crawl && storageTime(JSON.parse(localStorage.getItem('localOpening_crawl')).createTime)) {
                setData(JSON.parse(localStorage.getItem('localOpening_crawl')).opening_crawl);
                setLoading(false);
            } else {
                try {
                    const response = await fetch(`${apiSW}/v1/films/${Math.floor(Math.random() * 6) + 1}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const result = await response.json();
                    const dataObj = {
                        opening_crawl: result.opening_crawl,
                        createTime: new Date().getTime(),
                    };
                    localStorage.setItem('localOpening_crawl', JSON.stringify(dataObj));
                    setTimeout(() => {
                        setData(dataObj.opening_crawl);
                    }, loadingDelay);

                } catch (err) {
                    setTimeout(() => {
                        setError(err.message);
                    }, loadingDelay);

                } finally {
                    setTimeout(() => {
                        setLoading(false);
                    }, loadingDelay);
                }
            }
        }

        fetchData();
    }, []);

    if (loading) return <><SWSpinner/></>;
    if (error) return <>Error: {error}</>;


    return (
        <>
            <p>{data}</p>
        </>
    );
};

export default RandomOpeningCrawl;

/*.farGalaxy {*/
/*  font-size: 2em;*/
/*  letter-spacing: 0.2em;*/
/*  line-height: 1.5;*/
/*  text-align: justify;*/
/*  padding: 0.2em;*/
/*}*/
