let defaultTimesheetTitle = '添加工时'
let defaultTimesheetDate = ''
let defaultIsWorkday = true

try {
  if (localStorage.timesheetTitle) {
    defaultTimesheetTitle = localStorage.timesheetTitle
  }
  if (localStorage.timesheetDate) {
    defaultTimesheetDate = localStorage.timesheetDate
  }
  if (localStorage.timesheetIsWorkday) {
    defaultIsWorkday = localStorage.timesheetIsWorkday
  }
} catch (e) {}

export default {
  timesheetTitle: defaultTimesheetTitle,
  timesheetDate: defaultTimesheetDate,
  timesheetIsWorkday: defaultIsWorkday
}
