/*:
 * @target MZ
 * @plugindesc 固定ダメージステートとステートアニメ
 * @author 尸解仙ましゅまろ
 * @version 1.0
 * 
 * @help
 * 固定ダメージステートとステート時アニメを追加します。
 * 以下をメモ欄に記載
 * <dmg:数値>：ターン終了時に数値分ダメージを与えます。
 * <anime:id>：アニメーションIDを表示します。
 * 例
 * <dmg:1000> 　：ターン終了時1000ダメージ与えます。
 * <dmg:a.hp/10>：ターン終了時残りHPの10%ダメージを与えます。
 *
 */


(() => {

const _Game_Battler_regenerateAll =
Game_Battler.prototype.regenerateAll;

Game_Battler.prototype.regenerateAll = function() {
    _Game_Battler_regenerateAll.call(this);

    if (!this.isAlive()) return;

    BattleManager._slipQueue = BattleManager._slipQueue || [];

    for (const stateId of this._states) {
        const state = $dataStates[stateId];
        if (!state) continue;

        const note = state.note;

        const dmgMatch = note.match(/<dmg:(.+?)>/);
        const animeMatch = note.match(/<anime:(\d+)>/);

        if (dmgMatch) {
            const formula = dmgMatch[1];
            const a = this;
            const b = this;
            const v = $gameVariables._data;

            let damage = 0;

            try {
                damage = Math.floor(eval(formula));
            } catch (e) {
                console.error("dmg式エラー:", formula);
                damage = 0;
            }

            BattleManager._slipQueue.push({
                target: this,
                damage: Math.max(0, damage),
                animeId: animeMatch ? Number(animeMatch[1]) : 0
            });
        }
    }
};

const _BattleManager_update = BattleManager.update;
BattleManager.update = function(timeActive) {

    if (this._slipData) {
        const spriteset = SceneManager._scene._spriteset;

        if (!spriteset.isAnimationPlaying()) {
            const data = this._slipData;

            data.target.gainHp(-data.damage);
            data.target.startDamagePopup();

            if (data.target.isDead()) {
                data.target.performCollapse();
            }

            this._slipData = null;
        }
        return;
    }

    if (this._slipQueue && this._slipQueue.length > 0) {
        const data = this._slipQueue.shift();

        if (data.target.isAlive()) {
            if (data.animeId > 0) {
                $gameTemp.requestAnimation([data.target], data.animeId);
                this._slipData = data;
                return;
            } else {
                data.target.gainHp(-data.damage);
                data.target.startDamagePopup();
            }
        }
    }

    _BattleManager_update.call(this, timeActive);
};

})();
