//=====================================
// ExpandEventsAction.js
//=====================================
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Version
// 1.1.1 2017/6/04 「ジャンプ」機能を追加
// 1.1.0 2017/6/03 「イベントの射出」と「マップを暗くし、イベントを照らす」機能を追加
// 1.0.0 2017/6/02 公開
// ----------------------------------------------------------------------------
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================
/*:
 * @plugindesc イベントの動作を拡張します。
 * @author ツミオ
 *
 * @param ----投げアクション用の設定----
 * @desc
 * @default
 * 
 * @param イベントを拾うときのSE
 * @desc イベントを拾うときのSEを設定します。（デフォルト値:Jump1)
 * @default Jump1
 * 
 * @param イベントを投げるときのSE
 * @desc イベントを投げるときのSEを設定します。（デフォルト値:Earth3)
 * @default Earth3
 * 
 * @param イベントを投げられないときのSE
 * @desc イベントを投げられないときのSEを設定します。（デフォルト値:Buzzer1)
 * @default Buzzer1
 * 
 * @param イベントを投げられるリージョン番号
 * @desc イベントを投げられるリージョン番号を設定します。（デフォルト値:1)
 * @default 1
 *
 * @param ----ジャンプアクション用の設定----
 * @desc
 * @default
 * 
 * @param ジャンプするときのSE
 * @desc ジャンプするときのSEを設定します。（デフォルト値:Jump1)
 * @default Jump1
 * 
 * @param 乗っているときジャンプ可能なリージョン番号
 * @desc 乗っているときジャンプ可能なリージョン番号を設定します。（デフォルト値:2)
 * @default 2
 * 
 * @param 前方にあるときジャンプ可能なリージョン番号
 * @desc 前方にあるときジャンプ可能なリージョン番号を設定します。（デフォルト値:3)
 * @default 3
 * 
 * @help
 * ------イベントの回転------
 * 【プラグインコマンド】
 * Rotate_EEA stop x         #イベント番号xで起こした回転を止める
 * Rotate_EEA start x        #イベント番号xで設定した回転を起こす
 * 
 * 【概要】
 * イベントのメモ欄を使用してイベントを回転させます。
 * 必ずしも回転に関係のあるイベントのメモ欄を使用する必要はありません。
 * 任意のイベントのメモ欄を使用することが可能です。
 * 
 * 【使用方法】
 * イベントのメモ欄に以下のような記述をします。
 * <rotate>最初の回転位置/回すイベントID/回転の中心となるイベントID/速さ/回転の大きさ/逆回転か/タイプ</rotate>
 * 例：
 * <rotate>120/4/1/10/2/true/true_circle</rotate>
 * 意味：最初の回転位置120度、4番のイベントを1番のイベントを中心として回し、速さは10、回転の大きさは2、通常の回転方法で、真円を描く
 * これでマップに入ったとき、イベント4は自動で回転を始めます。
 * 
 * 【回転の設定方法】
 * ・最初の回転位置：最初の回転位置を0～360で指定します。
 * ・回すイベントID：回したいイベントIDを指定してください。
 * ・回転の中心となるイベントID：回転の中心となるイベントIDを指定してください。
 *    *プレイヤーを指定したい場合は-1。
 * ・速さ：0～xで指定してください。浮動小数点数も使えます。
 * ・回転の大きさ：0～xで指定してください。1＝1マスで、浮動小数点数も使えます。
 * ・逆回転か：通常の回転方法ならtrue、逆回転ならfalseを指定してください。
 * ・タイプ：true_circle（真円）、ellipse_1（縦に長い楕円）、ellipse_2（横に長い楕円）
 * 
 * ------イベントの射出------
 * 【プラグインコマンド】
 * Particle_EEA stop x         #イベント番号xで起こした射出を止める
 * Particle_EEA start x        #イベント番号xで設定した射出を起こす
 *
 * 【概要】
 * イベントのメモ欄を使用してイベントを射出させます。
 * 必ずしも回転に関係のあるイベントのメモ欄を使用する必要はありません。
 * 任意のイベントのメモ欄を使用することが可能です。
 * また、射出されたイベントは画面端で反転します。
 * 
 * 【使用方法】
 * イベントのメモ欄に以下のような記述をします。
 * <particle>射出したいイベント番号/X方向のスピード/Y方向のスピード</particle>
 * 例：
 * <particle>13/0.2/-0.2</particle>
 * 意味：13番のイベントをX方向に0.2、Y方向に-0.2のスピードで射出。
 * これでマップに入ったとき、イベント13は自動で射出されます。
 * 注＊スピードにマイナスの値を設定した場合、射出される最初の方向が反対になります。
 * 
 * ------マップを暗くし、イベントを照らす------
 * 【プラグインコマンド】
 * Dark_EEA stop         #マップを明るくする
 * Dark_EEA start        #マップを暗くする
 * 
 * 【概要】
 * イベントのメモ欄を使用して、マップを暗くし、イベントを照らします。
 * 必ずしも照らしたいイベントのメモ欄を使用する必要はありません。
 * 任意のイベントのメモ欄を使用することが可能です。
 *
 * 【使用方法】
 * イベントのメモ欄に以下のような記述をします。
 * <dark>明るさ/照らしたいイベント1/照らしたいイベント2/照らしたいイベント3/...</dark>
 * 例：
 * <dark>0.1/-1/3/4/5/</dark>
 * 意味：明るさ0.1で照らし、プレイヤーとイベント3～4番を照らす。
 *  *プレイヤーを指定したい場合は-1。
 *  *明るさは0に近いほど暗くなります。0.1～～1推奨。
 *  *照らしたいイベントはいくつでも指定可能ですが、最初は必ず「明るさ」を指定する必要があります。
 * 
 * 設定したマップ内でプラグインコマンド「Dark_EEA start」を実行すると
 * マップが暗くなり、指定したイベントが照らし出されます。
 * 
 * 【注意】
 * 現在のマップの明るさはセーブデータに保存されますが、マップごとの明るさを記憶しているわけではありません。
 * 
 * 
 * ------投げアクション------
 * 投げアクションの設定はプラグインパラーメーターでおこないます。
 * また、イベントのメモ欄に
 * <trans></trans>
 * と書くと、そのイベントを拾って投げられるようになります。
 * 投げる先にすでにイベントが設置してある場合は投げられません。
 * 投げられる場所はリージョン番号で指定します（デフォルト値：1）。
 * 注＊投げたあとのイベントの位置は記憶しません。
 *   つまり、マップを移動したあとはイベントの位置がもとに戻ります。
 *   投げたあとのイベントの位置を記憶したい場合、何らかの方法でイベント
 *   の位置を記憶する必要があります。
 * 注＊投げる前のイベントは座標(-20,-20)に移動させています。
 *   投げる前にイベントの位置を記憶し、マップのリロードをした場合、
 *   そのイベントは座標(-20,-20）に保存されるのでご注意ください。
 * 
 * ------ジャンプアクション------
 * ジャンプアクションの設定はプラグインパラーメーターでおこないます。
 * 「設定したリージョンがプレイヤーの前方にある場合」
 * もしくは
 * 「設定したリージョンの上にプレイヤーが乗っている場合」
 * に決定キーを押すとジャンプアクションをおこないます。
 * 
 * 
 * 【謝辞】
 * このプラグインは
 * 田所淳氏の
 * 「HTML 5 canvas要素 + Javascriptで作る、動的コンテンツ」
 * http://yoppa.org/taumedia10/2065.html
 * 
 * omachizura氏の
 * 「canvasのアニメーションで軌跡・残像・フェードアウトを表現する」
 *http://omachizura.com/note/canvas%E3%81%AE%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%A7%E8%BB%8C%E8%B7%A1%E3%83%BB%E6%AE%8B%E5%83%8F%E3%83%BB%E3%83%95%E3%82%A7%E3%83%BC%E3%83%89%E3%82%A2%E3%82%A6%E3%83%88%E3%82%92%E8%A1%A8%E7%8F%BE%E3%81%99%E3%82%8B.html
 *を参考にしています。
 * 
 * 利用規約：
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * についても制限はありません。
 * 自由に使用してください。
 */

