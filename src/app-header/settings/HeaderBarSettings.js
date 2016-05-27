import React, { PropTypes } from 'react';
import withStateFrom from '../../component-helpers/withStateFrom';
import addD2Context from '../../component-helpers/addD2Context';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import headerBarSettingsStore$, {setGrid} from './settings.store';
import Heading from '../../headings/Heading.component';

function HeaderBarSettings(props, { d2 }) {
    return (
        <div>
            <Heading>{d2.i18n.getTranslation('number_of_apps_to_show')}</Heading>
            {props.gridOptions.map((dim, index) => {
                if (props.grid && props.grid.y === dim.y && props.grid.x === dim.x) {
                    return (<RaisedButton key={index} onClick={() => setGrid(dim)}>{`${dim.x} by ${dim.y}`}</RaisedButton>);
                }

                return (<FlatButton  key={index} onClick={() => setGrid(dim)}>{`${dim.x} by ${dim.y}`}</FlatButton>);
            })}
        </div>
    );
}
HeaderBarSettings.propTypes = {
    gridOptions: PropTypes.array,
};
HeaderBarSettings.defaultProps = {
    gridOptions: [],
};

export default withStateFrom(headerBarSettingsStore$, addD2Context(HeaderBarSettings));
