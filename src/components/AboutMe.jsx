import {useEffect, useState} from "react";
import SWSpinner from "../utils/spinner/SWSpinner.jsx";
import {apiSW, storageTime} from "../utils/constants.js";


const AboutMe = () => {

    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const loadingDelay = 1000

    useEffect(() => {

        const fetchData = async () => {
            if (localStorage.localInfo && storageTime(JSON.parse(localStorage.getItem('localInfo')).createTime)) {
                setData(JSON.parse(localStorage.getItem('localInfo')));
                setLoading(false);
            } else {
                try {
                    const response = await fetch(`${apiSW}/v1/peoples/1`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const result = await response.json();
                    const dataObj={
                        gender: structuredClone(result.gender),
                        skin_color: structuredClone(result.skin_color),
                        hair_color: structuredClone(result.hair_color),
                        height: structuredClone(result.height),
                        eye_color: structuredClone(result.eye_color),
                        mass: structuredClone(result.mass),
                        homeworld: structuredClone(result.homeworld),
                        birth_year: structuredClone(result.birth_year),
                        createTime: new Date().getTime()
                    }
                    localStorage.setItem('localInfo', JSON.stringify(dataObj));
                    setTimeout(() => {
                        setData(dataObj);
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
            <h3 className='mx8-'>About me:</h3>
            {data && typeof data === "object" ? (
                <ul className='lowercase '>
                    {Object.entries(data)
                        .filter(([key]) => key !== "createTime")
                        .map(([key, value]) => (
                        <li key={key} className={'text-[2em] tracking-widest leading-14 ml-8'}>
                            <strong className=''>{key.replace('_', " ")}:</strong>
                            <p className='text-3xl capitalize'>{String(value)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{data}</p>
            )}
        </>
    );
};

export default AboutMe;
