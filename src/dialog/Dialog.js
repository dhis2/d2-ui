import React from 'react';
import Dialog from 'material-ui/Dialog/Dialog';

const D2uiDialog = ({ props }) => {

    // deprecated props for version < 1
    const autoScrollBodyContent = true;
    const autoDetectWindowHeight = true;

    const {
        title,
        style,
        openFn,
        buttons,
        ...rest
    } = props;

    return (
        <Dialog
            autoScrollBodyContent
            autoDetectWindowHeight
            title
            style={{ maxWidth: 'none' }}
            contentStyle={styles.dialogContent}
            open={open && this.props.sectionModel.dataElements.size > 0}
            {...extraProps}
            actions={[
                <FlatButton
                    label={this.getTranslation('cancel')}
                    onTouchTap={this.closeDialog}
                    style={{ marginRight: 16 }}
                />,
                <RaisedButton
                    primary
                    label={this.getTranslation('save')}
                    onTouchTap={this.handleSaveClick}
                />,
            ]}
            onRequestClose={this.closeDialog}
        >
            <span>Whassup</span>
        </Dialog>
    );
};

export default D2uiDialog;


// Api mapping

// v0.19                               v1.0
// autoScrollBodyContent (bool)             none
// autoDetectWindowHeight (bool)         none
// title (translated str)                              <DialogTitle>
// style (object)                      classes (object)
// contentStyle (object)               classes (object)?
// open (bool)                         open
// {...otherProps} - what else is being passed? Disallow this rest
// actions
// onRequestClose