(function () {

    var N = 'ExpandEventsAction';
  	var param = PluginManager.parameters(N);

//ExAction名前空間の宣言
var ExAction = ExAction || {};

//投げアクション用の変数
var $se_lock_EEA = String(param['イベントを拾うときのSE'])||'Jump1';
var $se_throw_EEA = String(param['イベントを投げるときのSE'])||'Earth3';
var $se_throw_error_EEA = String(param['イベントを投げられないときのSE'])||'Buzzer1';
var $region_throw_EEA = Number(param['イベントを投げられるリージョン番号'])||1;
//ジャンプ用の変数
var $se_jump_EEA = String(param['ジャンプするときのSE'])||'Jump1';
var $region_jumpGetOn_EEA = Number(param['乗っているときジャンプ可能なリージョン番号'])||2;
var $region_jumpForward_EEA = Number(param['前方にあるときジャンプ可能なリージョン番号'])||3;


//-----------------------------------------------------------------------------
// プラグインコマンドの設定
//-----------------------------------------------------------------------------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Rotate_EEA') {
            switch (args[0]) {
            case 'stop':
                try{
                SceneManager._scene.rotateEvents_EEA[args[1]].stop();
            }catch(e){
                console.log(e);
            }
                break;
            case 'start':
                try{
                SceneManager._scene.rotateEvents_EEA[args[1]].start();
            }catch(e){
                console.log(e);
            }
                break;
            }
        }
        if (command === 'Particle_EEA') {
            switch (args[0]) {
            case 'stop':
                try{
                SceneManager._scene.particleEvents_EEA[args[1]].stop();
            }catch(e){
                console.log(e);
            }
                break;
            case 'start':
                try{
                SceneManager._scene.particleEvents_EEA[args[1]].start();
            }catch(e){
                console.log(e);
            }
                break;
            }
        }
        if (command === 'Dark_EEA') {
            switch (args[0]) {
            case 'stop':
                try{
                SceneManager._scene.traEvents_EEA.stop();
                SceneManager._scene.sprite_transition_EEA.bitmap.clear();
            }catch(e){
                console.log(e);
            }
                break;
            case 'start':
                try{
                SceneManager._scene.traEvents_EEA.start();
            }catch(e){
                console.log(e);
            }
                break;
            }
        }
    };

//-----------------------------------------------------------------------------
// マップシーンの拡張(Rotate)
//-----------------------------------------------------------------------------

/*update処理 */
var _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);
    this.updateRotateObject();
};

/*update処理 */
Scene_Map.prototype.updateRotateObject = function() {
    //this.hoge.rotateEvent();//回すイベント番号、中心イベント、回転速度、回転の大きさ
    for(var i = 0; i < this.rotateObjects_length_EEA; i++)
    {
        if(this.rotateEvents_EEA[i])
        {
            this.rotateEvents_EEA[i].rotateEvent();
        }
    }
};

/*create処理 */
var _Scene_map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_map_createDisplayObjects.call(this);
    this.createRotateObject();
};

/*create処理 */
Scene_Map.prototype.createRotateObject = function() {
    this.rotateObjects_length_EEA = this.setAllRotateObject();
};

