import { makeAutoObservable } from "mobx";
import agent from "../Utils/agent";
import MessageModel from "../Models/MessageModel";

export default class MessageStore {
    title = 'Well hello there!!';
    editMode = false;
    isLoading = false;

    messages: MessageModel[] = [];

    chosenMessage: MessageModel = {
        id: '',
        text: '',
        username:'',
        createdAt: '',
        updatedAt:''
    };

    constructor() {
        makeAutoObservable(this);
    };


    setIsLoading = (state: boolean) => {
        this.isLoading = state;
    }

    toggleEditMode = async (message?: MessageModel | undefined) => {
        this.setIsLoading(true);
        this.editMode = !this.editMode;

        if(this.editMode){
            if(message){
                this.chosenMessage = message;
            }
            else{
                this.chosenMessage = {
                    id: '',
                    text: '',
                    username:'',
                    createdAt: '',
                    updatedAt:''
                };
            }
        }
        else{
            this.chosenMessage = {
                id: '',
                text: '',
                username:'',
                createdAt: '',
                updatedAt:''
            };
        }
        console.log(this.chosenMessage.id)
        this.setIsLoading(false);
    }
    
    handleFormChange = (event: any) => {
        const {value, name} = event.target;

        this.chosenMessage = {
            ...this.chosenMessage,
            [name]: value
        };
    }

    getMessages = async () => {
        this.setIsLoading(true);
        this.messages = await agent.Messages.list();
        this.sortMessages();

        this.setIsLoading(false);
    };

    editMessage = async () => {
        this.setIsLoading(true);
        await agent.Messages.update(this.chosenMessage.id, this.chosenMessage);
        this.setIsLoading(false);
        
    }

    deleteMessage = async () => {
        this.setIsLoading(true);
        await agent.Messages.update(this.chosenMessage.id, this.chosenMessage);
        this.setIsLoading(false);
    }

    sortMessages = (sortString = 'createdAt-desc') => {
        const [sortKey, sortOrder] = sortString.split('-');
        switch(sortKey.toLowerCase()){
            case 'createdAt':
            default:
                if(sortOrder === 'asc')
                    this.messages = this.messages.sort((x,y) => x.createdAt > y.createdAt ?  1 : -1 );
                else
                    this.messages = this.messages.sort((x,y) => x.createdAt < y.createdAt ?  1 : -1 );
               break;
            case 'updatedAt':
                if(sortOrder === 'asc')
                    this.messages  = this.messages.sort((x,y) => x.updatedAt > y.updatedAt ? -1 : 1 );
                else
                    this.messages  = this.messages.sort((x,y) => x.updatedAt < y.updatedAt ? -1 : 1 );
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        this.setIsLoading(true);

        let response = await agent.Messages.create({text: this.chosenMessage.text, username: this.chosenMessage.username});
        console.log('response: ' + response);
        this.toggleEditMode();
        this.getMessages();
    }

    handleMessageClickedInMessageBoard = ( message:MessageModel) => {
        if(this.chosenMessage.id === message.id)
            this.chosenMessage = {
                id: '',
                text: '',
                username:'',
                createdAt: '',
                updatedAt:''
            };
        else
            this.chosenMessage = message;


    }

}