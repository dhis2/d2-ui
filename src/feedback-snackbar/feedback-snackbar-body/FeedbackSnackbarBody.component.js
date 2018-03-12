import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

import { ERROR, LOADING, SUCCESS } from '../FeedbackSnackbarTypes';

const styles = {
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '15px',
    },
    icon: {
        color: '#ffffff',
        marginLeft: '15px',
    },
};

class FeedbackSnackbarBody extends PureComponent {
    static propTypes = {
        type: PropTypes.string,
        message: PropTypes.string,
    };

    static defaultProps = {
        type: '',
        message: '',
    };

    render() {
        let icon;
        switch (this.props.type) {
        case SUCCESS:
            icon = (
                <FontIcon className='material-icons' style={styles.icon}>
                    done
                </FontIcon>
            );
            break;
        case LOADING:
            icon = <CircularProgress style={styles.icon} color={'#ffffff'} size={28} thickness={2} />;
            break;
        case ERROR:
            icon = (
                <FontIcon className='material-icons' style={styles.icon}>
                    error
                </FontIcon>
            );
            break;
        default:
            icon = (
                <FontIcon className='material-icons' style={styles.icon}>
                    warning
                </FontIcon>
            );
            break;
        }
        const snackBarContent = (
            <div style={styles.content}>
                <div>
                    {this.props.message}
                </div>
                {icon}
            </div>
        );
        return (
            snackBarContent
        );
    }
}

export default FeedbackSnackbarBody;
