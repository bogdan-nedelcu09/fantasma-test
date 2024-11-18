/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotEventDispatcher} from "app/utils/generics/simple-slot-event-dispatcher";

export class SimpleSlotAbstractProxy {
    /**
     * Dispatches an event
     * @param eventName
     * @param eventData
     */
    public dispatchEvent(eventName: string, eventData?: object): void {
        SimpleSlotEventDispatcher.instance.dispatchEvent(eventName, eventData);
    }

    /**
     * Adds listener to an event
     * @param eventName
     * @param listener
     */
    public addEventListener(eventName: string, listener: () => void): void {
        SimpleSlotEventDispatcher.instance.addEventListener(eventName, listener);
    }

    /**
     * Removes an event listener
     * @param eventName
     */
    public removeEventListener(eventName: string): void {
        SimpleSlotEventDispatcher.instance.addEventListener(eventName, () => {});
    }
}
