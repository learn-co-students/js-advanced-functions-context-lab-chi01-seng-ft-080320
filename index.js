/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    console.log(eligibleDates, '------------')

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(arr){
    return {
        firstName : arr[0], 
        familyName : arr[1], 
        title : arr[2], 
        payPerHour : arr[3], 
        timeInEvents : [], 
        timeOutEvents : []
    }
}

let createEmployeeRecords = function (arr) {
    return arr.map(element => createEmployeeRecord(element));
}


let createTimeInEvent = function(dateTime){
    const date = dateTime.split(' ')[0]
    const time = parseInt(dateTime.split(' ')[1])
    this.timeInEvents.push({
        type: 'TimeIn', 
        hour: time, 
        date: date
    });
    return this
}

let createTimeOutEvent = function (dateTime) {
    const date = dateTime.split(' ')[0];
    const time = parseInt(dateTime.split(' ')[1])
    this.timeOutEvents.push({
        type: 'TimeOut', 
        hour: time, 
        date: date
    });
    return this
}


const hoursWorkedOnDate = function (date) {
    let timeIn = this.timeInEvents.find(element => element.date === date)
    let timeOut = this.timeOutEvents.find(element => element.date === date)
    const hours = (timeOut.hour - timeIn.hour) / 100
    return hours 
}

const wagesEarnedOnDate = function (date) {
    const hourlyPay = this.payPerHour 
    //this.hoursWorkedOnDate() cannot work, hoursWorkedOn date is not a function defined
    //in an attribute of the this object
    //instead to use "this" you must use the .call method to pass in "this" as an argument, which represents
    // the current employee object which we are calling the function on
    // and pass in the date with it 
    return hoursWorkedOnDate.call(this, date) * hourlyPay
}

const findEmployeeByFirstName = function (srcArr, firstName){
    return srcArr.find((element => element.firstName === firstName))
}

const calculatePayroll = function (srcArr) {

    // calculates total wages without using the first given function 

    // let dates = srcArr.map(employee =>{
    //     return employee.timeInEvents.map(function(e) {
    //         return e.date
    //     });
    // });

    // for(let i = 0; i < dates.length; i++){
    //     dates[i].forEach(date =>{
    //         totalOwed += wagesEarnedOnDate.call(srcArr[i], date)
    //     });
    // }
    return srcArr.reduce(function(totalOwed, element){
        return totalOwed + allWagesFor.call(element)
    },0);
}