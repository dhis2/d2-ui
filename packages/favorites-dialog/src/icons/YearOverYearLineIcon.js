import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default <SvgIcon viewBox="0 0 16 16" style={{ marginRight: 8 }}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g>
            <mask id="mask-2" fill="white">
                <rect id="path-1" x="0" y="0" width="16" height="16"></rect>
            </mask>
            <rect fill="#7B8998" mask="url(#mask-2)" x="0" y="15" width="16" height="1"></rect>
            <rect fill="#7B8998" mask="url(#mask-2)" x="0" y="0" width="1" height="16"></rect>
            <polyline stroke="#7B8998" strokeWidth="1.5" mask="url(#mask-2)" points="0 5 5 10 10 6 15 12"></polyline>
            <polyline stroke="#7B8998" strokeWidth="1.5" mask="url(#mask-2)" points="0 10 5 2 10 12 15 4"></polyline>
        </g>
    </g>
</SvgIcon>;
