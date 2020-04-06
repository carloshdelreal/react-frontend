import React from 'react';

interface IProps {
    buttonStyle?: object;
    textStyle?: object;
    text?: string;
    onClick?: () => void;
};

const Button: React.FC<IProps> = props => {
    const { buttonStyle, textStyle, text, onClick } = props;

    return (
        <button style={buttonStyle} onClick={onClick}>
            <p style={textStyle}>{text}</p>
        </button>
    )
};

export default Button;
