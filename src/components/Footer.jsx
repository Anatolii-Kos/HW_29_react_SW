import StyleRedButton from "../UI/StyleRedButton.jsx";

const Footer = () => {
    return (
        <footer className=" clear-both h-20 bg-grey-color rounded-b-2xl grid grid-cols-12 items-center">
            <StyleRedButton extraclass={'col-start-2 col-span-3'}>
                Send me an
                <span className="text-black uppercase ml-1">email</span>
            </StyleRedButton>

        </footer>
    );
};

export default Footer;
// <div className=" col-start-2 col-span-2 bg-red-color hover:bg-red-color/80 hover:text-white border-black border-2 h-10 rounded-md cursor-pointer text-center place-content-center ">Send me an <span
//                 className="text-black uppercase ">email</span></div>
