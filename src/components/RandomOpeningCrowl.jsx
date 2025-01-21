import {useEffect, useState} from "react";
import SWSpinner from "../utils/spinner/SWSpinner.jsx";
import {apiSWfilmrandom} from "../utils/constants.js";


const RandomOpeningCrowl = () => {

    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const loadingDelay = 5000

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(apiSWfilmrandom);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setTimeout(() => {
                    setData(result['opening_crawl']);
                    console.log(result['opening_crawl'])
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

        fetchData();
    }, []);

    if (loading) return <><SWSpinner/></>;
    if (error) return <>Error: {error}</>;


    return (
        <>
            <p className="farGalaxy">{data}</p>
        </>
    );
};

export default RandomOpeningCrowl;
