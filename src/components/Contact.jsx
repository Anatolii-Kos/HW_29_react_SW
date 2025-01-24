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
        <div className="container">
            <form className="form " onSubmit={handleSubmit}>
                <h1 className="formheader">Contact Me</h1>

                <label className="label">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name.."
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input"
                />

                <label className="label">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Your last name.."
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input"
                />

                <label className="label">Planet</label>
                <select
                    name="planet"
                    value={formData.planet}
                    onChange={handleChange}
                    className="select"
                    >
                    <option value="">Select a planet</option>
                    {Array.isArray(data) &&
                        data.slice(0, -1).map((planet, index) => (
                            <option key={index} value={planet}>
                                {planet}
                            </option>
                        ))}
                </select>

                <label className="label">Message</label>
                <textarea
                    name="subject"
                    placeholder="Write something.."
                    value={formData.subject}
                    onChange={handleChange}
                    className="textarea"
                ></textarea>

                <button type="submit" className="button">Submit</button>
            </form>
        </div>
    );
};

export default Contact;
