import React, { useState } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';

interface IProps {
    style?: object;
    title: string;
};

const InfoPopover: React.FC<IProps> = props => {
    const { style, title } = props;
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState();

    const handleClick = (event: any) => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        <div style={{backgroundColor: 'transparent', ...style}}>
            <Button variant='secondary' onClick={handleClick}>{title}</Button>
            <Overlay
                show={show}
                target={target}
                placement='bottom'
                rootClose
                onHide={handleClick}
            >
                <Popover id='popover-contained'>
                    <Popover.Title as='h3'>{title}</Popover.Title>
                    <Popover.Content>{props.children}</Popover.Content>
                </Popover>
            </Overlay>
        </div>
    )
};

export default InfoPopover;
