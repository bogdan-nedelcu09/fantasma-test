/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotGameStates} from "app/modules/game_logic_module/component/simple-slot-game-states";
import {SimpleSlotMoneyAtm} from "app/modules/money_module/component/simple-slot-money-atm";
import {SimpleSlotAbstractProxy} from "app/utils/abstracts/simple-slot-abstract-proxy";
import {SimpleSlotBackgroundConstants} from "app/utils/constants/simple-slot-background-constants";
import {SimpleSlotGlobalConstants} from "app/utils/constants/simple-slot-global-constants";
import {SimpleSlotWalletConstants} from "app/utils/constants/simple-slot-wallet-constants";
import {WinningType} from "app/utils/constants/simple-slot-winnings-constants";

export class SimpleSlotEndGameDecisionProxy extends SimpleSlotAbstractProxy {
    protected static _instance: SimpleSlotEndGameDecisionProxy;
    protected currentState: SimpleSlotGameStates;
    protected lastWinningType: WinningType;
    protected winHighlight: string;

    constructor() {
        super();
        if (SimpleSlotEndGameDecisionProxy._instance) {
            throw new Error("SimpleSlotEventDispatcher class is not to be instantiated. Please use Settings.instance ");
        }
        SimpleSlotEndGameDecisionProxy._instance = this;
        this.currentState = SimpleSlotGameStates.Idle;
    }

    /**
     * Returns won value from current / last spin
     */
    public get winValue(): number {
        if (this.lastWinningType === WinningType.Double) {
            return 2 * SimpleSlotWalletConstants.standardBet;
        } else if (this.lastWinningType === WinningType.Triple) {
            return 3 * SimpleSlotWalletConstants.standardBet;
        } else {
            return 0;
        }
    }

    /**
     * Returns the highlight mask for the winning symbols
     */
    public get symbolsHighlight(): string {
        return this.winHighlight;
    }

    /**
     * Returns the instance of the EndGameDecisionProxy
     */
    public static get instance(): SimpleSlotEndGameDecisionProxy {
        return this._instance;
    }

    /**
     * Checks if all criteria is met to spin
     * @param betValidation
     */
    public validateTrySpin(betValidation: boolean): boolean {
        const canSpin: boolean = (this.currentState === SimpleSlotGameStates.Idle && betValidation);
        if (canSpin) {
            this.currentState = SimpleSlotGameStates.Spin;
            SimpleSlotMoneyAtm.instance.deductBet();
        }
        return canSpin;
    }

    /**
     * Check if the spin resulted in winnings and updates accordingly
     * @param symbolsArray
     */
    public checkWinnings(symbolsArray: Array<number>): void {
        this.lastWinningType = WinningType.None;
        if (symbolsArray[0] === symbolsArray[1] &&
            symbolsArray[1] === symbolsArray[2]) {
            this.lastWinningType = WinningType.Triple;
            this.winHighlight = "111";
        } else if (symbolsArray[0] === symbolsArray[1]) {
            this.lastWinningType = WinningType.Double;
            this.winHighlight = "110";
        } else if (symbolsArray[1] === symbolsArray[2]) {
            this.lastWinningType = WinningType.Double;
            this.winHighlight = "011";
        } else if (symbolsArray[0] === symbolsArray[2]) {
            this.lastWinningType = WinningType.Double;
            this.winHighlight = "101";
        }

        if (this.lastWinningType === WinningType.None) {
            this.currentState = SimpleSlotGameStates.Idle;
            this.lastWinningType = WinningType.None;
            this.dispatchEvent(SimpleSlotGlobalConstants.ON_FULL_SPIN_END);
            this.dispatchEvent(SimpleSlotBackgroundConstants.SHOW_NORMAL_BACKGROUND_EVENT);
        } else {
            this.currentState = SimpleSlotGameStates.Winnings;
            SimpleSlotMoneyAtm.instance.awardWinnings(this.lastWinningType);
            this.dispatchEvent(SimpleSlotGlobalConstants.ON_WINNINGS_EVENT);
            this.dispatchEvent(SimpleSlotBackgroundConstants.SHOW_WINNINGS_BACKGROUND_EVENT);
        }
    }

    /**
     * Resets the game to default - idle state
     */
    public resetGameState(): void {
        this.lastWinningType = WinningType.None;
        this.currentState = SimpleSlotGameStates.Idle;
        this.dispatchEvent(SimpleSlotGlobalConstants.ON_FULL_SPIN_END);
        this.dispatchEvent(SimpleSlotBackgroundConstants.SHOW_NORMAL_BACKGROUND_EVENT);
    }

    /**
     * Destroy cleanup
     */
    public onDestroy(): void {
        this.lastWinningType = WinningType.None;
        SimpleSlotEndGameDecisionProxy._instance = undefined;
    }
}
