<template>
<section class="wh_container">
  <div class="wh_content_all">
    <div class="wh_top_changge">
      <li @click="PreMonth()">
        <div class="wh_jiantou1"></div>
      </li>
      <li class="wh_content_li">{{dateTop}}</li>
      <li @click="NextMonth()">
        <div class="wh_jiantou2"></div>
      </li>
    </div>
    <div class="wh_title">
      <div class="wh_content_item" v-for="item in weekTop" :key="item.k">
        <div>
          {{item.v}}
        </div>
      </div>
    </div>
    <div class="wh_content">
      <div
        class="wh_content_item"
        v-for="(item,index) in list"
        @click="clickDay(item,index)"
        :key="index"
      >
        <div>
          <li
            v-if="(isHideOtherday&&item.nextDayShow)||item.otherMonth||item.dayHide"
            class="wh_nextDayShow"
            v-bind:class="[{isToday_now:item.isTodayNow},setClass(item)]"
          >{{item.id}}</li>
          <li
            v-else
            v-bind:class="[{ wh_isToday: item.isToday,wh_isMark:item.isMark,isTodayNow:item.isTodayNow},setClass(item)]"
          >{{item.id}}</li>
          <!-- <li
            v-else="(isHideOtherday&&item.nextDayShow)||item.otherMonth||item.dayHide"
            v-bind:class="[{ wh_isToday: item.isToday,wh_isMark:item.isMark,isTodayNow:item.isTodayNow},setClass(item)]"
          >{{item.id}}</li> -->
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
export default {
  name: 'AttendanceCalendar',
  data () {
    return {
      weekTop: [
        {k: '01', v: '一'},
        {k: '02', v: '二'},
        {k: '03', v: '三'},
        {k: '04', v: '四'},
        {k: '05', v: '五'},
        {k: '06', v: '六'},
        {k: '07', v: '日'}
      ],
      myData: [],
      list: [],
      dateTop: ''
    }
  },
  props: {
    markDate: {
      default: '[]'
    },
    markDateMore: {
      default: '[]'
    },
    agoDayHide: {
      default: '0'
    },
    futureDayHide: {
      default: '15181550670000'
    },
    isHideOtherday: {
      default: false
    }
  },
  created () {
    this.myData = new Date()
  },
  methods: {
    setClass (data) {
      let obj = {}
      obj[data.markClassName] = data.markClassName
      return obj
    },
    clickDay: function (item, index) {
      if (!(this.isHideOtherday && item.nextDayShow) && !item.dayHide) {
        this.$emit('choseDay', item.date)
      }
      if (item.otherMonth) {
        item.otherMonth < 0 ? this.PreMonth(item.date) : this.NextMonth(item.date)
      } else {
        if (!(this.isHideOtherday && item.nextDayShow) && !item.dayHide) {
          for (let i = 0; i < this.list.length; i++) {
            if (i === index) {
              this.list[i].isToday = true
            } else {
              this.list[i].isToday = false
            }
          }
        }
      }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = this.dateFormat(date)
      this.myData = new Date(date)
      this.$emit('changeMonth', this.dateFormat(this.myData))
      this.getList(this.myData, date, isChosedDay)
    },
    PreMonth: function (date, isChosedDay = true) {
      date = this.dateFormat(date)
      this.myData = this.getPreMonth(this.myData)
      this.$emit('changeMonth', this.dateFormat(this.myData))
      this.getList(this.myData, date, isChosedDay)
    },
    NextMonth: function (date, isChosedDay = true) {
      date = this.dateFormat(date)
      this.myData = this.getNextMonth(this.myData)
      this.$emit('changeMonth', this.dateFormat(this.myData))
      this.getList(this.myData, date, isChosedDay)
    },
    getPreMonth: function (date) {
      let timeArray = this.dateFormat(date).split('/')
      let year = timeArray[0]
      let month = timeArray[1]
      let day = timeArray[2]
      // let days = new Date(year, month, 0)
      // days = days.getDate()
      let year2 = year
      let month2 = parseInt(month) - 1
      if (month2 === 0) {
        year2 = parseInt(year2) - 1
        month2 = 12
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      if (day2 < 10) {
        day2 = '0' + day2
      }
      let t2 = year2 + '/' + month2 + '/' + day2
      return new Date(t2)
    },
    getNextMonth: function (date) {
      let arr = this.dateFormat(date).split('/')
      let year = arr[0] // 获取当前日期的年份
      let month = arr[1] // 获取当前日期的月份
      let day = arr[2] // 获取当前日期的日
      // let days = new Date(year, month, 0)
      // days = days.getDate() // 获取当前日期中的月的天数
      let year2 = year
      let month2 = parseInt(month) + 1
      if (month2 === 13) {
        year2 = parseInt(year2) + 1
        month2 = 1
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      if (day2 < 10) {
        day2 = '0' + day2
      }
      let t2 = year2 + '/' + month2 + '/' + day2
      return new Date(t2)
    },
    getDaysInOneMonth: function (date) { // 当前月的天数
      let getyear = date.getFullYear()
      let getmonth = date.getMonth() + 1
      let d = new Date(getyear, getmonth, 0)
      return d.getDate()
    },
    getMonthweek: function (date) { // 向前空几个
      let getyear = date.getFullYear()
      let getmonth = date.getMonth() + 1
      let dateOne = new Date(getyear + '/' + getmonth + '/1')
      return dateOne.getDay() === 0 ? 6 : dateOne.getDay() - 1
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const mygetMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      this.dateTop = date.getFullYear() + '年' + mygetMonth + '月'
      let array = []
      const onMonthDays = this.getDaysInOneMonth(date)
      for (let i = 0; i < onMonthDays; i++) {
        const nowTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (i + 1)
        let markClassName = ''
        for (const k of this.markDateMore) {
          if (k.date === nowTime) {
            markClassName = k.className
          }
        }
        let listObj = {
          id: i + 1,
          date: nowTime,
          isMark: this.markDate.indexOf(nowTime) >= 0,
          dayHide: new Date(nowTime).getTime() / 1000 < parseInt(this.agoDayHide) || new Date(nowTime).getTime() / 1000 > parseInt(this.futureDayHide),
          markClassName: markClassName,
          nextDayShow: new Date(nowTime).getTime() >
            new Date().getTime()
        }
        if (this.dateFormat(new Date()) === this.dateFormat(new Date(nowTime)) && !chooseDay) {
          listObj = Object.assign(listObj, {
            isTodayNow: true,
            isToday: true
          })
          this.$emit(
            'isToday',
            this.dateFormat(nowTime)
          )
        } else {
          listObj = Object.assign(listObj, {
            isTodayNow: false,
            isToday: chooseDay === nowTime && isChosedDay
          })
        }
        array.push(listObj)
      }
      const leftArr = this.getLeftArr(date)
      const rightArr = this.getRightArr(date, array)
      array = [...leftArr, ...array, ...rightArr]
      this.list = array
    },
    getLeftArr: function (date) {
      let array = []
      const leftNum = this.getMonthweek(date)
      const num = this.getDaysInOneMonth(this.getPreMonth(date)) - leftNum + 1
      const preDate = this.getPreMonth(date)
      // 上个月多少开始
      for (let i = 0; i < leftNum; i++) {
        const nowTime = preDate.getFullYear() + '/' + (preDate.getMonth() + 1) + '/' + (num + i)
        array.push({
          id: num + i,
          date: nowTime,
          dayHide: new Date(nowTime).getTime() / 1000 < parseInt(this.agoDayHide) || new Date(nowTime).getTime() / 1000 > parseInt(this.futureDayHide),
          nextDayShow: new Date(nowTime).getTime() >
            new Date().getTime(),
          otherMonth: -1
        })
      }
      return array
    },
    getRightArr: function (date, arr) {
      let array = []
      const nextDate = this.getNextMonth(date)
      const _length = 7 - arr.length % 7
      // 向后添加数据
      if (_length < 7) {
        for (let i = 0; i < _length; i++) {
          const nowTime = nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (i + 1)
          array.push({
            id: i + 1,
            date: nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (i + 1),
            dayHide: new Date(nowTime).getTime() / 1000 < parseInt(this.agoDayHide) || new Date(nowTime).getTime() / 1000 > parseInt(this.futureDayHide),
            nextDayShow: new Date(nowTime).getTime() >
              new Date().getTime(),
            otherMonth: 1
          })
        }
      }
      return array
    },
    dateFormat: function (date) {
      date = new Date(date)
      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    }
  },
  mounted () {
    this.getList(this.myData)
  },
  watch: {
    markDate (val, oldVal) {
      this.getList(this.myData)
    },
    markDateMore (val, oldVal) {
      this.getList(this.myData)
    }
  }
}
</script>
<style lang="stylus" scoped>
  li
    list-style-type: none;

  .wh_container
    margin: auto;
  .wh_content_all
    // background-color: #0fc37c;
    width: 100%;
    overflow: hidden;
    padding-bottom: 0.16rem;
  .wh_top_changge
    background-color: #2196f3;
    display: flex;
    .wh_jiantou1
      width: 0.24rem;
      height: 0.24rem;
      border-top: 0.04rem solid #FFF;
      border-left: 0.04rem solid #FFF;
      transform: rotate(-45deg);
      &:active
        border-color: #DDD;
    .wh_jiantou2
      width: 0.24rem;
      height: 0.24rem;
      border-top: 0.04rem solid #FFF;
      border-right: 0.04rem solid #FFF;
      transform: rotate(45deg);
      &:active
        border-color: #DDD;
    li
      cursor: pointer;
      display: flex;
      color: #FFF;
      font-size: 0.36rem;
      flex: 1;
      justify-content: center;
      align-items: center;
      height: 0.94rem;
      .wh_content_li
        cursor: auto;
        flex: 2.5;
  .wh_title
    display: flex;
    flex-wrap: wrap;
    padding: 0 .2rem;
    width: 100%;
    background-color: #2196f3;
    .wh_content_item
      color: #FFF;
      font-size: 0.36rem;
      width: 14.285714%;
      height: 1rem;
      line-height: 1rem;
      position: relative;
      div
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
  .wh_content
    display: flex;
    flex-wrap: wrap;
    padding: .2rem;
    width: 100%;
    .wh_content_item
      font-size: 0.32rem;
      width: 14.285714%;
      padding-bottom: 10.14%;
      text-align: center;
      color: #2196f3;
      position: relative;
      div
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .wh_nextDayShow
          color: #bfbfbf;
        .wh_isMark
          margin: auto;
          border-radius: 2rem;
          border: 0.02rem solid blue;
          z-index: 2;
        li
          width: 0.74rem;
          height: 0.74rem;
          border-radius: 2rem;
          line-height: 0.74rem;
      .wh_isToday
        margin: auto;
        background-color: #2196f3;
        color: #FFF;
        border-radius: 100px;
        text-align: center;
</style>
