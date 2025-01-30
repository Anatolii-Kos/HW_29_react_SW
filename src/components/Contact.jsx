import {useEffect, useState} from "react";
import {apiSW, storageTime} from "../utils/constants.js";

const Contact = () => {
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    planet: "",
    subject: "",
    });
    const [data, setData] = useState(false);


    useEffect(() => {
        if (localStorage.localPlanets && storageTime(JSON.parse(localStorage.getItem('localPlanets')).createTime)) {
            setData(JSON.parse(localStorage.getItem('localPlanets')));

        } else {
            fetch(`${apiSW}/v1/planets`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {

                    const planetsName = data.map((planet) => planet.name);
                    const planets = [...planetsName, {createTime: new Date().getTime()}];
                    // console.log(planets);
                    localStorage.setItem('localPlanets', JSON.stringify(planets));
                    setData(planets);
                })
                .catch((error) => {
                    console.error("Error fetching planets:", error);
                });
        }
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.planet || !formData.subject) {
            alert("Please fill in all fields before submitting the form!");
            return;
        }
        console.log("Form Data Submitted:", formData);
        setFormData({
            firstName: "",
            lastName: "",
            planet: "",
            subject: "",
        });
    };

    return (
        <div className="flex justify-start items-start min-w-[80vw] min-h-[80vh] p-2">
            <form
                className="bg-black/80 p-5 rounded-lg border-2 border-yellow-400 min-w-[50%] max-w-[70%] shadow-[0_0_10px_#eedb00]"
                onSubmit={handleSubmit}
            >
                <h1 className="text-center mb-5 text-white text-xl font-semibold">Contact Me</h1>

                <label className="block mb-2 text-sm text-white">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name.."
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-yellow-400 rounded bg-black text-yellow-400 placeholder-gray-500"
                />

                <label className="block mb-2 text-sm text-white">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Your last name.."
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-yellow-400 rounded bg-black text-yellow-400 placeholder-gray-500"
                />

                <label className="block mb-2 text-sm text-white">Planet</label>
                <select
                    name="planet"
                    value={formData.planet}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-yellow-400 rounded bg-black text-yellow-400"
                >
                    <option value="">Select a planet</option>
                    {Array.isArray(data) &&
                        data.slice(0, -1).map((planet, index) => (
                            <option key={index} value={planet}>
                                {planet}
                            </option>
                        ))}
                </select>

                <label className="block mb-2 text-sm text-white">Message</label>
                <textarea
                    name="subject"
                    placeholder="Write something.."
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-yellow-400 rounded bg-black text-yellow-400 h-24 resize-none"
                ></textarea>

                <button
                    type="submit"
                    className="w-full p-2 bg-yellow-400 text-black rounded cursor-pointer text-lg font-medium hover:bg-yellow-300 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Contact;
