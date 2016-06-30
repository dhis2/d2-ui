import React, { Component } from 'react';
import { render } from 'react-dom';
import TranslationDialog from '../../src/i18n/TranslationDialog.component';
import { init, config } from 'd2/lib/d2';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

jQuery.ajaxSetup({ headers: { Authorization: DHIS_CONFIG.authorization } });
const baseUrl = `${DHIS_CONFIG.baseUrl}/api`;

config.baseUrl = baseUrl;
init({ baseUrl }).then(renderExamples);

function renderExamples(d2) {
    const dataElement = d2.models.dataElement.create({"code":"DE_11486142","created":"2011-04-20T15:54:58.775+0000","lastUpdated":"2016-06-29T07:30:50.235+0000","name":"Accute Flaccid Paralysis (Deaths < 5 yrs)2","id":"FTRrcoaog83","shortName":"Accute Flaccid Paral (Deaths < 5 yrs)","aggregationType":"MAX","domainType":"AGGREGATE","publicAccess":"rw------","zeroIsSignificant":true,"url":"","valueType":"NUMBER","categoryCombo":{"id":"p0KPaWEg3cf"},"user":{"id":"GOLswS44mh8"},"userGroupAccesses":[],"attributeValues":[],"translations":[{"property":"NAME","locale":"nl","value":"Mark"},{"property":"NAME","locale":"en_FK","value":"aa"},{"property":"SHORT_NAME","locale":"en_GB","value":"Accute Flaccid Paral"},{"property":"FORM_NAME","locale":"en_FK","value":"aa"},{"property":"SHORT_NAME","locale":"fr","value":"Accute French"},{"property":"DESCRIPTION","locale":"en_FK","value":"aa"},{"property":"NAME","locale":"fr","value":"Accute French"},{"property":"SHORT_NAME","locale":"en_FK","value":"aa"},{"property":"NAME","locale":"fr","value":"Hello"},{"property":"NAME","locale":"en_GB","value":"Accute Flaccid Paralysis (Deaths < 5 yrs)"}],"aggregationLevels":[]});

    class TranslationExample extends Component {
        render() {
            return (
                <TranslationDialog
                    open
                    objectToTranslate={dataElement}
                />
            );
        }

        getChildContext() {
            return {
                d2: d2,
            };
        }
    }
    TranslationExample.childContextTypes = {
        d2: React.PropTypes.object,
    };

    render(<TranslationExample />, document.querySelector('#app'));
}
