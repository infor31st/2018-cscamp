// config
module.exports ={
    reg: function() { // pending , start , end
        var startTime = Date.parse("2018/05/19");
        var endTime = Date.parse("2018/07/05"); // 2018/05/19 ~ 2018/07/04
        var currDate = Date.parse((new Date()).toDateString());
        if(currDate < startTime){
            return "pending";
        } else if(currDate >= startTime && currDate < endTime){
            return "start";
        } else {
            return "end";
        }
    },
    port: "3199"
}
