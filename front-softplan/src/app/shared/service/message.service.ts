import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {

    public messages: Array<any> = [];

    public success(message: string) {
        this.messages = [];
        this.messages.push({severity: 'success', summary: 'Sucesso', detail: message});
    }

    public info(message: string) {
        this.messages = [];
        this.messages.push({severity: 'info', summary: 'Informação', detail: message});
    }

    public warn(message: string) {
        this.messages = [];
        this.messages.push({severity: 'warn', summary: 'Atenção', detail: message});
    }

    public error(message: string) {
        this.messages = [];
        this.messages.push({severity: 'error', summary: 'Exclusão', detail: message});
    }

    public template(message: string) {
        this.messages = [];
        this.messages.push({severity: 'info', summary: 'Informação', detail: message});
    }

}