import {PropTypes, createClass, default as React} from 'react';
import SharingDialog from '../src/sharing/SharingDialog.component';

export default createClass({
    contextTypes: {
        d2: React.PropTypes.object,
    },

    render() {
        const objectToShare = this.context.d2.models.dataApprovalLevel.create({
            "created": "2015-10-13T15:05:31.629+0000",
            "lastUpdated": "2015-10-13T15:05:31.629+0000",
            "name": "Facility Funding Agency",
            "id": "y5nCsJviaOU",
            "href": "http://localhost:8080/dhis/api/dataApprovalLevels/y5nCsJviaOU",
            "level": 4,
            "displayName": "Facility Funding Agency",
            "publicAccess": "r-------",
            "externalAccess": true,
            "orgUnitLevel": 4,
            "access": {
                "read": true,
                "update": true,
                "externalize": false,
                "delete": true,
                "write": true,
                "manage": true
            },
            "categoryOptionGroupSet": {
                "id": "SooXFOUnciJ",
                "name": "Funding Agency",
                "created": "2014-03-28T17:05:10.392+0000",
                "lastUpdated": "2014-03-28T17:05:10.392+0000",
                "href": "http://localhost:8080/dhis/api/categoryOptionGroupSets/SooXFOUnciJ"
            },
            "user": {
                "id": "xE7jOejl9FI",
                "name": "John Traore",
                "created": "2013-04-18T15:15:08.407+0000",
                "lastUpdated": "2015-08-11T12:24:43.271+0000",
                "href": "http://localhost:8080/dhis/api/users/xE7jOejl9FI"
            },
            "userGroupAccesses": [
                {"access": "rw------", "userGroupUid": "wl5cDMuUhmF"},
                {"access": "rw------", "userGroupUid": "lFHP5lLkzVr"}
            ]
        });


        return (
            <SharingDialog
                openImmediately
                objectToShare={objectToShare}
                />
        );
    }
});
