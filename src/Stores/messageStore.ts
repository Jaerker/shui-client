import { makeAutoObservable, runInAction } from "mobx";
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
        
        const response = await agent.Messages.list();
        runInAction(() => {
            this.messages = response;
        })
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
        await agent.Messages.delete(this.chosenMessage.id);
        runInAction(() => {
            this.messages = this.messages.filter((message) => message.id!== this.chosenMessage.id);
        });
        this.setIsLoading(false);
    }

    sortMessages = (sortString = 'createdAt-desc') => {
        const [sortKey, sortOrder] = sortString.split('-');
        runInAction(()=>{
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
        })
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        this.setIsLoading(true);
        if(this.chosenMessage.id === ''){
            await agent.Messages.create({text: this.chosenMessage.text, username: this.chosenMessage.username});
        }
        else{
            await agent.Messages.update(this.chosenMessage.id, this.chosenMessage);
        }

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