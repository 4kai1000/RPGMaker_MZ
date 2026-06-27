/*:
@target MZ
@plugindesc マップ上ステート更新停止
@author 尸解仙ましゅまろ

@help
マップ上でステートや特徴の更新をなくします。
HP再生やステートのターン更新がなくなります。

*/

(() => {

'use strict';

//なんとこれだけで全部うまくいくなんて！
//まったく、おそろしいものだよ！
Game_Actor.prototype.turnEndOnMap=function(){};

})();
