export default {
  changeTimesheetTitle (ctx, timesheetTitle) {
    ctx.commit('changeTimesheetTitle', timesheetTitle)
  },
  changeTimesheetDate (ctx, timesheetDate) {
    ctx.commit('changeTimesheetDate', timesheetDate)
  },
  changeTimesheetIsWorkday (ctx, timesheetIsWorkday) {
    ctx.commit('changeTimesheetIsWorkday', timesheetIsWorkday)
  },
  changeApprovalMonth (ctx, approvalMonth) {
    ctx.commit('changeApprovalMonth', approvalMonth)
  },
  changeApprovalUserId (ctx, approvalUserId) {
    ctx.commit('changeApprovalUserId', approvalUserId)
  }
}