/*マップ上にイベントを取得し、メモ欄を分解 */
Scene_Map.prototype.setAllRotateObject = function() {
    /*メモ欄を分解し、回転させるイベントを取得*/
    var rotateEvents = this.getRotateEvents($dataMap.events);
    var rotateEvents_length = rotateEvents.length;
    this.rotateEvents_EEA = [];//保存用の配列作成

    //配列に情報を代入
    for(var i = 0; i < rotateEvents_length; i++)
    {
        if(rotateEvents[i])
        {
            var st_split = rotateEvents[i].split("/");
            //最初の回転位置/回すイベントID/回転の中心となるID/速さ/回転の大きさ/逆回転か/タイプ
            this.rotateEvents_EEA[i] = new ExAction.Rotate();
            this.rotateEvents_EEA[i].ini_angle = Number(st_split[0]);
            this.rotateEvents_EEA[i].event_id = Number(st_split[1]);
            this.rotateEvents_EEA[i].center_id = Number(st_split[2]);
            this.rotateEvents_EEA[i].angle = Number(st_split[3]);
            this.rotateEvents_EEA[i].rotate = Number(st_split[4]);
            this.rotateEvents_EEA[i].back = Number(st_split[5]);
            this.rotateEvents_EEA[i].type = String(st_split[6]);
        }
    }
    //最後にunshiftで空の配列を追加
    this.rotateEvents_EEA.unshift(null);
    return this.rotateEvents_EEA.length;
};

//回転させるイベントをメモ欄から判定
Scene_Map.prototype.getRotateEvents= function(events) {
    var events_length = events.length;
    var result_events = [];
    for(var i = 1; i < events_length; i++)
    {
        //メモ欄取得
        if(!events[i])//イベントが存在しない場合はスキップ
        {
            result_events.push('');
        }else
        {
            var text_note = events[i].note;
            var _temp_result = text_note.match(/\<rotate\>[\s\S]*?<\/rotate\>/);
            if(_temp_result)
            {
                var result = _temp_result[0].replace(/\<rotate\>/,'');
                result_events.push(result.replace(/<\/rotate\>/,''));
            }else
            {
                result_events.push('');
            }
        }
    }
    return result_events;
};

//-----------------------------------------------------------------------------
// 回転処理（ExAction.Rotateクラスの定義）
//-----------------------------------------------------------------------------


ExAction.Rotate = function(){
    //回転の設定
    this.x1;
    this.y1;
    this.rd;
    //止めるかどうか
    this._stop = false;
    //メモ欄から取得した情報
    this.ini_angle;//初期位置
    this.event_id;//回転させるイベントID
    this.center_id;//回転の中心となるイベントID
    this.angle;//速さ
    this.rotate;//回転の大きさ
    this.back;//逆向きかどうか
    this.type;//回転の種類
};

//event_id=回転させたいイベントID、center_id＝中心となるイベント,angle＝速さ、rotate＝回転の大きさ、type＝円の種類
ExAction.Rotate.prototype.rotateEvent = function(){
    if(!this.isRotateStopping())
    {
        if(this.back){
            //逆回転
            this.rd =  -this.ini_angle * Math.PI / 180.0;
        }else{
            //普通の回転
            this.rd =  this.ini_angle * Math.PI / 180.0;
        }
        if(this.center_id === -1)
        {
            switch (this.type) {
                case 'true_circle':
                    //真円
                    this.x1 = $gamePlayer._realX + Math.cos(this.rd) * this.rotate;
                    this.y1 = $gamePlayer._realY + Math.sin(this.rd) * this.rotate;
                    break;
                case 'ellipse_1':
                    //縦に長い
                    this.x1 = $gamePlayer._realX + Math.cos(this.rd) * this.rotate / 2;
                    this.y1 = $gamePlayer._realY + Math.sin(this.rd) * this.rotate;
                    break;
                case 'ellipse_2':
                    //横に長い
                    this.x1 = $gamePlayer._realX + Math.cos(this.rd) * this.rotate;
                    this.y1 = $gamePlayer._realY + Math.sin(this.rd) * this.rotate / 2;
                    break;
                default:
                    //真円
                    this.x1 = $gamePlayer._realX + Math.cos(this.rd) * this.rotate;
                    this.y1 = $gamePlayer._realY + Math.sin(this.rd) * this.rotate;
                    break;
                }
        }else{
        //回転するものの中心座標
        switch (this.type) {
            case 'true_circle':
                //真円
                this.x1 = $gameMap.event(this.center_id)._realX + Math.cos(this.rd) * this.rotate;
                this.y1 = $gameMap.event(this.center_id)._realY + Math.sin(this.rd) * this.rotate;
                break;
            case 'ellipse_1':
                //縦に長い
                this.x1 = $gameMap.event(this.center_id)._realX + Math.cos(this.rd) * this.rotate / 2;
                this.y1 = $gameMap.event(this.center_id)._realY + Math.sin(this.rd) * this.rotate;
                break;
            case 'ellipse_2':
                //横に長い
                this.x1 = $gameMap.event(this.center_id)._realX + Math.cos(this.rd) * this.rotate;
                this.y1 = $gameMap.event(this.center_id)._realY + Math.sin(this.rd) * this.rotate / 2;
                break;
            default:
                //真円
                this.x1 = $gameMap.event(this.center_id)._realX + Math.cos(this.rd) * this.rotate;
                this.y1 = $gameMap.event(this.center_id)._realY + Math.sin(this.rd) * this.rotate;
                break;
            }
        }
        //位置変更
        $gameMap.event(this.event_id)._x = Math.round(this.x1);
        $gameMap.event(this.event_id)._y = Math.round(this.y1);
        $gameMap.event(this.event_id)._realX = this.x1;
        $gameMap.event(this.event_id)._realY = this.y1;
        //回転の大きさ
        this.ini_angle += this.angle;
    }
};

ExAction.Rotate.prototype.isRotateStopping = function(){
    return this._stop;
};

ExAction.Rotate.prototype.stop = function(){
    this._stop = true;
};

ExAction.Rotate.prototype.start = function(){
    this._stop = false;
};

