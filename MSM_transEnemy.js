/*:
@target MZ
@plugindesc ステルスエネミー
@author 尸解仙ましゅまろ

@help
特徴を有するメモ欄に不透明度を書きます。

<stealth:不透明度>
*/

(() => {

'use strict';

Game_BattlerBase.prototype.stealthOpacity = function() {
    let opacity = 255;

    for (const obj of this.traitObjects()) {
        if (obj.meta.stealth) {
            opacity = Math.min(opacity, Number(obj.meta.stealth));
        }
    }

    return opacity;
};

const _Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    _Sprite_Battler_update.call(this);

    //敵のみ
    if (!this._battler) return;
    //生存中のみ
    if (!this._battler.isAlive()) return;

    const targetOpacity = this._battler.stealthOpacity();

    this.opacity += (targetOpacity - this.opacity) * 0.15;

    if (Math.abs(this.opacity - targetOpacity) < 1) {
        this.opacity = targetOpacity;
    }
};

})();
