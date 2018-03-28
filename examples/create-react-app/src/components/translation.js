import React from 'react';

import TranslationDialog from 'd2-ui-translation-dialog';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class TranslationDialogExample extends React.Component {
    state = {
        translationDialog: {
            open: false,
            type: 'chart',
        },
    };

    toggleDialog = type => () => {
        this.setState({
            translationDialog: {
                open: !this.state.translationDialog.open,
            },
        });
    };

    render () {
        const dataElement = this.props.d2.models.dataElement.create({
            "code":"DE_11486142",
            "created":"2011-04-20T15:54:58.775+0000",
            "lastUpdated":"2016-06-29T07:30:50.235+0000",
            "name":"Accute Flaccid Paralysis (Deaths < 5 yrs)2",
            "id":"FTRrcoaog83",
            "shortName":"Accute Flaccid Paral (Deaths < 5 yrs)",
            "aggregationType":"MAX",
            "domainType":"AGGREGATE",
            "publicAccess":"rw------",
            "zeroIsSignificant":true,
            "url":"",
            "valueType":"NUMBER",
            "categoryCombo":{"id":"p0KPaWEg3cf"},
            "user":{"id":"GOLswS44mh8"},
            "userGroupAccesses":[],
            "attributeValues":[],
            "translations":[{"property":"NAME","locale":"nl","value":"Mark"},{"property":"NAME","locale":"en_FK","value":"aa"},{"property":"SHORT_NAME","locale":"en_GB","value":"Accute Flaccid Paral"},{"property":"FORM_NAME","locale":"en_FK","value":"aa"},{"property":"SHORT_NAME","locale":"fr","value":"Accute French"},{"property":"DESCRIPTION","locale":"en_FK","value":"aa"},{"property":"NAME","locale":"fr","value":"Accute French"},{"property":"SHORT_NAME","locale":"en_FK","value":"aa"},{"property":"NAME","locale":"fr","value":"Hello"},{"property":"NAME","locale":"en_GB","value":"Accute Flaccid Paralysis (Deaths < 5 yrs)"}],
            "aggregationLevels":[]
        });

        return (<MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <div style={{ padding: 16 }}>
                    <RaisedButton
                        onClick={this.toggleDialog()}
                        label="Open translation dialog"
                    />
                </div>
                <TranslationDialog
                    d2={this.props.d2}
                    open={this.state.translationDialog.open}
                    objectToTranslate={dataElement}
                    onTranslationSaved={() => console.log('saved')}
                    onTranslationError={() => console.error('error')}
                    onRequestClose={this.toggleDialog()}
                />
            </div>
        </MuiThemeProvider>);
    }
}