//-----------------------------------------------------------------------------
// 回転処理（ExAction.Triangleクラスの定義）
//-----------------------------------------------------------------------------
ExAction.Triangle = function(){
    //回転の設定
    this.x1;
    this.y1;
    this.rd;
    //止めるかどうか
    this._stop = false;
    //メモ欄から取得した情報
    this.ini_angle;//初期位置
    this.event_id;//回転させるイベントID
    this.center_id;//回転の中心となるイベントID
    this.angle;//速さ
    this.rotate;//回転の大きさ
    this.back;//逆向きかどうか
    this.type;//回転の種類
};

ExAction.Triangle.prototype.rotateEvent = function(){
    if(!this.isRotateStopping())
    {
        //回転の方向
        if(this.back){
            //逆回転
            this.rd =  -this.ini_angle * Math.PI / 180.0;
        }else{
            //普通の回転
            this.rd =  this.ini_angle * Math.PI / 180.0;
        }

        //回転するものの中心座標
        if(this.center_id === -1)
        {
            this.x1 = $gamePlayer._realX + Math.cos(this.rd) * this.rotate;
            this.y1 = $gamePlayer._realY + Math.sin(this.rd) * this.rotate;
        }
        else
        {
            this.x1 = $gameMap.event(this.center_id)._realX + Math.cos(this.rd) * this.rotate;
            this.y1 = $gameMap.event(this.center_id)._realY + Math.sin(this.rd) * this.rotate;
        }

        //位置変更
        $gameMap.event(this.event_id)._x = Math.round(this.x1);
        $gameMap.event(this.event_id)._y = Math.round(this.y1);
        $gameMap.event(this.event_id)._realX = this.x1;
        $gameMap.event(this.event_id)._realY = this.y1;

        //回転の大きさ
        this.ini_angle += this.angle;
    }
};

ExAction.Triangle.prototype.isTriangleStopping = function(){
    return this._stop;
};

ExAction.Triangle.prototype.stop = function(){
    this._stop = true;
};

ExAction.Triangle.prototype.start = function(){
    this._stop = false;
};

//-----------------------------------------------------------------------------
// 人間大砲（パーティクル）処理（ExAction.Particleクラスの定義）
//-----------------------------------------------------------------------------
ExAction.Particle = function(){
    //メモ欄から取得した情報
    this.event_id;//回転させるイベントID
    //速度
    this.speedX;//飛ばす方向（0.2くらいがちょうどいい。マイナスで逆向き）
    this.speedY;//飛ばす方向
    //止めるかどうか
    this._stop = false;
};

ExAction.Particle.prototype.fireEvent = function(){
    if(!this.isParticleStopping())
    {
        //位置を更新
        $gameMap.event(this.event_id)._x += Math.round(this.speedX);
        $gameMap.event(this.event_id)._y += Math.round(this.speedY);
        $gameMap.event(this.event_id)._realX += this.speedX;
        $gameMap.event(this.event_id)._realY += this.speedY;

        //端っこに来たら動き変更
        if($gameMap.event(this.event_id).screenX() < 0 || $gameMap.event(this.event_id).screenX() > Graphics.width){
            this.speedX *= -1;
        }
        if($gameMap.event(this.event_id).screenY() < 0 || $gameMap.event(this.event_id).screenY() > Graphics.height){
            this.speedY *= -1;
        }
    }
};

ExAction.Particle.prototype.isParticleStopping = function(){
    return this._stop;
};

ExAction.Particle.prototype.stop = function(){
    this._stop = true;
};

ExAction.Particle.prototype.start = function(){
    this._stop = false;
};

//-----------------------------------------------------------------------------
// マップシーンの拡張(Particle)
//-----------------------------------------------------------------------------
var _Scene_Map_update2 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update2.call(this);
    this.updateParticleObject();
};

/*update処理 */
Scene_Map.prototype.updateParticleObject = function() {
    //this.hoge.rotateEvent();//回すイベント番号、中心イベント、回転速度、回転の大きさ
    for(var i = 0; i < this.particleObjects_length_EEA; i++)
    {
        if(this.particleEvents_EEA[i])
        {
            this.particleEvents_EEA[i].fireEvent();
        }
    }
};


var _Scene_map_createDisplayObjects2 = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_map_createDisplayObjects2.call(this);
    this.createParticleObject();
};

/*create処理 */
Scene_Map.prototype.createParticleObject = function() {
    this.particleObjects_length_EEA = this.setAllParticleObject();
};

/*マップ上のイベントを取得し、メモ欄を分解 */
Scene_Map.prototype.setAllParticleObject = function() {
    /*メモ欄を分解し、回転させるイベントを取得*/
    var particleEvents = this.getParticleEvents($dataMap.events);
    var particleEvents_length = particleEvents.length;
    this.particleEvents_EEA = [];//保存用の配列作成
    //配列に情報を代入
    for(var i = 0; i < particleEvents_length; i++)
    {
        if(particleEvents[i])
        {
            var st_split = particleEvents[i].split("/");
            //最初の回転位置/回すイベントID/回転の中心となるID/速さ/回転の大きさ/逆回転か/タイプ
            this.particleEvents_EEA[i] = new ExAction.Particle();
            this.particleEvents_EEA[i].event_id = Number(st_split[0]);
            this.particleEvents_EEA[i].speedX = Number(st_split[1]);
            this.particleEvents_EEA[i].speedY = Number(st_split[2]);;
        }
    }
    //最後にunshiftで空の配列を追加
    this.particleEvents_EEA.unshift(null);
    return this.particleEvents_EEA.length;
};

//回転させるイベントをメモ欄から判定
Scene_Map.prototype.getParticleEvents= function(events) {
    var events_length = events.length;
    var result_events = [];
    for(var i = 1; i < events_length; i++)
    {
        //メモ欄取得
        if(!events[i])//イベントが存在しない場合はスキップ
        {
            result_events.push('');
        }else
        {
            var text_note = events[i].note;
            var _temp_result = text_note.match(/\<particle\>[\s\S]*?<\/particle\>/);
            if(_temp_result)
            {
                var result = _temp_result[0].replace(/\<particle\>/,'');
                result_events.push(result.replace(/<\/particle\>/,''));
            }else
            {
                result_events.push('');
            }
        }
    }
    return result_events;
};

