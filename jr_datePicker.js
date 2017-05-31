/*-- JORY --*/
/*-- Copyright 2017 Jory All Rights Reserved. --*/
/*-- 助理 --*/
/*-- jr_datePicker.js --*/

/**
 * jr_datePicker(getClass)
 * date picker
 * @param getClass : set ONLY the class name (without「.」) ex : 'myClassName'
 * by jory
 */
function jr_datePicker(getClass) {
  // Timestamp before execution
  // var firstTimestamp = new Date().getTime();

  // get the element class name
  var el_className = getClass;
  // get box elements
  var datePicker = document.getElementById('datePicker');
  // prepare html
  boxConstructor();
  // get inner elements
  var selectedYear = document.getElementById('selectedYear');
  var selectedMonth = document.getElementById('selectedMonth');
  var pickerDay = document.getElementById('pickerDay');
  // create today's date
  var dateNow = new Date();
  var yearNow = dateNow.getFullYear();
  var monthNow = dateNow.getMonth();
  var dailyNow = dateNow.getDate();
  var dayNow = dateNow.getDay();
  // animation time option
  var fadeIn_time = 50;
  var fadeOut_time = 20;
  var changeMonth_time = 200;
  // current month increment value
  var monthDefaultValue = 0;
  // current month number
  var setMonthToInput = null;

  /**
   * boxConstructor()
   * get date, year, month, first day of month, number of day in the month
   * @param target : year, month, firstDay, nbDay
   * by jory
   */
  function boxConstructor() {

    var pickerYear = document.createElement('div');
    var pickerMonth = document.createElement('div');
    var pickerDaily = document.createElement('div');
    var pickerDay = document.createElement('div');
    var closePicker = document.createElement('div');

    var pickerYear_inner = '';
    var pickerMonth_inner = '';
    var pickerDaily_inner = '';
    var pickerDay_inner = '';
    var closePicker_inner = '';

    pickerYear.id = 'pickerYear';
    pickerMonth.id = 'pickerMonth';
    pickerDaily.id = 'pickerDaily';
    pickerDay.id = 'pickerDay';
    closePicker.id = 'closePicker';

    pickerYear_inner += '<p id="selectedYear">2017年</p>';

    pickerMonth_inner += '<span class="prev changeMonth"><</span>';
    pickerMonth_inner += '<p id="selectedMonth"></p>';
    pickerMonth_inner += '<span class="next changeMonth">></span>';

    pickerDaily_inner += '<ul>';
    pickerDaily_inner += '<li class="sunday">日</li>';
    pickerDaily_inner += '<li>月</li>';
    pickerDaily_inner += '<li>火</li>';
    pickerDaily_inner += '<li>水</li>';
    pickerDaily_inner += '<li>木</li>';
    pickerDaily_inner += '<li>金</li>';
    pickerDaily_inner += '<li class="saturday">土</li>';
    pickerDaily_inner += '</ul>';

    closePicker_inner += '<p>CLOSE<span>X</span></p>';

    $(pickerYear).append(pickerYear_inner);
    $(pickerMonth).append(pickerMonth_inner);
    $(pickerDaily).append(pickerDaily_inner);
    $(pickerDay).append(pickerDay_inner);
    $(closePicker).append(closePicker_inner);

    $(datePicker)
      .append(pickerYear)
      .append(pickerMonth)
      .append(pickerDaily)
      .append(pickerDay)
      .append(closePicker);
  }

  /**
   * fnDate(target, addMonth)
   * get date, year, month, first day of month, number of day in the month
   * @param target : year, month, firstDay, nbDay
   * @param addMonth : current = 0(no parameter will be set as 0); next = 1; preview = -1 ...
   * @return ret : date, year, month, firstDay, nbDay
   * by jory
   */
  function fnDate(target, addMonth) {
    var ret = null;
    var type = 1;

    if(typeof addMonth === 'undefined') { addMonth = 0 }
    if(target == 'year') { addMonth-- }
    if(target != 'firstDay') { addMonth++ }
    if(target == 'nbDay') { type = 0 }

    var date = new Date(dateNow.getFullYear(), (dateNow.getMonth()+addMonth), type);

    switch (target) {
      case 'year':
        ret = date.getFullYear();
        break;
      case 'month':
        ret = date.getMonth();
        break;
      case 'firstDay':
        ret = date.getDay();
        break;
      case 'nbDay':
        ret = date.getDate();
        break;
      default:
        ret = date;
    }
    return ret;
  }

  /**
   * dayNameEN(index)
   * set english day name
   * @param index : day index (0 ~ 6)
   * @return ret : day name
   * by jory
   */
  function dayNameEN(index) {
    ret = null;
    switch (index) {
      case 0:
        ret = 'Sun';
        break;
      case 1:
        ret = 'Mon';
        break;
      case 2:
        ret = 'Tu';
        break;
      case 3:
        ret = 'Wed';
        break;
      case 4:
        ret = 'Thu';
        break;
      case 5:
        ret = 'Fri';
        break;
      case 6:
        ret = 'Sat';
        break;
      default:
        ret = 'unknow';
    }
    return ret;
  }
  /**
   * dayNameJP(index)
   * set japanese day name
   * @param index : day index (0 ~ 6)
   * @return ret : day name
   * by jory
   */
  function dayNameJP(index) {
    ret = null;
    switch (index) {
      case 0:
        ret = '日';
        break;
      case 1:
        ret = '月';
        break;
      case 2:
        ret = '火';
        break;
      case 3:
        ret = '水';
        break;
      case 4:
        ret = '木';
        break;
      case 5:
        ret = '金';
        break;
      case 6:
        ret = '土';
        break;
      default:
        ret = '不明';
    }
    return ret;
  }

  /**
   * setMonthBox(addMonth)
	 * create new month <ul> tag
   * @param addMonth : current = 0(no parameter will be set as 0); next = 1; preview = -1 ...
   * by jory
	 */
  function setMonthBox(addMonth) {
    if(typeof addMonth === 'undefined') { addMonth = 0 }
    var getFirstDayMonth = fnDate('firstDay', addMonth);
    var getNumberDay = fnDate('nbDay', addMonth);

    var newUl = document.createElement('ul');
    var newLi = '';
    var dayCount = 0;

    if(getFirstDayMonth > 0) {
      var prevMonthLastDay = fnDate('nbDay', addMonth-1);

      for(var i = 0; i < getFirstDayMonth; i++) {
        prevMonthLastDay++;
        newLi += '<li class="unset">' + (prevMonthLastDay - getFirstDayMonth) + '</li>';
        dayCount++;
      }
    }

    for(var j = 0; j < getNumberDay; j++) {
      var day = j + 1;
      if(addMonth == 0 && day == dailyNow) {
        newLi += '<li class="today">' + day + '</li>';
      }else {
        newLi += '<li>' + day + '</li>';
      }
    }

    var dayRest = 7 - (dayCount + (getNumberDay % 7));
    if(dayRest < 0) { dayRest += 7 }

    for(var k = 0; k < dayRest; k++) {
      newLi += '<li class="unset">' + (k+1) + '</li>';
    }

    $(newUl).append(newLi);
    $(pickerDay).append(newUl);
  }

  /**
   * organizeMonthBox(addMonth, select)
   * set/reset month box contents
   * @param addMonth : current = 0(no parameter will be set as 0); next = 1; preview = -1 ...
   * by jory
   */
  function organizeMonthBox(addMonth) {
    if(typeof addMonth === 'undefined') { addMonth = 0 }
    if(addMonth == 0) { monthDefaultValue = 0 }

    var setYearLabel = fnDate('year', addMonth);
    var setMonthLabel = fnDate('month', addMonth);

    setYearToInput = setYearLabel;
    setMonthToInput = setMonthLabel;
    setMonthLabel = (setMonthLabel == 0) ? 12 : setMonthLabel;

    $(selectedYear).text(setYearLabel + '年');
    $(selectedMonth).text(setMonthLabel + '月');

    // remove old data
    $(pickerDay).find('ul').remove();
    // set new data
    setMonthBox(addMonth);
    // show new data
    $(pickerDay).find('ul').fadeIn(changeMonth_time);
  }

  /**
   * actionDateBox(e, resetBox)
   * box actions (open, close, change month, select day)
   * @param e : event target
   * @param resetBox : true = reset box to current month; false = do not reset
   * by jory
   */
  var elementDate = '';
  function actionDateBox(e, resetBox) {
    // box open condition
    var openCondition = $(e.target).hasClass(el_className);
    // change month condition
    var changeCondition = $(e.target).hasClass('changeMonth');
    // box close conditions
    var closeCondition1 = $(e.target).closest('#pickerDay li:not(".unset")').length;
    var closeCondition2 = !$(e.target).closest('#datePicker').length;
    var closeCondition3 = $(e.target).closest('#closePicker p').length;
    // open action
    if(openCondition) {
      $(datePicker).css({
        top: e.target.offsetTop + e.target.offsetHeight + 1,
        left: e.target.offsetLeft,
      })
      $(datePicker).fadeIn(fadeIn_time);
      elementDate = $(e.target);
    }
    // change month action
    if(changeCondition) {
      if($(e.target).hasClass('next')) {
        monthDefaultValue++;
      }else if($(e.target).hasClass('prev')) {
        monthDefaultValue--;
      }
      organizeMonthBox(monthDefaultValue);
    }
    // select date action
    if(closeCondition1) {
      var getLi = $(pickerDay).find('li');
      var elIndex = $(getLi).index(e.target);
      var dayIndex = (elIndex) % 7;
      var day = dayNameJP(dayIndex);

      var text = ('0' + setMonthToInput).slice(-2) + '/' + ('0' + $(e.target).text()).slice(-2) + '(' + day + ')';
      $(elementDate).text(text);
    }
    // close action
    if( !openCondition && (closeCondition1 || closeCondition2 || closeCondition3) ) {
      $(datePicker).fadeOut(fadeOut_time);
      if(resetBox == true) {
        setTimeout(organizeMonthBox, fadeOut_time);
      }
    }
  }

  // set the current month pop up box
  organizeMonthBox();

  // datePicker event actions
  $(document).on('click', function(e) { actionDateBox(e, true) });


  // Timestamp after execution
  // var secondTimestamp = new Date().getTime(),
  //     result = secondTimestamp - firstTimestamp;
  // alert("Time laps is : " + result + " milliseconds.");
}
