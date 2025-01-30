const StyleRedButton = ({ children, extraclass = "" }) => {
    return (
        <div className={`bg-red-color hover:bg-red-color/80 hover:text-white border-black border-2 p-2 rounded-md cursor-pointer text-center ${extraclass}`}>
            {children}
        </div>
    );
};

export default StyleRedButton;