//-----------------------------------------------------------------------------
// 爆発処理（ExAction.Explosionクラスの定義）
//-----------------------------------------------------------------------------
ExAction.Explosion = function(){
    //設定
    this.SIZE = 500;//これで爆発の大きさを設定
    this.speedX = new Array(this.SIZE);
    this.speedY = new Array(this.SIZE);
    this.locX = new Array(this.SIZE);
    this.locY = new Array(this.SIZE);
    this.radius = new Array(this.SIZE);
    this.r =  new Array(this.SIZE);
    this.g =  new Array(this.SIZE);
    this.b =  new Array(this.SIZE);
    //止めるかどうか
    this._stop = false;
    this.frame = 0;
    //タイプ
    this.type;//bubble,bom,
    this.ini_locate = 'top';//random/center/bottom/top/left/right
    this.color;//light/dark/normal/その他は直接色をRGBで指定して単色
};

ExAction.Explosion.prototype.initializeExplosion = function(){
    for(var i = 0; i < this.SIZE; i++)
    {
        this.initializeLocate(i);
        this.initializeSpeed(i);
        this.initializeColor(i);
    }
};


ExAction.Explosion.prototype.initializeLocate = function(i){
    if(this.ini_locate === 'random')
    {
        this.locX[i] = Math.floor( Math.random() * (Graphics.width + 1) );
        this.locY[i] = Math.floor( Math.random() * (Graphics.height + 1) );
    }else if(this.ini_locate === 'center')
    {
        this.locX[i] = Graphics.width / 2;
        this.locY[i] = Graphics.height / 2;
    }else if(this.ini_locate === 'bottom')
    {
        this.locX[i] = Graphics.width / 2;
        this.locY[i] = Graphics.height;
    }else if(this.ini_locate === 'top')
    {
        this.locX[i] = Graphics.width / 2;
        this.locY[i] = 0;
    }else
    {//指定がなければランダム生成
        this.locX[i] = Math.floor( Math.random() * (Graphics.width + 1) );
        this.locY[i] = Math.floor( Math.random() * (Graphics.height + 1) );
    }
};

ExAction.Explosion.prototype.initializeSpeed = function(i){
    this.speedX[i] = Math.random() * 8.0 - 4.0;
    this.speedY[i] = Math.random() * 8.0 - 4.0;
    this.radius[i] = Math.random() * 8.0 + 1.0;
};

ExAction.Explosion.prototype.initializeColor = function(i){
    this.r[i] = Math.floor(Math.random() * 255);
    this.g[i] = Math.floor(Math.random() * 255);
    this.b[i] = Math.floor(Math.random() * 255);
};

ExAction.Explosion.prototype.isExplosionStopping = function(){
    return this._stop;
};

ExAction.Explosion.prototype.stop = function(){
    this._stop = true;
};

ExAction.Explosion.prototype.start = function(){
    this._stop = false;
};

//-----------------------------------------------------------------------------
// マップシーンの拡張(Explosion)
//-----------------------------------------------------------------------------
var _Scene_Map_update_Explosion = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update_Explosion.call(this);
    //this.updateExplosionObject();
};

/*update処理 */
Scene_Map.prototype.updateExplosionObject = function() {
   //this.drawExplosion_EEA();
};

Scene_Map.prototype.drawExplosion_EEA = function() {
    this.clearExplosion_EEA(20);
    /*
    this.sprite_explosion_EEA.bitmap.context.globalCompositeOperation = "source-over";
    this.sprite_explosion_EEA.bitmap.context.fillStyle = "rgba(8,8,12,.1)";
    this.sprite_explosion_EEA.bitmap.context.fillRect(0, 0, Graphics.width, Graphics.height);*/
    //this.sprite_explosion_EEA.bitmap.context.globalCompositeOperation = "color-dodge";
 
    for(var i = 0; i < this.hoge.SIZE; i++)
    {
        //位置を更新
        this.hoge.locX[i] += this.hoge.speedX[i];
        this.hoge.locY[i] += this.hoge.speedY[i];
        
        if(this.hoge.locX[i] < 0 || this.hoge.locX[i] > Graphics.width)
        {
            this.hoge.speedX[i] *= -1.0;
        }
 
        if(this.hoge.locY[i] < 0 || this.hoge.locY[i] > Graphics.height)
        {
            this.hoge.speedY[i] *= -1.0;
        }
        
        //更新した座標で円を描く
        this.sprite_explosion_EEA.bitmap.context.save();
        this.sprite_explosion_EEA.bitmap.context.globalCompositeOperation = "destination-out";
        //this.sprite_explosion_EEA.bitmap.context.globalAlpha = 0.1;
        this.sprite_explosion_EEA.bitmap.context.beginPath();
        this.sprite_explosion_EEA.bitmap.context.fillStyle = 'rgb(' + this.hoge.r[i] + ',' + this.hoge.g[i] + ',' + this.hoge.b[i] + ')';
        this.sprite_explosion_EEA.bitmap.context.arc(this.hoge.locX[i], this.hoge.locY[i], this.hoge.radius[i], 0, Math.PI*2.0, true);
        this.sprite_explosion_EEA.bitmap.context.fill();
       //this.sprite_explosion_EEA.bitmap.context.globalAlpha = 1;
        this.sprite_explosion_EEA.bitmap.context.restore();
        
    }
    this.sprite_explosion_EEA.bitmap._setDirty();
};

