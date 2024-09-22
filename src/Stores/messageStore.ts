import { action, makeObservable, observable } from "mobx";

export default class MessageStore {
    title = 'Well hello there!';

    constructor() {
        makeObservable(this, {
            title: observable,
            getMessages: action
        })
    }

    getMessages = () => {
        
    }
}