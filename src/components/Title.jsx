import PropTypes from "prop-types"; // Import PropTypes

const Title = ({ text1, text2 }) => {
    return (
        <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500 uppercase">
                {text1}
                <span className="text-gray-700 font-medium uppercase">{text2}</span>
            </p>
            <p className="w-8 sm:w-12 h-[2px] sm:h-[2px] bg-gray-700"></p>
        </div>
    );
};

// Define prop types for the component
Title.propTypes = {
    text1: PropTypes.string.isRequired, // Assuming 'text1' is a required string
    text2: PropTypes.string.isRequired, // Assuming 'text2' is a required string
};

export default Title;
