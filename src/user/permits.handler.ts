import SDM from "../deposit/sdm.enum";
import Permits from "./permits.enum";

class PermitsHandler{
    static async checkDepoEditPermits(depo: any, user: any) : Promise<boolean>{
        if (user.permits.includes(Permits.ROOT) || user.permits.includes(Permits.ADMIN)) return true
        if (depo.sdm == 'KORAB' && user.permits.includes(Permits.KORAB)) return true
        if (depo.sdm == 'PASAT' && user.permits.includes(Permits.PASAT)) return true
        return false
    }

    static async checkDepoReadPermits(user: any, depo_album?: any) : Promise<boolean>{
        if (user.permits.includes(Permits.ROOT) 
        || user.permits.includes(Permits.ADMIN) 
        || user.permits.includes(Permits.KORAB)){
            return true
        }
        if(depo_album){
            if(user._id == depo_album) return true
        }
        return false
    }

    static async checkAdminOrSelf(user:any, id:any){
        if(user.permits.includes(Permits.ADMIN) 
        || user.permits.includes(Permits.ROOT)
        || user._id == id){
            return true
        }
        return false
    }

    static async checkAdminPermits(user: any){
        if(user.permits.includes(Permits.ADMIN) 
        || user.permits.includes(Permits.ROOT)){
            return true
        }
        return false
    }

    static async checkRootPermits(user: any){
        if(user.permits.includes(Permits.ROOT)){
            return true
        }
        return false
    }
}

export default PermitsHandler