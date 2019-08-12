//=============================================================================
// MPP_DuplicateName.js
//=============================================================================
// Copyright (c) 2018 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.2.0】[名前入力の処理]にて名前の重複や使用できない名前を設定できます。
 * @author 木星ペンギン
 * @help プラグインコマンド:
 *   DuplicateName true/false      # 禁止機能の有効/無効を変更
 * 
 * ================================================================
 * ▼プラグインコマンド詳細
 * --------------------------------
 *  〇 DuplicateName true/false
 *      true:禁止機能の有効 / false:禁止機能の無効
 *  
 *   本プラグインの機能の有効/無効を変更します。
 *   名前の重複、使用できない名前、使用できないワード、全てが無効となります。
 *   
 *   パスワードの入力等を想定した機能です。
 *   
 *   初期値は有効です。
 *   この設定はセーブデータに含まれません。
 *   ゲームを起動するたびに有効となります。
 * 
 * ================================================================
 * ▼プラグインパラメータ詳細
 * --------------------------------
 *  〇 Duplicate Type(重複対象)
 *   0:重複を禁止しない
 *     名前の重複可能。
 *   1:作成済みのアクターのみ
 *     一度でもゲーム内で作成され $gameActors 内に存在するアクターの名前が使用不可。
 *     キャラクターメイク等を想定した機能です。
 *   2:全アクター
 *     まだゲーム内に登場していないアクターの名前も使用不可。
 *  
 *  どの設定でも[使用できない名前の配列](Error Names)や
 *  [禁止ワードの配列](Prohibited Words)に該当する名前は使用不可。
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Duplicate Type
 * @type number
 * @max 2
 * @desc 重複対象
 * (0:重複を禁止しない, 1:作成済みのアクターのみ, 2:全アクター)
 * @default 2
 *
 * @param Duplicate Message
 * @desc 重複した場合のメッセージ
 * @default その名前は既に使われています。
 *
 * @param Error Names _v2
 * @type string[]
 * @desc 使用できない名前の配列
 * @default []
 *
 * @param Error Message
 * @desc 使用できない名前を入力した場合のメッセージ
 * @default その名前は使用できません。
 *
 * @param Prohibited Words _v2
 * @type string[]
 * @desc 禁止ワードの配列
 * @default []
 * 
 * @param Prohibited Message
 * @desc 禁止ワードを含む名前を入力した場合のメッセージ
 * @default 使用できないワードが含まれています。
 *
 */

(function() {

var MPPlugin = {};

(function() {
    
    var parameters = PluginManager.parameters('MPP_DuplicateName');
    
    MPPlugin.duplicateType = Number(parameters['Duplicate Type'] || 0);
    MPPlugin.duplicateMessage = parameters['Duplicate Message'] || "";
    MPPlugin.errorNames = JSON.parse(parameters['Error Names _v2'] || "[]");
    MPPlugin.errorMessage = parameters['Error Message'] || '';
    MPPlugin.prohibitedWords = JSON.parse(parameters['Prohibited Words _v2'] || "[]");
    MPPlugin.prohibitedMessage = parameters['Prohibited Message'] || "";
    
})();

var duplicate = true;

var Alias = {};

//-----------------------------------------------------------------------------
// Game_Actors

Game_Actors.prototype.containsNames = function(actorId, name) {
    var type = MPPlugin.duplicateType;
    if (type >= 1) {
        for (var i = 1; i < $dataActors.length; i++) {
            if (i === actorId) continue;
            var actor = this._data[i];
            if (actor) {
                if (actor.name() === name) return true;
            } else if (type === 2) {
                if ($dataActors[i].name === name) return true;
            }
        }
    }
    return false;
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//1739
Alias.GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Alias.GaIn_pluginCommand.call(this, command, args);
    if (command === 'DuplicateName') {
        duplicate = !!eval(args[0]);
    }
};

//-----------------------------------------------------------------------------
// Window_NameInput

//255
Alias.WiNaIn_onNameOk = Window_NameInput.prototype.onNameOk;
Window_NameInput.prototype.onNameOk = function() {
    var newName = this._editWindow.name();
    if (duplicate && newName) {
        var actorId = this._editWindow._actor.actorId();
        if ($gameActors.containsNames(actorId, newName)) {
            SoundManager.playBuzzer();
            this.callHandler('message1');
            return;
        } else if (MPPlugin.errorNames.contains(newName)) {
            SoundManager.playBuzzer();
            this.callHandler('message2');
            return;
        } else if (this.checkProhibited(newName)) {
            SoundManager.playBuzzer();
            this.callHandler('message3');
            return;
        }
    }
    Alias.WiNaIn_onNameOk.call(this);
};

Window_NameInput.prototype.checkProhibited = function(name) {
    return MPPlugin.prohibitedWords.some(function(word) {
        return name.contains(word);
    });
};

//-----------------------------------------------------------------------------
// Scene_Name

//22
Alias.ScNa_create = Scene_Name.prototype.create;
Scene_Name.prototype.create = function() {
    Alias.ScNa_create.call(this);
    this.createMessageWindow();
    this._messageCount = 0;
};

Scene_Name.prototype.createMessageWindow = function() {
    this._messageWindow = new Window_Base(0, 0, 0, 0);
    var wh = this._messageWindow.fittingHeight(1);
    this._messageWindow.y = (Graphics.boxHeight - wh) / 2;
    this._messageWindow.height = wh;
    this._messageWindow.openness = 0;
    this.addWindow(this._messageWindow);
};

//39
Alias.ScNa_createInputWindow = Scene_Name.prototype.createInputWindow;
Scene_Name.prototype.createInputWindow = function() {
    Alias.ScNa_createInputWindow.call(this);
    this._inputWindow.setHandler('message1', this.onInputMessage.bind(this, 0));
    this._inputWindow.setHandler('message2', this.onInputMessage.bind(this, 1));
    this._inputWindow.setHandler('message3', this.onInputMessage.bind(this, 2));
};

if (Scene_Name.prototype.hasOwnProperty('update')) {
    Alias.ScNa_update = Scene_Name.prototype.update;
}
Scene_Name.prototype.update = function() {
    if (Alias.ScNa_update) {
        Alias.ScNa_update.call(this);
    } else {
        Scene_MenuBase.prototype.update.call(this);
    }
    if (this._messageCount > 0) {
        this._messageCount--;
        if (this._messageCount === 0) {
            this._messageWindow.close();
        } else if (this._messageWindow.openness === 0) {
            this._messageWindow.open();
        }
    }
};

Scene_Name.prototype.onInputMessage = function(messageType) {
    var message;
    if (messageType === 0) message = MPPlugin.duplicateMessage;
    if (messageType === 1) message = MPPlugin.errorMessage;
    if (messageType === 2) message = MPPlugin.prohibitedMessage;
    if (message) {
        var ww = this._messageWindow.textWidth(message) + 24;
        ww = Math.max(ww, this._inputWindow.width + 64);
        ww = Math.min(ww, Graphics.boxWidth);
        this._messageWindow.x = (Graphics.boxWidth - ww) / 2;
        this._messageWindow.width = ww;
        this._messageWindow.createContents();
        this._messageWindow.drawText(message, 12, 0, ww - 24);
        this._messageCount = 100;
    }
};

})();
