/*:
@target MZ
@plugindesc MP0で戦闘不能になるプラグイン
@author 尸解仙ましゅまろ
 
@help
MP0になると戦闘不能になります、鬼畜。

*/

(() => {
  const _refresh = Game_Battler.prototype.refresh;
  Game_Battler.prototype.refresh = function() {
    _refresh.call(this);

    if (this.mp <= 0 && this.hp > 0 && this.isAlive()) {
      this.setHp(0);
    }
  };
})();
