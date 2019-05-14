import React from "react";

const DragHandleIcon = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        <defs>
            <path id="a" d="M0 0h24v24H0V0z" />
        </defs>
        <clipPath id="b">
            <use xlinkHref="#a" overflow="visible" />
        </clipPath>
        <path clipPath="url(#b)" d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
    </svg>
);

export default DragHandleIcon;
