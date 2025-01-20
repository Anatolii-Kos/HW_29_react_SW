import './SWSpinner.css';
import spinpic from './swspinner1.png'

const SWSpinner = () => {
    return (
        <div className="spinner-container">
            <img
                src={spinpic}
                alt="Loading..."
                className="spinner-image"></img>

        </div>
    )
};

export default SWSpinner;
