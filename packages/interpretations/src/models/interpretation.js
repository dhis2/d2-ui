import { pick, last } from 'lodash/fp';
import { apiFetch, apiFetchWithResponse } from '../api/api';
import Comment from './comment';

function getInterpretationIdFromResponse(response)  {
    const location = response.headers.get('location');
    if (location) {
        return last(location.split('/'));
    } else {
        throw new Error("Could not get interpretation ID");
    }
}

export default class Interpretation {
    static sharingFields = ["publicAccess", "externalAccess", "userGroupAccesses", "userAccesses"];

    constructor(parent, attributes) {
        this._parent = parent;
        Object.assign(this, attributes);
        this.comments = (attributes.comments || []).map(commentAttrs => new Comment(this, commentAttrs));
    }

    async save(d2) {
        const modelId = this._parent.id;
        const modelName = this._parent.modelDefinition.name;
        const isNewInterpretation = !this.id;

        if (isNewInterpretation) {
            // Set initial sharing of interpretation from the parent object
            const sharingPayload = { object: pick(Interpretation.sharingFields, this._parent) };

            return apiFetchWithResponse(d2, `/interpretations/${modelName}/${modelId}`, "POST", this.text)
                .then(getInterpretationIdFromResponse)
                .then(interpretationId => {
                    this.id = interpretationId;
                    const sharingUrl = `/sharing?type=interpretation&id=${interpretationId}`;
                    return apiFetch(d2, sharingUrl, "PUT", sharingPayload).then(() => this);
                });
        } else {
            return apiFetch(d2, `/interpretations/${this.id}`, "PUT", this.text).then(() => this);
        }
    }

    delete(d2) {
        return apiFetch(d2, `/interpretations/${this.id}`, "DELETE");
    }

    like(d2, value) {
        return apiFetch(d2, `/interpretations/${this.id}/like`, value ? "POST" : "DELETE");
    }
}
