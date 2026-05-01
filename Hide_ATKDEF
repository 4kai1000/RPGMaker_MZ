/*:
 * @target MZ
 * @plugindesc 攻撃防御コマンド削除
 * @author 尸解仙ましゅまろ
 * 
 * @help
 * 戦闘中のアクターコマンドから
 * 「攻撃」「防御」を削除します。
 */

(() => {

const _Window_ActorCommand_makeCommandList =
    Window_ActorCommand.prototype.makeCommandList;

Window_ActorCommand.prototype.makeCommandList = function() {
    if (this._actor) {
        
        //コマンド全削除
        this.clearCommandList();
        
        //スキルコマンドと
        //アイテムコマンドのみに
        this.addSkillCommands();
        this.addItemCommand();
        
    }
};

})();
