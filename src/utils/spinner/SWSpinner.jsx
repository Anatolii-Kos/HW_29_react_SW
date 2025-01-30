import './SWSpinner.css';
import spinpic from './swspinner1.png'

const SWSpinner = () => {
    return (
        <div className="spinner-container">
            <img
                src={spinpic}
                alt="Loading..."
                className="w-[8vw] max-w-[150px] h-auto animate-spin drop-shadow-[0_0_20px_#f8ff0b]"
                style={{ animationDuration: "2.5s", animationTimingFunction: "linear" }}>
            </img>

        </div>
    )
};

export default SWSpinner;
