interface IMessageList {
    displayMessage(message: Message): void;
    updateMessageStatus(id: string, status: MessageStatus): void;
    filterMessages(criteria: FilterCriteria): Message[];
}

export class MessageList implements IMessageList {
    private messages: Message[] = [];
    
    displayMessage(message: Message): void {
        this.messages.push(message);
    }

    updateMessageStatus(id: string, status: MessageStatus): void {
        const message = this.messages.find(m => m.id === id);
        if (message) message.status = status;
    }

    filterMessages(criteria: FilterCriteria): Message[] {
        return this.messages.filter(m => criteria.matches(m));
    }
}