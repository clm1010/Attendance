export default {
  changeTimesheetTitle (ctx, timesheetTitle) {
    ctx.commit('changeTimesheetTitle', timesheetTitle)
  },
  changeTimesheetDate (ctx, timesheetDate) {
    ctx.commit('changeTimesheetDate', timesheetDate)
  },
  changeTimesheetIsWorkday (ctx, timesheetIsWorkday) {
    ctx.commit('changeTimesheetIsWorkday', timesheetIsWorkday)
  }
}
