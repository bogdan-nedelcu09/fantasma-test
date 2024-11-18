/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {Container} from "pixi.js";

export interface SimpleSlotViewInterface {
    display: Container;
    onInit(display: Container): void;
    onCleanup(): void;
    setVisible(visible: boolean): void;
}
