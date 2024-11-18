/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotWheelSymbol} from "app/modules/wheel_module/component/simple-slot-wheel-symbol";
import {SimpleSlotAbstractProxy} from "app/utils/abstracts/simple-slot-abstract-proxy";
import {SimpleSlotWheelHelpers} from "app/utils/constants/simple-slot-wheel-constants";

export class SimpleSlotWheelProxy extends SimpleSlotAbstractProxy {
    public allSymbolsArray: Array<SimpleSlotWheelSymbol> = [];

    constructor() {
        super();
        this.allSymbolsArray = SimpleSlotWheelHelpers.getParsedReelConfiguration();
    }
}
