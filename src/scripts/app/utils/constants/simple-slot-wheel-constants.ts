/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotWheelSymbol} from "app/modules/wheel_module/component/simple-slot-wheel-symbol";
import {Texture} from "pixi.js";

export class SimpleSlotWheelConstants {
    public static reelConfigurationString: string = "SYM1,SYM5,SYM1,SYM3,SYM4,SYM3,SYM2,SYM4,SYM3,SYM6,SYM3,SYM1,SYM6,SYM1,SYM2,SYM1,SYM2,SYM2,SYM2,SYM1,SYM2,SYM1,SYM4,SYM1,SYM3,SYM6,SYM1,SYM3,SYM2,SYM5,SYM3,SYM1,SYM2,SYM2,SYM2,SYM1,SYM4,SYM1,SYM4,SYM1,SYM3,SYM2,SYM4,SYM4,SYM5,SYM2,SYM3,SYM1,SYM1,SYM1,SYM4,SYM5,SYM2,SYM2,SYM2,SYM1,SYM5,SYM6,SYM1,SYM3,SYM4,SYM2,SYM5,SYM2,SYM1,SYM5,SYM1,SYM2,SYM1,SYM1,SYM1,SYM4,SYM4,SYM3,SYM3,SYM5,SYM5,SYM4,SYM2,SYM5,SYM2,SYM1,SYM3,SYM2,SYM3,SYM1,SYM4,SYM3,SYM4,SYM2,SYM3,SYM4,SYM1,SYM1,SYM1,SYM2,SYM6,SYM3,SYM2,SYM3,SYM1,SYM5";
    public static symbolSize: number = 256;
    public static minSpinTime: number = 3200;
    public static minSymbolsDuringSpin: number = 20;
    public static randomSymbolsFactorDuringSpin: number = 5;
}

export class SimpleSlotWheelHelpers {
    /**
     * Processes the symbols list string and returns an array of SimpleSlotWheelSymbol
     */
    public static getParsedReelConfiguration(): Array<SimpleSlotWheelSymbol> {
        const reelString: string = SimpleSlotWheelConstants.reelConfigurationString;
        const reelStringArray: Array<string> = reelString.split(",");
        const allSymbolsArray: Array<SimpleSlotWheelSymbol> = [];
        for (let i = 0; i < reelStringArray.length; i++) {
            allSymbolsArray[i] = new SimpleSlotWheelSymbol();
            allSymbolsArray[i].symbolName = reelStringArray[i];
            const stringSymbolID: string = reelStringArray[i].replace("SYM", "");
            allSymbolsArray[i].symbolID = Number(stringSymbolID);
        }
        return allSymbolsArray;
    }

    /**
     * Lerp function
     * @param a1
     * @param a2
     * @param t
     */
    public static standardLerp(a1: number, a2: number, t: number): number {
        return a1 * (1 - t) + a2 * t;
    }

    /**
     * Ease back out function
     * @param amount
     */
    public static backOut(amount: number): (t: any) => number {
        return t => --t * t * ((amount + 1) * t + amount) + 1;
    }
}
