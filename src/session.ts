import * as _ from 'lodash';

class Session {
    private session = {};

    constructor(){}

    set (userId, value: Object) {
        const currentSession = _.get(this.session, [userId], {});
        _.set(this.session, [userId], {...currentSession, ...value});
        return this;
    }

    get (userId) {
        return _.get(this.session, [userId], undefined);
    }

    destroy(userId) {
        delete this.session[userId];
        return this;
    }

    list() {
        return this.session;
    }
}

export default new Session();
