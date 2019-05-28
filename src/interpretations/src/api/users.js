import { apiFetch } from './api';
import keyBy from 'lodash/fp/keyBy';
import map from 'lodash/fp/map';
import flatMap from 'lodash/fp/flatMap';
import flow from 'lodash/fp/flow';
import groupBy from 'lodash/fp/groupBy';
import without from 'lodash/fp/without';
import concat from 'lodash/fp/concat';
import orderBy from 'lodash/fp/orderBy';
import toPairs from 'lodash/fp/toPairs';
import at from 'lodash/fp/at';
import differenceBy from 'lodash/fp/differenceBy';
import compact from 'lodash/fp/compact';

export async function getMentions(d2) {
    const allUsersResponse = await apiFetch(d2, "/users", "GET", {
        fields: "id,displayName,userCredentials[username]",
        order: "displayName:asc",
        paging: false,
    });

    const interpretationsResponse = await apiFetch(d2, "/interpretations", "GET", {
        fields: "id,mentions",
        filter: [`user.id:eq:${d2.currentUser.id}`, "mentions:!null"],
        paging: false,
    });

    const commentsResponse = await apiFetch(d2, "/interpretations", "GET", {
        fields: "id,comments[mentions]",
        filter: [`comments.user.id:eq:${d2.currentUser.id}`, "comments.mentions.username:!null"],
        paging: false,
    });

    const allUsers = allUsersResponse.users.map(user => ({
        id: user.id,
        displayName: user.displayName,
        username: user.userCredentials.username,
    }));

    const allUsersByUsername = keyBy("username", allUsers);

    const interpretationMentions = flatMap(
        interpretation => map("username", interpretation.mentions),
        interpretationsResponse.interpretations);

    const commentMentions = flatMap(
        interpretation => map("username", flatMap("mentions", interpretation.comments)),
        commentsResponse.interpretations);

    const sortByFrequency = flow(
        groupBy(value => value),
        toPairs,
        map(([value, group]) => ({value, count: group.length})),
        orderBy(["count", "value"], ["desc", "asc"]),
        map("value"),
    );

    const mostMentionedUsernames = flow(
        concat(commentMentions),
        without([d2.currentUser.username]),
        sortByFrequency,
    )(interpretationMentions);

    const mostMentionedUsers = compact(at(mostMentionedUsernames, allUsersByUsername));

    const allUsersFiltered = differenceBy("id", allUsers, mostMentionedUsers)
        .filter(user => d2.currentUser.id !== user.id);

    return {allUsers: allUsersFiltered, mostMentionedUsers};
};
