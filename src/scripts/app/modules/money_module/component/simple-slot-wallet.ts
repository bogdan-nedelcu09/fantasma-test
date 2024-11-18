/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotWalletConstants} from "app/utils/constants/simple-slot-wallet-constants";
import {WinningType} from "app/utils/constants/simple-slot-winnings-constants";

export class SimpleSlotWallet {
    protected balance: number;

    constructor() {
        this.balance = SimpleSlotWalletConstants.initialBalance;
    }

    /**
     * Returns player's balance
     */
    public getBalance(): number {
        return this.balance;
    }

    /**
     * Validates that user can place the bet
     */
    public validateBet(): boolean {
        return this.balance >= SimpleSlotWalletConstants.standardBet;
    }

    /**
     * Subtracts the bet from the player's balance
     */
    public deductBet(): void {
        this.balance = this.balance - SimpleSlotWalletConstants.standardBet;
    }

    /**
     * Adds the winnings to the player's balance
     * @param winType
     */
    public awardWinnings(winType: WinningType): void {
        let winValue: number;
        switch (winType) {
            case WinningType.None: {
                winValue = 0;
                break;
            }
            case WinningType.Double: {
                winValue = 2 * SimpleSlotWalletConstants.standardBet;
                break;
            }
            case WinningType.Triple: {
                winValue = 3 * SimpleSlotWalletConstants.standardBet;
                break;
            }
            default : {
                winValue = 0;
                break;
            }
        }
        this.balance = this.balance + winValue;
    }
}
