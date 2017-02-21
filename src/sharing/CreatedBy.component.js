import { PropTypes, default as React } from 'react';

const CreatedBy = ({ user }) => {
    const nameToRender = user && user.name ? user.name : '';
    const createdByText = `[Created by: ]${nameToRender}`;
    return <div>{createdByText}</div>;
};

CreatedBy.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default CreatedBy;
