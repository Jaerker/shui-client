import { makeAutoObservable } from "mobx";
import agent from "../Utils/agent";
import MessageModel from "../Models/MessageModel";

export default class MessageStore {
    title = 'Well hello there!!';
    editMode = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    };

    messages: MessageModel[] = [];

    setIsLoading = (state: boolean) => {
        this.isLoading = state;
    }
    toggleEditMode = () => {
        this.editMode = !this.editMode;
    }

    getMessages = async () => {
        this.setIsLoading(true);
        this.messages = await agent.Messages.list();;
        this.setIsLoading(false);
    };
}