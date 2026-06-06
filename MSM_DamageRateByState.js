/*:

@target MZ
@plugindesc ステート特効倍率
@author 尸解仙ましゅまろ

@help

スキルのメモ欄に倍率設定を書いてください
<StateRate:ステートID,倍率>

例：
<StateRate:3,2>
ステート3なら威力2倍

複数該当時は最大倍率を採用します。

*/

(() => {
"use strict";

const _Game_Action_makeDamageValue =
Game_Action.prototype.makeDamageValue;

Game_Action.prototype.makeDamageValue = function(target, critical) {

let value =
    _Game_Action_makeDamageValue.call(
        this,
        target,
        critical
    );

const item = this.item();

if (!item || !item.note) {
    return value;
}

let maxRate = 1.0;

const regex = /<StateRate:(\d+),([\d.]+)>/gi;

let match;

while ((match = regex.exec(item.note)) !== null) {

    const stateId = Number(match[1]);
    const rate    = Number(match[2]);

    if (target.isStateAffected(stateId)) {
        maxRate = Math.max(maxRate, rate);
    }
}

return Math.floor(value * maxRate);

};

})();
