export default {
    daojishi(time) {
        return new Promise((res,rej)=>{
            let timeDif = time;
            let addZero =(value)=> {
                return value < 10 ? "0" + value : value;
            }
            let timer =()=> {
                if (timeDif <= 0) {
                    rej();
                }
                let hour = Math.floor(timeDif / (60 * 60));
                let minute = Math.floor((timeDif - hour * 60 * 60) / (60));
                let second = Math.floor((timeDif - hour * 60 * 60 - minute * 60));
                let obj = {
                    hour: addZero(hour),
                    minute: addZero(minute),
                    second: addZero(second)
                }
                res(obj)
            }
            return timer();
        })
    },
    getAdIdHandler(){

    }
}