import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

const OUFolderIconComponent = ({ isExpanded, styles }) => {
    return isExpanded
        ? <FolderOpenIcon style={styles} />
        : <FolderIcon style={styles} />;
};

export default OUFolderIconComponent;
