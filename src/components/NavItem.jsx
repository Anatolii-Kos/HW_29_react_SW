import StyleRedButton from "../UI/StyleRedButton.jsx";

const NavItem = ({itemTitle, changePage}) => {
    return (
        <StyleRedButton>
            <li onClick={() => changePage(itemTitle)} >{itemTitle}</li>
        </StyleRedButton>
    );
};
export default NavItem;
