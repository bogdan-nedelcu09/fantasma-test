/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {Dispatcher} from "ts-dispatcher";

export class SimpleSlotEventDispatcher {
    protected static _instance: SimpleSlotEventDispatcher;
    protected evDispatcher: Dispatcher<any>;

    constructor() {
        if (SimpleSlotEventDispatcher._instance) {
            throw new Error("SimpleSlotEventDispatcher class is not to be instantiated. Please use Settings.instance ");
        }
        SimpleSlotEventDispatcher._instance = this;
        this.evDispatcher = new Dispatcher();
    }

    /**
     * Returns the instance of SimpleSlotEventDispatcher
     */
    public static get instance(): SimpleSlotEventDispatcher {
        return this._instance;
    }

    /**
     * Dispatch an event
     * @param eventName
     * @param eventMetadata
     */
    public dispatchEvent(eventName: string, eventMetadata: object): void {
        this.evDispatcher.dispatch(eventName, eventMetadata);
    }

    /**
     * Adds a listener for an event
     * @param eventName
     * @param listener
     */
    public addEventListener(eventName: string, listener: () => void): void {
        this.evDispatcher.addListener(eventName, listener);
    }

    /**
     * Destroy cleanup
     */
    public onDestroy(): void {
        SimpleSlotEventDispatcher._instance = undefined;
        this.evDispatcher = undefined;
    }
}
