let defaultTimesheetTitle = '添加工时'
let defaultTimesheetDate = ''
let defaultIsWorkday = true
let defaultApprovalMonth = ''
let defaultApprovalUserId = ''

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
  if (localStorage.approvalMonth) {
    defaultApprovalMonth = localStorage.approvalMonth
  }
  if (localStorage.approvalUserId) {
    defaultApprovalUserId = localStorage.approvalUserId
  }
} catch (e) {}

export default {
  timesheetTitle: defaultTimesheetTitle,
  timesheetDate: defaultTimesheetDate,
  timesheetIsWorkday: defaultIsWorkday,
  approvalMonth: defaultApprovalMonth,
  approvalUserId: defaultApprovalUserId
}
