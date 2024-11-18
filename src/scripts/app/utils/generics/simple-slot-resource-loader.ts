/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotCallbackInterface} from "app/utils/interfaces/simple-slot-callback-interface";
import {Asset, LoadAsset, PixiAssetsLoader} from "pixi-assets-loader";

export class SimpleSlotResourceLoader {
    protected static _instance: SimpleSlotResourceLoader;
    protected loader: PixiAssetsLoader;
    protected allAssets: Array<Asset> = [];
    protected callbacks: Array<SimpleSlotCallbackInterface>;

    constructor() {
        if (SimpleSlotResourceLoader._instance) {
            throw new Error("SimpleSlotEventDispatcher class is not to be instantiated. Please use Settings.instance ");
        }
        SimpleSlotResourceLoader._instance = this;
        this.loader = new PixiAssetsLoader();
        this.allAssets = [];
        this.callbacks = [];
    }

    /**
     * Returns the instance for SimpleSlotResourceLoader
     */
    public static get instance(): SimpleSlotResourceLoader {
        return this._instance;
    }

    /**
     * Adds assets to the load list
     * @param assets
     * @param callback
     */
    public addAssets(assets: Array<Asset>, callback: () => void): void {
        this.allAssets = this.allAssets.concat(assets);
        this.callbacks.push(callback);
    }

    /**
     * Starts loading the assets
     */
    public startLoading(): void {
        this.loader.on(PixiAssetsLoader.ASSET_ERROR, this.onAssetsError.bind(this));
        this.loader.on(PixiAssetsLoader.ALL_ASSETS_LOADED, this.onAllAssetsLoaded.bind(this));
        this.loader.addAssets(this.allAssets).load();
    }

    /**
     * Destroy cleanup
     */
    public onDestroy(): void {
        SimpleSlotResourceLoader._instance = undefined;
        this.loader = undefined;
    }

    /**
     * Error callback
     * @param args
     * @protected
     */
    protected onAssetsError(args: LoadAsset): void {
        window.console.log(`[SIMPLE SLOT] onAssetsError ${args.asset.id}: ${args.error!.message}`);
    }

    /**
     * Load complete callback
     * @protected
     */
    protected onAllAssetsLoaded(): void {
        window.console.log("[SIMPLE SLOT] onAllAssetsLoaded!");
        for (let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i].call(null);
        }
    }
}
