import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Utils/agent";
import MessageModel from "../Models/MessageModel";

export default class MessageStore {
    messages: MessageModel[] = [];
    

    chosenMessage: MessageModel = {
        id: '',
        text: '',
        username:'',
        createdAt: '',
        updatedAt:''
    };
    
    editMode = false;
    sortMode = false;
    searchMode = false
    
    isLoading = false;
    
    sortString = '';
    searchValue = '';

    constructor() {
        makeAutoObservable(this);
    };

    setIsLoading = (state: boolean) => {
        this.isLoading = state;
    }

    setSortString = (value:string) => {
        this.sortString = value;
        this.sortMessages();
    }
    setSearchValue = (value:string) => {
        this.searchValue = value;
    }
    
    getMessages = async () => {
        this.setIsLoading(true);
        
        const response = await agent.Messages.list();
        runInAction(() => {
            this.messages = response;
        })

        this.setIsLoading(false);
    };

    editMessage = async () => {
        this.setIsLoading(true);
        await agent.Messages.update(this.chosenMessage.id, this.chosenMessage);
        this.setIsLoading(false);
        
    }

    deleteMessage = async () => {
        this.setIsLoading(true);
        setTimeout(()=> {
            if(window.confirm('Tryck på OK om du är säker på att du vill ta bort anteckningen.')){
                agent.Messages.delete(this.chosenMessage.id);
                runInAction(() => {
                    this.messages = this.messages.filter((message) => message.id!== this.chosenMessage.id);
                });            
            }
        }, 150)
        
        this.setIsLoading(false);
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

    
    toggleSortMode = () => this.sortMode =!this.sortMode;

    sortMessages = () => {
        const [sortKey, sortOrder] = this.sortString.split('-');
        runInAction(()=>{
        switch(sortKey){
            case 'createdAt':
                default:
                    if(sortOrder === 'asc'){
                    this.messages = this.messages.sort((x,y) => x.createdAt < y.createdAt ?  1 : -1 );
                }
                else{
                    this.messages = this.messages.sort((x,y) => x.createdAt > y.createdAt ?  1 : -1 );
                }
                    break;
            case 'updatedAt':
                if(sortOrder === 'asc'){
                    this.messages  = this.messages.sort((x,y) => x.updatedAt > y.updatedAt ? -1 : 1 );
                }
                else{
                    this.messages  = this.messages.sort((x,y) => x.updatedAt < y.updatedAt ? -1 : 1 );
                }
            }

        });
    }

    toggleSearchMode = () => this.searchMode = !this.searchMode;

    handleSearchChange = (event: any) => {
        const {value} = event.target;
        runInAction(()=>{
            this.searchValue = value;
        });
    }
    handleSearchSubmit = async (event:any) => {
        event.preventDefault();
        if(this.searchMode){
            if(this.searchValue === ''){
                this.getMessages();
                
            }
            else{
                const newList: MessageModel[] = await agent.Messages.list();

                runInAction(() => {
                    this.messages = newList.filter(x => x.username.includes(this.searchValue) || x.text.includes(this.searchValue));
                });
    
            }

        }
        else{
            if(this.searchValue !== ''){
                this.sortMessages();
            }
        }
        this.toggleSearchMode();
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