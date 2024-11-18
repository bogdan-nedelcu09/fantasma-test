/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotWallet} from "app/modules/money_module/component/simple-slot-wallet";
import {SimpleSlotAbstractProxy} from "app/utils/abstracts/simple-slot-abstract-proxy";
import {WinningType} from "app/utils/constants/simple-slot-winnings-constants";

export class SimpleSlotMoneyProxy extends SimpleSlotAbstractProxy {
    protected playerWallet: SimpleSlotWallet;

    constructor() {
        super();
        this.playerWallet = new SimpleSlotWallet();
    }

    /**
     * Returns player's balance
     */
    public getBalance(): number {
        return this.playerWallet.getBalance();
    }

    /**
     * Validates that user can place the bet
     */
    public validateBet(): boolean {
        return this.playerWallet.validateBet();
    }

    /**
     * Subtracts the bet from the player's balance
     */
    public deductBet(): void {
        this.playerWallet.deductBet();
    }

    /**
     * Adds the winnings to the player's balance
     * @param winType
     */
    public awardWinnings(winType: WinningType): void {
        this.playerWallet.awardWinnings(winType);
    }
}
