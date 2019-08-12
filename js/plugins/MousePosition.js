//=============================================================================
// マウス位置取得プラグイン
//=============================================================================
/*:
 * @plugindesc マウスポインタ位置取得プラグイン
 * @author あいあい
 * @help マウスポインタの位置取得プラグイン。大元はトリアコンタンさんのやつ。
 *　→(https://tm.lucky-duet.com/viewtopic.php?t=3213)
 *
 *イベント「変数の操作」の「スクリプト」に以下のコードを指定すれば、
 *クリック有無にかかわらずポインタ座標が取得できます。
 *TouchInput.mouseX
 *TouchInput.mouseY
 */


(function() {
    'use strict';
    var _TouchInput__onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function(event) {
        _TouchInput__onMouseMove.apply(this, arguments);
        this.mouseX = Graphics.pageToCanvasX(event.pageX);
        this.mouseY = Graphics.pageToCanvasY(event.pageY);
    };
})();