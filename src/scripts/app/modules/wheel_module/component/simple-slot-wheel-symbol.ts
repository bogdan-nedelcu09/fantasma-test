/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {Sprite} from "pixi.js";

export class SimpleSlotWheelSymbolData {
    public symbolID: number;
    public symbolName: string;
}

export class SimpleSlotWheelSymbol extends SimpleSlotWheelSymbolData {
    public sprite: Sprite;
}
