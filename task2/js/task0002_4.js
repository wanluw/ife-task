(function () {

    var sug = $('.sug')[0];
    var target = $('.target')[0];

    var question = '';

    function highLight(index) {
        var targetItem = $('.sug-item')[index];
        if ($('.sug-now')[0]) {
            removeClass($('.sug-now')[0], 'sug-now');
        }
        addClass(targetItem, 'sug-now');
    }

    function pressUp(event) {
        event.preventDefault();
        var current = $('.sug-now')[0];
        var index;

        if (sug.innerHTML === '') {
            return;
        }

        if (current) {
            index = +current.getAttribute('data-index');
            if (index === 0) {
                target.value = question;
                removeClass(current, 'sug-now');
                return;
            } else {
                index--;
            }
        } else {
            index = $('.sug-item').length - 1;
        }
        highLight(index);
        var content = $('.sug-now')[0].innerHTML;
        target.value = content;
    }

    function pressDown(event) {
        var current = $('.sug-now')[0];
        var index;

        if (sug.innerHTML === '') {
            return;
        }

        if (current) {
            index = +current.getAttribute('data-index');
            if (index == $('.sug-item').length - 1) {
                target.value = question;
                removeClass(current, 'sug-now');
                return;
            } else {
                index++;
            }
        } else {
            index = 0
        }
        highLight(index);
        var content = $('.sug-now')[0].innerHTML;
        target.value = content;
    }


    $.on(target, 'keydown', function (event) {

        if(event.keyCode === 38) {
            // up
            pressUp(event);
        } else if (event.keyCode === 40) {
            // down
            pressDown(event);
        } else if (event.keyCode === 13) {
            // enter
            if (sug.innerHTML === '') {
                return;
            }
            if (!$('.sug-now')[0]) {
                window.open('https://www.baidu.com/s?wd=' + target.value);
            } else {
                window.open('https://www.baidu.com/s?wd=' + $('.sug-now')[0].innerHTML);
            }
        }
    });


    $.on(target, 'keyup', function (event) {
        if (event.keyCode !== 38 && event.keyCode !== 40 && event.keyCode !== 13) {
            if (target.value !== '') {
                question = target.value;
                jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + question + '&json=1', function (response) {
                    sug.style.display = 'block';

                    var list = response.s;
                    var content = '';
                    each(list, function (item, index) {
                        content += '<li><a href="#" class="sug-item" data-index="' + index + '">' + item + '</a></li>';
                    })
                    sug.innerHTML = content;
                })
            } else {
                question = '';
                sug.innerHTML = '';
                sug.style.display = 'none';
            }
        }
    });

    $.delegate(sug, 'a', 'mouseover', function (event) {
        var current = $('.sug-now')[0];
        var index = +event.target.getAttribute('data-index');
        highLight(index);
    });

    $.delegate(sug, 'a', 'mouseout', function (event) {
        removeClass(event.target, 'sug-now');
    });

    $.delegate($('.sug')[0], 'a', 'click', function (event) {
        event.preventDefault();
        var content = event.target.innerHTML;
        target.value = content;
        window.open('https://www.baidu.com/s?wd=' + $('.sug-now')[0].innerHTML);
    });

})();