Scene_Map.prototype.drawAlphaObject_EEA = function() {
    this.sprite_explosion_EEA.bitmap.context.save();
    this.sprite_explosion_EEA.bitmap.context.globalCompositeOperation = "source-over";
    this.sprite_explosion_EEA.bitmap.context.globalAlpha = 0.1;
    this.sprite_explosion_EEA.bitmap.context.beginPath();
    //this.sprite_explosion_EEA.bitmap.context.fillStyle = 'rgba(0,0,0,1);';
    this.sprite_explosion_EEA.bitmap.context.fillRect(0,0, Graphics.width, Graphics.height);
    this.sprite_explosion_EEA.bitmap.context.fill();
    this.sprite_explosion_EEA.bitmap.context.globalAlpha = 1;
    this.sprite_explosion_EEA.bitmap.context.restore();
};

//一定フレームで消す
Scene_Map.prototype.clearExplosion_EEA = function(frame) {
    //this.sprite_explosion_EEA.bitmap.context.clearRect(0,0, Graphics.width, Graphics.height);
    if(this.hoge.frame % frame === 0)
    {
        //this.sprite_explosion_EEA.bitmap.clear();
    }
    //this.drawAlphaObject_EEA();
    this.hoge.frame++;
};


var _Scene_map_createDisplayObjects_Explosion = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_map_createDisplayObjects_Explosion.call(this);
    //this.createExplosionSprite();
};

Scene_Map.prototype.createExplosionSprite = function() {
    //スプライト生成
    this.sprite_explosion_EEA = new Sprite();//内側
    this.sprite_explosion_EEA.bitmap = new Bitmap(Graphics.width, Graphics.height);
    //this.sprite_explosion_EEA.bitmap.canvas.getContext('2d');
    this.addChild(this.sprite_explosion_EEA);
};

//-----------------------------------------------------------------------------
// トランジョン処理（ExAction.Transitionクラスの定義）
//-----------------------------------------------------------------------------
ExAction.Transition = function(){
    if(!$gameSystem._saveDark_EEA)
    {
        //設定
        this.brightness;
        this.event_id = [];
        this.event_length;
        this._stop = true;
        this._background = false;
        this._map = $gameMap.mapId();
        $gameSystem._saveDark_EEA = this;
        //console.log("こっち呼ばれてほしい");
    }else
    {
        //セーブしたデータのロード
        this.brightness = $gameSystem._saveDark_EEA.brightness;
        this.event_id = $gameSystem._saveDark_EEA.event_id;
        this.event_length = $gameSystem._saveDark_EEA.event_length;
        this._stop = $gameSystem._saveDark_EEA._stop;
        //this._background = $gameSystem._saveDark_EEA._background;
        this._background = false;
        this._map = $gameSystem._saveDark_EEA._map;
        if(this._map !== $gameMap.mapId())
        {
            this.brightness = null;
            this.event_id = [];
            this.event_length = null;
            this._stop = true;
            this._background = false;
            this._map = $gameMap.mapId();
            $gameSystem._saveDark_EEA = this;
        }
        //console.log($gameSystem._saveDark_EEA);
    }
};

ExAction.Transition.prototype.isStopping = function(){
    return this._stop;
};

ExAction.Transition.prototype.isBackgroundDrawed = function(){
    return this._background;
};

ExAction.Transition.prototype.okBackground = function(){
    this._background = true;
};

ExAction.Transition.prototype.stop = function(){
    this._stop = true;
    this._background = false;
};

ExAction.Transition.prototype.start = function(){
    this._stop = false;
};


//-----------------------------------------------------------------------------
// マップシーンの拡張(Transitionでライトアップ)
//-----------------------------------------------------------------------------
var _Scene_Map_update_Transition = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update_Transition.call(this);
    this.updateTransitionObject();
};

/*update処理 */
Scene_Map.prototype.updateTransitionObject = function() {
    if(!this.traEvents_EEA.isStopping())
    {
        this.drawBackGround_T_EEA();
        this.drawIllumination_T_EEA();
        this.drawAlphaObject_T_EEA();
    }
};

/*マップ上にイベントを取得し、メモ欄を分解 */
Scene_Map.prototype.setTransitionObject = function() {
    /*メモ欄を分解し、回転させるイベントを取得*/
    var traEvents = this.getTransitionEvents($dataMap.events);
    var traEvents_length = traEvents.length;
    this.traEvents_EEA = null;//保存用

    //配列に情報を代入
    for(var i = 0; i < traEvents_length; i++)
    {
        if(traEvents[i])
        {
            var st_split = traEvents[i].split("/");
            var st_split_length = st_split.length;
            //最初の回転位置/回すイベントID/回転の中心となるID/速さ/回転の大きさ/逆回転か/タイプ
            this.traEvents_EEA = new ExAction.Transition();
            this.traEvents_EEA.brightness = Number(st_split[0]);
            for(var k = 0; k + 1 < st_split_length; k++)
            {
                this.traEvents_EEA.event_id[k] = Number(st_split[k + 1]);
            }
        }
    }
    //マッチしなければ
    if(!this.traEvents_EEA)
    {
        $gameSystem._saveDark_EEA = null;
        this.traEvents_EEA = new ExAction.Transition();
    }
    this.traEvents_EEA.event_length = this.traEvents_EEA.event_id.length;
    //データを外部に保存
    $gameSystem._saveDark_EEA = this.traEvents_EEA;
};

//回転させるイベントをメモ欄から判定
Scene_Map.prototype.getTransitionEvents= function(events) {
    var events_length = events.length;
    var result_events = [];
    for(var i = 1; i < events_length; i++)
    {
        //メモ欄取得
        if(!events[i])//イベントが存在しない場合はスキップ
        {
            result_events.push('');
        }else
        {
            var text_note = events[i].note;
            var _temp_result = text_note.match(/\<dark\>[\s\S]*?<\/dark\>/);
            if(_temp_result)
            {
                var result = _temp_result[0].replace(/\<dark\>/,'');
                result_events.push(result.replace(/<\/dark\>/,''));
            }else
            {
                result_events.push('');
            }
        }
    }
    return result_events;
};

