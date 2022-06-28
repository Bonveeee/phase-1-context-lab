/* Your Code Here */
function createEmployeeRecord(array) {
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}


function createEmployeeRecords(arrayRecord) {
    let employeeRecords = arrayRecord.map((record) => createEmployeeRecord(record));
    return employeeRecords;

}

//creates timein
 let createTimeInEvent = function(dateStamp) {

    let [date, hour] = dateStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
}


// creates time out
let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(" ");

    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
    return this;
  }

 let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(event =>
        event.date == date)
    let timeOut = this.timeOutEvents.find(event =>
        event.date == date)
    let totalTime = (timeOut.hour - timeIn.hour) / 100
    return totalTime;
}

let wagesEarnedOnDate = function (date) {
    let hours = hoursWorkedOnDate.call(this, date)
    return this.payPerHour * hours;
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(record){
      return record.firstName === firstName
    })
  }
  

let calculatePayroll = function(employeeRecord) {
    return employeeRecord.reduce((total, employee) => {
        return total + allWagesFor.call(employee)
    }, 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

