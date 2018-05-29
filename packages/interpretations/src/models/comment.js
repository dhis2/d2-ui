import { apiFetch } from '../util/api';

export default class Comment {
    constructor(interpretation, attributes) {
        this._interpretation = interpretation;
        Object.assign(this, attributes);
    }

    save() {
        const interpretation = this._interpretation;
        const [method, url] = this.id
            ? ['PUT',    `/interpretations/${interpretation.id}/comments/${this.id}`]
            : ['POST', `/interpretations/${interpretation.id}/comments`];
        return apiFetch(url, method, this.text);
    }

    delete() {
        const interpretation = this._interpretation;
        const url = `/interpretations/${interpretation.id}/comments/${this.id}`;
        return apiFetch(url, "DELETE");
    }
}