var _Scene_map_createDisplayObjects_Transition = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_map_createDisplayObjects_Transition.call(this);
};

//スプライトセットを継承
var _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function() {
    _Scene_Map_createSpriteset.call(this);
    this.createTransitionSprite_EEA();
    this.setTransitionObject();
};

Scene_Map.prototype.createTransitionSprite_EEA = function() {
    //スプライト生成
    this.sprite_transition_EEA = new Sprite();
    this.sprite_transition_EEA.bitmap = new Bitmap(Graphics.width, Graphics.height);
    this.addChild(this.sprite_transition_EEA);
};

Scene_Map.prototype.drawIllumination_T_EEA = function() {
    for(var i = 0; i < this.traEvents_EEA.event_length; i++)
    {
        //更新した座標で円を描く
        this.sprite_transition_EEA.bitmap.context.save();
        //this.sprite_transition_EEA.bitmap.context.globalCompositeOperation = "source-over";
        //this.sprite_transition_EEA.bitmap.context.globalAlpha = 0.1;
        this.sprite_transition_EEA.bitmap.context.globalCompositeOperation = "xor";
        this.sprite_transition_EEA.bitmap.context.beginPath();
        this.sprite_transition_EEA.bitmap.context.fillStyle = 'rgba(0,0,0,0.1)';
            if(this.traEvents_EEA.event_id[i] === -1)
            {
                this.sprite_transition_EEA.bitmap.context.arc($gamePlayer.screenX(), $gamePlayer.screenY() - 20, 60, 0, Math.PI*2.0, true);
            }else{
                this.sprite_transition_EEA.bitmap.context.arc($gameMap.event(this.traEvents_EEA.event_id[i]).screenX(), $gameMap.event(this.traEvents_EEA.event_id[i]).screenY() - 20, 60, 0, Math.PI*2.0, true);
            }

        this.sprite_transition_EEA.bitmap.context.fill();
        //this.sprite_transition_EEA.bitmap.context.globalAlpha = 1;
        this.sprite_transition_EEA.bitmap.context.restore();
        this.sprite_transition_EEA.bitmap._setDirty();
    }
};

Scene_Map.prototype.drawBackGround_T_EEA = function() {
    if(!this.traEvents_EEA.isBackgroundDrawed())
    {
        this.sprite_transition_EEA.bitmap.context.save();
        //this.sprite_transition_EEA.bitmap.context.globalCompositeOperation = "destination-out";
        //this.sprite_transition_EEA.bitmap.context.fillStyle = 'rgba(0,0,0,1)';
        this.sprite_transition_EEA.bitmap.context.globalAlpha = 1;
        this.sprite_transition_EEA.bitmap.context.beginPath();
        //this.sprite_explosion_EEA.bitmap.context.fillStyle = 'rgba(0,0,0,1);';
        this.sprite_transition_EEA.bitmap.context.fillRect(0,0, Graphics.width, Graphics.height);
        this.sprite_transition_EEA.bitmap.context.fill();
        this.sprite_transition_EEA.bitmap.context.restore();
        this.traEvents_EEA.okBackground();
    }
};

Scene_Map.prototype.drawAlphaObject_T_EEA = function() {
    this.sprite_transition_EEA.bitmap.context.save();
    this.sprite_transition_EEA.bitmap.context.globalCompositeOperation = "source-over";
    this.sprite_transition_EEA.bitmap.context.globalAlpha = this.traEvents_EEA.brightness;
    this.sprite_transition_EEA.bitmap.context.beginPath();
    //this.sprite_transition_EEA.bitmap.context.fillStyle = 'rgba(0,0,0,0.8);';
    this.sprite_transition_EEA.bitmap.context.fillRect(0,0, Graphics.width, Graphics.height);
    this.sprite_transition_EEA.bitmap.context.fill();
    this.sprite_transition_EEA.bitmap.context.globalAlpha = 1;
    this.sprite_transition_EEA.bitmap.context.restore();
};

//-----------------------------------------------------------------------------
// ジャンプ処理（ExAction.Jumpクラスの定義）
//-----------------------------------------------------------------------------
ExAction.Jump = function(){
    this._jumping = false;
};

ExAction.Jump.jumpAction = function(){
    if (Input.isTriggered('ok') && !this.isPlayerJumping())
    {
        var forward_region = this.checkForwardRegion();
        var getOn_region = this.checkGetOnRegion();
        if(getOn_region || forward_region)
        {
            if(forward_region === 6 || getOn_region === 6)//右
            {
                $gamePlayer.jump(2,0);
            }else if(forward_region === 4 || getOn_region === 4)//左
            {
                $gamePlayer.jump(-2,0);
            }
            else if(forward_region === 8 || getOn_region === 8)//上
            {
                $gamePlayer.jump(0,-2);
            }
            else if(forward_region === 2 || getOn_region === 2)//下
            {
                $gamePlayer.jump(0,2);
            }
            AudioManager.playSe({"name":$se_jump_EEA,"volume":90,"pitch":100,"pan":0});
            //this.setJumpEvent();
        }
    }
}

ExAction.Jump.checkGetOnRegion = function(){
    if($gameMap.regionId($gamePlayer.x, $gamePlayer.y) === $region_jumpGetOn_EEA )
    {
        if($gamePlayer._direction === 6)
        {
            return 6;
        }else if($gamePlayer._direction === 4){
            return 4;
        }else if($gamePlayer._direction === 8){
            return 8;
        }else if($gamePlayer._direction === 2){
            return 2;
        }
        return false;
    }
}

