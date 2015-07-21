(function () {

    var currentIndex = 0;

    var stopAnimation = false;

    var sequence = 1;

    var length = 4;

    var timer;

    var singleLoop = function () {

        if (timer) {
            clearTimeout(timer);
        }

        var targetIndex;
        timer = setTimeout(function () {
            if (stopAnimation) {
                return;
            }
            if (sequence === 1 && currentIndex === length) {
                // 正序
                targetIndex = 0;
            } else if (sequence === -1 && currentIndex === 0) {
                // 逆序
                targetIndex = length;
            } else {
                targetIndex = currentIndex + sequence * 1;
            }

            select(targetIndex, function () {
                currentIndex = targetIndex;
                singleLoop();
            });

        }, 1500);
    }

    singleLoop();

    $.on($('.slider-content')[0], 'mouseenter', function () {
        stopAnimation = true;
    })

    $.on($('.slider-content')[0], 'mouseleave', function () {
        stopAnimation = false;
        singleLoop();
    })

    $.delegate($('.slider-ft')[0], 'a', 'click', function (event) {
        event.preventDefault();

        var index = event.target.getAttribute('data-index');

        currentIndex = +index;

        select(currentIndex);
    })


    function select(index, callback) {
        highLight(index);
        var targetMarginLeft = -index * 640;
        var currentMarginLeft = $('.slider-bd')[0].style.marginLeft;
        currentMarginLeft = currentMarginLeft === '' ? 0 : parseFloat(currentMarginLeft, 10);
        var diff = targetMarginLeft - currentMarginLeft;

        $.animate({
            duration: 500,
            fn: function (percent) {
                $('.slider-bd')[0].style.marginLeft = currentMarginLeft + diff * percent + 'px';
            },
            callback: callback
        });
    }

    function highLight(index) {
        var circleElem = $('.slider-ft-item')[index];
        removeClass($('.current-slider')[0], 'current-slider');
        addClass(circleElem, 'current-slider');
    }

})();