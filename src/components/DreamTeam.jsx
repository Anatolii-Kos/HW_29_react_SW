import {friends} from "../utils/constants.js";
import Friend from "./Friend.jsx";

const DreamTeam = () => {
    return (
        <section className="float-right w-1/2 grid grid-cols-3 border border-base-color rounded-b-2xl  ml-2">
            <h2 className="col-span-3 text-center text-2xl">Dream team</h2>
            {friends.map((friend, index) => <Friend picture={friend} key={index} pos={index + 1} />)}
        </section>
    );
};

export default DreamTeam;
