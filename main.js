var array = [];
var element = $('#container');

function buildArray() {
    array = [];
    var i;
    for (i = 0; i < 26; i++) {
        array.push(String.fromCharCode(65 + i));
        array.push(String.fromCharCode(97 + i));
    }
    element.html('');
}


function showItem() {
    var char = getRandomAlphabet();
    if (char) {
        $('<div class="item animated flipInX"> ' + char + '</div>').appendTo(element);
        resize();
        console.log('click');
    }
}


function resize() {
    var elBody = $('body'),
        elWindow = $(window);
    elBody.css({
        padding: '30px 50px 70px'
    });

    var itemWidth, itemHeight, fontSize;
    var width = elWindow.width() - 100,
        height = elWindow.height() - 100;

    if (width > height) {
        itemWidth = width / 13;
        itemHeight = height / 4;
    } else {
        itemWidth = width / 4;
        itemHeight = height / 13;
    }

    fontSize = itemWidth;
    if (itemHeight < fontSize) {
        fontSize = itemHeight;
    }

    element.find('.item').css({
        fontSize: fontSize,
        width: itemWidth,
        height: itemHeight,
        'line-height': itemHeight + 'px'
    });
}

buildArray();
showItem();
//console.log(array);

function getRandomAlphabet() {
    var len = array.length;

    if (!len) {
        if (window.confirm('所有字母都学习完啦！是否重新学习？')) {
            buildArray();
            showItem();
        }
        return;
    }
    var index = Math.floor(Math.random() * len);
    var rtn = array[index];

    array.splice(index, 1);//删除；
//    console.log(array);

    return rtn;
}


$(document).keydown(function (e) {
    if (e.keyCode == 32) {
        showItem();
    } else if (e.keyCode) {
        var reg = /^#time=(\d+)/;
        var str = location.hash;
        var match = str.match(reg);
        var period = 500;
        if (match && match[1]) {
            period = Number(match[1]);
        }
        var interval = setInterval(function () {
            if (array.length) {
                showItem();
            } else {
                window.clearInterval(interval); //清楚定时器
            }
        }, period);
    }
}).on('click', showItem)
    .live('touchstart', showItem);
