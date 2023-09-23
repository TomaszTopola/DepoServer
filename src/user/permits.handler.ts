import Permits from "./permits.enum";
/**
 * Checks permissions
 */
class PermitsHandler{

    /**
     * Checks if user hs permission to edit specific Depo.
     * @param depo Depo object
     * @param user User accessing API
     * @returns true - has permission, false - unauthorized
     */
    static async checkDepoEditPermits(depo: any, user: any) : Promise<boolean>{
        if (user.permits.includes(Permits.ROOT) || user.permits.includes(Permits.ADMIN)) return true
        if (depo.sdm == 'KORAB' && user.permits.includes(Permits.KORAB)) return true
        if (depo.sdm == 'PASAT' && user.permits.includes(Permits.PASAT)) return true
        return false
    }
    /**
     * Checks if user hs permission to read specific Depo.
     * @param user User accessing API
     * @param depo_album album number specified in DEPO
     * @returns true - has permission, false - unauthorized
     */
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

    /**
     * Check if user is editing his own account or has admin permissions
     * @param user user accessing API
     * @param id accessed user ID
     * @returns true - has permission, false - unauthorized
     */
    static async checkAdminOrSelf(user:any, id:any){
        if(user.permits.includes(Permits.ADMIN) 
        || user.permits.includes(Permits.ROOT)
        || user._id == id){
            return true
        }
        return false
    }

    /**
     * Check if user is an admin
     * @param user User accessing API
     * @returns true - has permission, false - unauthorized
     */
    static async checkAdminPermits(user: any){
        if(user.permits.includes(Permits.ADMIN) 
        || user.permits.includes(Permits.ROOT)){
            return true
        }
        return false
    }
    /**
     * Check if user has ROOT permission.
     * @param user User accessing API
     * @returns true - has permission, false - unauthorized
     */
    static async checkRootPermits(user: any){
        if(user.permits.includes(Permits.ROOT)){
            return true
        }
        return false
    }
}

export default PermitsHandler