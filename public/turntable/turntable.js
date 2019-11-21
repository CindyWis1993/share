$(() => {
    var $turntable = $('.turntable');
    var $turntableNum = $('.turntableNum');
    var $turntableBtn = $('.setTurntable');
    var $turntableArrow = $('.turntableArrow');
    var $turnBtn = $('.btn-turn');
    var $alert = $('.alert');
    var $sureBtn = $('.initTurntable');
    var degObg = {};
    var $style = $('.turntableStyle');
    var turnType = 'pan';
    var btnFlag = false;

    function color16() { //十六进制颜色随机
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
        return color;
    }

    function turn(type) {
        turnType = type;
    }

    $turnBtn.click((e) => {
        var $this = $(e.currentTarget);
        var btnType = $this.attr('data-type');

        turn(btnType);
    });

    $turntableBtn.click(() => {
        var turntableNum = $turntableNum.val();

        if (turntableNum < 3) {
            alert('建议转盘格数≥3');
            return;
        }

        $turntable.html('');
        var turntableHtml = '';

        for (var i = 0; i < turntableNum; i++) {
            var rotateDeg = i * (360 / turntableNum);
            var skewDeg = 360 / turntableNum - 90;
            var bgColor = color16();
            degObg[i] = rotateDeg;
            turntableHtml += `
                <li class="slice slice-${i}" 
                style="transform: rotate(${rotateDeg}deg) skewY(${skewDeg}deg); background: ${bgColor}">
                <span style="transform: rotate(0deg) skewY(${-skewDeg}deg)">商品${i + 1}</span></li>`
        }

        $turntable.html(turntableHtml);
    });

    $turntableArrow.click(() => {
        var turntableNum = $turntableNum.val();
        var turnTime = 0;

        if (turntableNum < 3) {
            alert('建议转盘格数≥3');
            return;
        }

        if (btnFlag) {
            return;
        }
        btnFlag = true;

        if (turnType === 'pan') {
            var prizeId = parseInt(Math.random() * turntableNum);
            var rotateFinal = 360 * 5 + (360 - degObg[prizeId]) - 180 / turntableNum;
            turnTime = 2 / 3 * turntableNum;

            $turntable.css({
                transition: `all ${turnTime}s ease-out 0s`,
                transform: `rotate(${rotateFinal}deg)`
            });
        } else {
            var prizeId = parseInt(Math.random() * turntableNum);
            var rotateFinal = 360 * 5 + degObg[prizeId] + 180 / turntableNum;
            turnTime = 2 / 8 * turntableNum < 2 ? 2 : 2 / 8 * turntableNum;
            $turntableArrow.css({
                transition: `all ${turnTime}s ease-out 0s`,
                transform: `rotate(${rotateFinal}deg)`
            });
        }

        setTimeout(() => {
            $alert.find('.prizeText').text(`恭喜您抽中商品${prizeId + 1}`);
            $alert.show();
        }, turnTime * 1000 + 500);
    });

    $sureBtn.click(() => {
        btnFlag = false;
        $alert.hide();
        $turntable.css({
            transition: `all 0s ease-out 0s`,
            transform: `rotate(0deg)`
        });
        $turntableArrow.css({
            transition: `all 0s ease-out 0s`,
            transform: `rotate(0deg)`
        });
    });

    $turntableBtn.click();
});