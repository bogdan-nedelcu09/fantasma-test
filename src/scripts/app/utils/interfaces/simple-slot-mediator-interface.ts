/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotViewInterface} from "app/utils/interfaces/simple-slot-view-interface";
import {Container} from "pixi.js";

export interface SimpleSlotMediatorInterface {
    view: SimpleSlotViewInterface;
    onInit(display: Container): void;
    onCleanup(): void;
    setVisible(visible: boolean): void;
}
