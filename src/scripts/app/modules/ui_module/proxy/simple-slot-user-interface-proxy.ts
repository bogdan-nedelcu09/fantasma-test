/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotInterfaceStatesEnum} from "app/modules/ui_module/component/simple-slot-interface-states-enum";
import {SimpleSlotAbstractProxy} from "app/utils/abstracts/simple-slot-abstract-proxy";

export class SimpleSlotUserInterfaceProxy extends SimpleSlotAbstractProxy {
    /**
     * Stores the state of the UI
     */
    public currentInterfaceState: SimpleSlotInterfaceStatesEnum;
}
