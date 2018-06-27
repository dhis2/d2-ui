import { pick, last } from 'lodash/fp';
import { apiFetch, apiFetchWithResponse } from '../util/api';
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

    save() {
        const modelId = this._parent.id;
        const modelName = this._parent.modelDefinition.name;
        const isNewInterpretation = !this.id;

        if (isNewInterpretation) {
            // Set initial sharing of interpretation from the parent object
            const sharingPayload = { object: pick(Interpretation.sharingFields, this._parent) };

            return apiFetchWithResponse(`/interpretations/${modelName}/${modelId}`, "POST", this.text)
                .then(getInterpretationIdFromResponse)
                .then(interpretationId =>
                    apiFetch(`/sharing?type=interpretation&id=${interpretationId}`, "PUT", sharingPayload)
                );
        } else {
            return apiFetch(`/interpretations/${this.id}`, "PUT", this.text);
        }
    }

    delete() {
        return apiFetch(`/interpretations/${this.id}`, "DELETE");
    }

    like(value) {
        return apiFetch(`/interpretations/${this.id}/like`, value ? "POST" : "DELETE");
    }
}
