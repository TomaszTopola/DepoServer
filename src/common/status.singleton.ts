
class StatusSingleton {
    private static instance: StatusSingleton

    private dbConnectedStatus: boolean = false;
    private enableMailing: boolean = true;

    private constructor() {}

    public static getInstance(): StatusSingleton{
        if (!this.instance) this.instance = new StatusSingleton()
        return this.instance
    }

    getDbConnectedStatus(): boolean{
        return this.dbConnectedStatus
    }

    setDbConnectedStatus(status: boolean): void{
        this.dbConnectedStatus = status
    }

    getEnableMailing(){
        return this.enableMailing;
    }

    setEnableMailing(enableMailing: boolean){
        this.enableMailing = enableMailing
    }


}

export default StatusSingleton.getInstance()