//=============================================================================
// ReverseBGM.js
// by Tsukimi 
// Last Updated: 2018.01.01
//=============================================================================
// Version
// 1.0.1 2018/01/01 replayBGMの効果がないバグを修正
// 1.0.0 2018/01/01 初版
//=============================================================================

/*:
 * @plugindesc BGM逆再生プラグイン
 * @author Tsukimi
 *
 * @help 
 * このプラグインは、BGMを逆再生できようにするプラグインです。
 * 
 * プラグインコマンド：
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （引数の間は半角スペースで区切ってください）
 * 
 * 　reverseBGM ON
 *    これから再生するBGMは全て逆再生されるようになる。
 * 
 * 　reverseBGM ON once
 *    次に再生するBGMは逆再生されるようになる。
 *    （その後は普通の再生になる）
 * 
 * 　reverseBGM OFF
 *    BGMを普通の再生に戻す。
 * 
 *  以上のコマンドを実行しても、今再生しているBGMにすぐに適用はしません。
 *  すぐ逆再生にしたい場合は、上のコマンドを実行した後、
 *  次のコマンドを実行してください。
 * 
 *   replayBGM
 *    BGMをもう一回読み込み、再生する。
 * 
 */

(function() {
    'use strict';
    
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        switch ((command || '').toUpperCase()) {
            case 'REVERSEBGM' :
                if((args[0] || '').toUpperCase() === "ON") {
                    if((args[1] || '').toUpperCase() === "ONCE") $gameTemp._bgmReverse = true;
                    else $gameSystem._bgmReverse = true;
                }
                else if((args[0] || '').toUpperCase() === "OFF") {
                    $gameSystem._bgmReverse = false;
                    $gameTemp._bgmReverse = false;
                }
                break;
                
            case 'REPLAYBGM' :
                if(AudioManager._currentBgm) {
                    var bgm = AudioManager._currentBgm;
                    AudioManager.stopBgm();
                    if(Decrypter.hasEncryptedAudio && AudioManager.shouldUseHtml5Audio()){
                        AudioManager.playEncryptedBgm(bgm, 0);
                    }
                    else {
                        AudioManager._bgmBuffer = AudioManager.createBuffer('bgm', bgm.name);
                        AudioManager.updateBgmParameters(bgm);
                        if (!AudioManager._meBuffer) {
                            AudioManager._bgmBuffer.play(true,0);
                        }
                    }
                }
        }
    };
    var _AudioManager_createBuffer = AudioManager.createBuffer;
    AudioManager.createBuffer = function(folder, name) {
        var buffer = _AudioManager_createBuffer.apply(this, arguments);
        if(folder === 'bgm' && ($gameSystem._bgmReverse || $gameTemp._bgmReverse) ) {
            buffer._shouldReverse = true;
            $gameTemp._bgmReverse = undefined;
        }
        return buffer;
    };
    
    var _WebAudio__createNodes = WebAudio.prototype._createNodes;
    WebAudio.prototype._createNodes = function() {
        if( this._shouldReverse ) {
            Array.prototype.reverse.call( this._buffer.getChannelData(0) );
            Array.prototype.reverse.call( this._buffer.getChannelData(1) );
            this._loopStart = this._totalTime - this._loopLength - this._loopStart;
        }
        _WebAudio__createNodes.apply(this, arguments);
    };
    
    var _Scene_Gameover_create = Scene_Gameover.prototype.create;
    Scene_Gameover.prototype.create = function() {
        $gameSystem._bgmReverse = undefined;
        _Scene_Gameover_create.apply(this, arguments);
    };
    
    var _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        $gameSystem._bgmReverse = undefined;
        _Scene_Title_create.apply(this, arguments);
    };
    
})();