ExAction.Jump.checkForwardRegion = function(){
    if($gamePlayer._direction === 6)//右向き
    {
        if($gameMap.regionId($gamePlayer.x + 1, $gamePlayer.y) === $region_jumpForward_EEA)
        {
            return 6;
        }
    }//左向き
    else if($gamePlayer._direction === 4){
        if($gameMap.regionId($gamePlayer.x - 1, $gamePlayer.y) === $region_jumpForward_EEA)
        {
            return 4;
        }
    }//上向き
    else if($gamePlayer._direction === 8){
        if($gameMap.regionId($gamePlayer.x, $gamePlayer.y - 1) === $region_jumpForward_EEA)
        {
            return 8;
        }
    }//下向き
    else if($gamePlayer._direction === 2){
       if($gameMap.regionId($gamePlayer.x, $gamePlayer.y + 1) === $region_jumpForward_EEA)
       {
           return 2;
       }
    }
    return false;
}

//true or false
ExAction.Jump.setJumpEvent = function(){
    this._jumping = true;
};

ExAction.Jump.isPlayerJumping = function(){
    return this._jumping;
};

//-----------------------------------------------------------------------------
// 物を運ぶ処理（ExAction.Transportクラスの定義）
//-----------------------------------------------------------------------------
ExAction.Transport = function(){
    this._lock = false;
    this._eventId;
};

//イベントをロックする
ExAction.Transport.lockEvent = function(){
    if(Input.isTriggered('ok') && !this.isEventLocked())
    {
        var forward_x = $gameMap.xWithDirection($gamePlayer._x, $gamePlayer._direction);
        var forward_y = $gameMap.yWithDirection($gamePlayer._y, $gamePlayer._direction);
        var forward_eventId = $gameMap.eventIdXy(forward_x, forward_y);
        if(forward_eventId && /\<trans\>[\s\S]*?<\/trans\>/.test($dataMap.events[forward_eventId].note))
        {
            this._eventId = forward_eventId;
            $gameMap.event(this._eventId).locate(-20,-20);//ロックしたイベントを見えない場所にいったん飛ばす
            AudioManager.playSe({"name":$se_lock_EEA,"volume":90,"pitch":100,"pan":0});
            this.setLockEvent(true);
        }
    }
};

//イベントを投げる
ExAction.Transport.throwEvent = function(){
    if(this.isEventLocked() && Input.isTriggered('ok') && this.checkRegion())
    {
        var forward_x = $gameMap.xWithDirection($gamePlayer._x, $gamePlayer._direction);
        var forward_y = $gameMap.yWithDirection($gamePlayer._y, $gamePlayer._direction);
        var forward_eventId = $gameMap.eventIdXy(forward_x, forward_y);
        if(!forward_eventId)//前方にイベントがあれば投げられない
        {
            var event_id = this.getLockEventId();
            //右向き
            if($gamePlayer._direction === 6){
                $gameMap.event(event_id).locate($gamePlayer._x + 1,$gamePlayer._y);
            }//左向き
            else if($gamePlayer._direction === 4){
                $gameMap.event(event_id).locate($gamePlayer._x - 1,$gamePlayer._y);
            }//上向き
            else if($gamePlayer._direction === 8){
                $gameMap.event(event_id).locate($gamePlayer._x,$gamePlayer._y - 1);
            }//下向き
            else if($gamePlayer._direction === 2){
                $gameMap.event(event_id).locate($gamePlayer._x,$gamePlayer._y + 1);
            }
            AudioManager.playSe({"name":$se_throw_EEA,"volume":90,"pitch":100,"pan":0});
            this.setLockEvent(false);
        }else{
            AudioManager.playSe({"name":$se_throw_error_EEA,"volume":90,"pitch":100,"pan":0});
        }
    }
};

//前方のリージョンを確認
ExAction.Transport.checkRegion = function(){
    if($gamePlayer._direction === 6)//右向き
    {
        if($gameMap.regionId($gamePlayer.x + 1, $gamePlayer.y) === $region_throw_EEA)
        {
            return true;
        }
    }//左向き
    else if($gamePlayer._direction === 4){
        if($gameMap.regionId($gamePlayer.x - 1, $gamePlayer.y) === $region_throw_EEA)
        {
            return true;
        }
    }//上向き
    else if($gamePlayer._direction === 8){
        if($gameMap.regionId($gamePlayer.x, $gamePlayer.y - 1) === $region_throw_EEA)
        {
            return true;
        }
    }//下向き
    else if($gamePlayer._direction === 2){
       if($gameMap.regionId($gamePlayer.x, $gamePlayer.y + 1) === $region_throw_EEA)
       {
           return true;
       }
    }
    //リージョン見つからなかったら
    AudioManager.playSe({"name":$se_throw_error_EEA,"volume":90,"pitch":100,"pan":0});
    return false;
};

//true or false
ExAction.Transport.setLockEvent = function(lock){
    this._lock = lock;
};

ExAction.Transport.getLockEventId = function(){
    return this._eventId
};

ExAction.Transport.isEventLocked = function(){
    return this._lock;
};

//-----------------------------------------------------------------------------
// Game_Playerの拡張
//-----------------------------------------------------------------------------

var _Game_Player_initialize = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function() {
    _Game_Player_initialize.call(this);
};

var _Game_Player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    _Game_Player_update.call(this,sceneActive);
    this.updateEEAInput();
};

Game_Player.prototype.updateEEAInput = function() {
    if (this.canMove() && !$gameMessage.isBusy()) {
        //ロックイベント
        if(!ExAction.Transport.isEventLocked())
        {
            ExAction.Transport.lockEvent();
        }else{
            ExAction.Transport.throwEvent();
        }
        //ジャンプイベント
        ExAction.Jump.jumpAction();
    }
};

//-----------------------------------------------------------------------------
// Scene_Mapの拡張（マップがロードされたタイミングでthrowイベント初期化）
//-----------------------------------------------------------------------------
var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
    _Scene_Map_onMapLoaded.call(this);
    ExAction.Transport.setLockEvent(false);
};

})();