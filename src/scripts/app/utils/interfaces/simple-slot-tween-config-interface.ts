/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotCallbackInterface} from "app/utils/interfaces/simple-slot-callback-interface";
import Container = PIXI.Container;

export interface SimpleSlotTweenConfigInterface {
    tweenObject: Container;
    initialY: number;
    targetY: number;
    easing: (t: any) => number;
    time: number;
    change: SimpleSlotCallbackInterface;
    complete: SimpleSlotCallbackInterface;
    start: number;
}
