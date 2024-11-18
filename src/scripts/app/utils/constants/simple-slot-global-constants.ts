/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {TextStyleOptions} from "pixi.js";

export class SimpleSlotGlobalConstants {
    public static universalScale: number = 2;

    public static ON_SPIN_EVENT: string = "on_spin_event";
    public static ON_STOP_EVENT: string = "on_stop_event";
    public static ON_WINNINGS_EVENT: string = "on_winnings_event";
    public static ON_FULL_SPIN_END: string = "on_full_spin_end_event";

    public static textStyleOptions: TextStyleOptions = {
        fontFamily: "Arial",
        fontSize: 36,
        fontStyle: "italic",
        fontWeight: "bold",
        wordWrap: true,
        wordWrapWidth: 500,
        fill: "white",
    };
}
