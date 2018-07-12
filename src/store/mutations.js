export default {
  changeTimesheetTitle (state, timesheetTitle) {
    state.timesheetTitle = timesheetTitle
    try {
      localStorage.timesheetTitle = timesheetTitle
    } catch (e) {}
  },
  changeTimesheetDate (state, timesheetDate) {
    state.timesheetDate = timesheetDate
    try {
      localStorage.timesheetDate = timesheetDate
    } catch (e) {}
  },
  changeTimesheetIsWorkday (state, timesheetIsWorkday) {
    state.timesheetIsWorkday = timesheetIsWorkday
    try {
      localStorage.timesheetIsWorkday = timesheetIsWorkday
    } catch (e) {}
  }
}
