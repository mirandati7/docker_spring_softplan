export class MasterDetailService{
    
    public NEW: number = 0x000;
    public EDIT: number = 0x001;

    public status: number = 0x000;
    public list: Array<any> = [];
    public item:any = {}; 

    public save(){
         if (this.list.indexOf(this.item) == -1){
            this.list = [...this.list,(this.item)];
        }
        this.new();
    }

    public edit(row){
        
        let item;
        let index = this.list.indexOf(row);
        this.list.splice(index,1); //new - remove apenas 1 item da Lista
        this.list = [...this.list]; //new
        this.status = this.EDIT;
    }

    public delete(row){
        let index = this.list.indexOf(row);
        this.list.splice(index,1); //remove apenas 1 item da Lista
        this.list = [...this.list]; //atualiza a lista
    }

    private new(){
        this.item = {};
        this.status = this.NEW;
    }

}