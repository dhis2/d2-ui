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

    static getReplyText(d2, user) {
        const currentUsername = d2.currentUser.username;
        return user && user.userCredentials && user.userCredentials.username !== currentUsername ?
            ("@" + user.userCredentials.username + "\xA0") : "";
    }

    getReply(d2) {
        const text = Comment.getReplyText(d2, this.user);
        return new Comment(this._interpretation, { text });
    }

    static getReplyForInterpretation(d2, interpretation) {
        const text = Comment.getReplyText(d2, interpretation.user);
        return new Comment(interpretation, { text });
    }
}