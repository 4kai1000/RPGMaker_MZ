/*:
@target MZ
@plugindesc MP0で戦闘不能になるプラグイン
@author 尸解仙ましゅまろ
 
@help
MP0になると戦闘不能になります、鬼畜。

*/

(() => {

function Window_BattleNotice() {
    this.initialize(...arguments);
}

Window_BattleNotice.prototype = Object.create(Window_Base.prototype);
Window_BattleNotice.prototype.constructor = Window_BattleNotice;

Window_BattleNotice.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);

    this.openness = 0;
    this.opacity = 192;
    this.contentsOpacity = 0;

    this._duration = 0;
};

Window_BattleNotice.prototype.showNotice = function(text) {

    this.contents.clear();

    this.drawText(text, 0, 0, this.contentsWidth(), "center");

    this.open();

    this.contentsOpacity = 255;

    this._duration = 150;     // 90フレーム表示
};

Window_BattleNotice.prototype.update = function() {

    Window_Base.prototype.update.call(this);

    if (this._duration > 0) {

        this._duration--;

        if (this._duration <= 0) {
            this.close();
        }
    }
};

const _Scene_Battle_createAllWindows =
Scene_Battle.prototype.createAllWindows;

Scene_Battle.prototype.createAllWindows = function() {

    _Scene_Battle_createAllWindows.call(this);

    const w = 400;
    const h = 72;

    const rect = new Rectangle(
        (Graphics.boxWidth - w) / 2,
        Graphics.boxHeight / 2 - 120,
        w,
        h
    );

    this._noticeWindow = new Window_BattleNotice(rect);

    this.addWindow(this._noticeWindow);
};

const _BattleManager_endAction = BattleManager.endAction;

BattleManager.endAction = function() {

    const subject = this._subject;

    if (subject && subject.mp <= 0 && subject.hp > 0) {
        
        SceneManager._scene._noticeWindow.showNotice(
           subject.name() + "はMPを使い果たした！"
        );
        subject.gainHp(-subject.hp);

        if (subject.isEnemy()) {
            subject.performCollapse();
        }
    }

    _BattleManager_endAction.call(this);
};


})();
