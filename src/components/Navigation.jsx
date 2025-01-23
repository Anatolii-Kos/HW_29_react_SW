import NavItem from "./NavItem.jsx";
import {navItems} from "../utils/constants.js";

const Navigation = ({changePage}) => {
    return (
        <nav>
            <ul className="nav fixed-top mt-2 ms-5">
                {navItems.map(item => <NavItem changePage={changePage} itemTitle={item} key={item}/>)}
            </ul>
        </nav>
    );
};

export default Navigation;
