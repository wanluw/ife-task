(function () {

    var isDateValid = false;
    var timeoutId;

    function animate(targetTime) {
        var nowTime = (new Date()).getTime();
        if (targetTime >= nowTime) {
            var diff = Math.floor((targetTime - nowTime) / 1000);
        } else if (targetTime < nowTime) {
            var diff = Math.floor((nowTime - targetTime) / 1000);
        }

        if (diff !== 0) {
            timeoutId = setTimeout(function () {
                animate(targetTime);
            }, 1000);
        }

        var diffDay = Math.floor(diff / 86400);
        var diffHour = Math.floor(diff % 864000 / 3600);
        var diffMinute = Math.floor(diff % 86400 % 3600 / 60);
        var diffSecond = diff % 86400 % 3600 % 60;
        var content = diffDay + '天' + diffHour + '小时' + diffMinute + '分' + diffSecond + '秒';
        $('.countdown')[0].innerHTML = content;
    }

    function getDate() {
        var date = $('.date')[0].value;
        var year = date.slice(0, 4);
        var month = date.slice(5, 7);
        var day = date.slice(8);
        return {
            year: year,
            month: month,
            day: day
        };
    }

    function checkDate(inputDateValue) {
        var inputDate = new Date(inputDateValue);
        if (Object.prototype.toString.call(inputDate) === '[object Date]') {
            if (isNaN(inputDate.getTime())) {
                return false;
            } else {
                var dashFirst = $('.date')[0].value.charAt(4);
                var dashSecond = $('.date')[0].value.charAt(7);
                var length = $('.date')[0].value.length;
                if (length !== 10 || dashFirst !== '-' || dashSecond !== '-') {
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            return false;
        }
    }
    $.on($('.date')[0], 'keyup', function () {
        var inputDateValue = $('.date')[0].value;
        isDateValid = checkDate(inputDateValue);
        if (!isDateValid) {
            $('.date-tips')[0].innerHTML = '日期输入格式YYYY-MM-DD';
        }
        if (isDateValid) {
            $('.date-tips')[0].innerHTML = '';
        }
    })

    $.on($('.timer-submit')[0], 'click', function () {
        if (!isDateValid) {
            $('.date-tips')[0].innerHTML = '日期格式不正确';
            return;
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        var targetDate = getDate();
        var year = targetDate.year;
        var month = targetDate.month;
        var day = targetDate.day;
        var nowTime = (new Date()).getTime();

        var inputDate = new Date($('.date')[0].value);

        if (inputDate >= nowTime) {
            var contentText = '距离' + year + '年' + month + '月' + day + '日还有';

        } else {
            var contentText = '距离' + year + '年' + month + '月' + day + '日过了';
        }
        $('.text')[0].innerHTML = contentText;
        var targetTime = new Date(year, month - 1, day).getTime();
        animate(targetTime);
    });

})();