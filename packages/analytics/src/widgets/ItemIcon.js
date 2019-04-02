import React from 'react';

const ItemIcon = ({ backgroundColor }) => {
    return (
        <div>
            <style jsx>{`
                div {
                    background-color: ${backgroundColor};
                    min-height: 6px;
                    min-width: 6px;
                    margin: 0px 5px;
                }
            `}</style>
        </div>
    );
};

export default ItemIcon;
