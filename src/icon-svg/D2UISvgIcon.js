import React from "react";
import PropTypes from "prop-types";
import IconStar from "material-ui/svg-icons/toggle/star";
import HardwareVideogameAsset from "material-ui/svg-icons/hardware/videogame-asset";

const Icons = {
    star: IconStar,
    game: HardwareVideogameAsset,
};

const D2UISvgIcon = ({ icon }) => {
    const Icon = Icons[icon];
    console.log('Icon is', icon);

    return (
        <div>
            <Icon />
        </div>
    );
};

export default D2UISvgIcon;
