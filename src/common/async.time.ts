
class AsyncTime {
    
    delay(ms:number) {
        return new Promise ( resolve => setTimeout(resolve, ms))
    }

}

export default new AsyncTime()