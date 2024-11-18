/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {
    SimpleSlotWheelSymbol,
    SimpleSlotWheelSymbolData,
} from "app/modules/wheel_module/component/simple-slot-wheel-symbol";
import {SimpleSlotAbstractView} from "app/utils/abstracts/simple-slot-abstract-view";
import {SimpleSlotGlobalConstants} from "app/utils/constants/simple-slot-global-constants";
import {SimpleSlotWheelConstants, SimpleSlotWheelHelpers} from "app/utils/constants/simple-slot-wheel-constants";
import {SimpleSlotResourceLoader} from "app/utils/generics/simple-slot-resource-loader";
import {SimpleSlotScreenSize} from "app/utils/generics/simple-slot-screen-size";
import {SimpleSlotCallbackInterface} from "app/utils/interfaces/simple-slot-callback-interface";
import {SimpleSlotTweenConfigInterface} from "app/utils/interfaces/simple-slot-tween-config-interface";
import Container = PIXI.Container;
import _ from "lodash";
import {AssetPriority} from "pixi-assets-loader";
import {Graphics, Point, Sprite} from "pixi.js";

export class SimpleSlotWheelView extends SimpleSlotAbstractView {
    protected reelContainer: Container;
    protected onDisplaySymbols: Array<SimpleSlotWheelSymbol> = [];
    protected allSymbolsArray: Array<SimpleSlotWheelSymbolData> = [];
    protected initialAllSymbolsArray: Array<SimpleSlotWheelSymbolData> = [];
    protected nbSymbolsVisible: number = 3;
    protected nbSymbolsTotal: number = 5;
    protected reelsFrameSize: Point;
    protected isSpinning: boolean = false;
    protected inProgressTweening: SimpleSlotTweenConfigInterface;
    protected initialReelContainerPosition: Point;
    protected lowestSymbolY: number = 0;

    /**
     * Returns an array of symbol IDs for the result symbols in view
     */
    public get symbolsInView(): Array<number> {
        const resultIDs: Array<number> = [];
        const symbolsSortedByPosition: Array<SimpleSlotWheelSymbol> =
            _.orderBy(this.onDisplaySymbols, "sprite.position.y", "asc");
        for (let i: number = symbolsSortedByPosition.length - this.nbSymbolsVisible; i < symbolsSortedByPosition.length; i++) {
            const onDisplaySymbol: SimpleSlotWheelSymbol = symbolsSortedByPosition[i];
            resultIDs.push(onDisplaySymbol.symbolID);
        }
        return resultIDs;
    }

    /**
     * @inheritDoc
     * @param display
     */
    public onInit(display: Container): void {
        super.onInit(display);
        this.reelContainer = new Container();
        this.display.addChild(this.reelContainer);
    }

    /**
     * Sets up the config symbols list
     * @param allSymbolsArray
     */
    public setupAllSymbols(allSymbolsArray: Array<SimpleSlotWheelSymbolData>): void {
        this.allSymbolsArray = _.cloneDeep(allSymbolsArray);
        this.initialAllSymbolsArray = _.cloneDeep(allSymbolsArray);
    }

    /**
     * Starts the spin process
     * @param callBack
     */
    public startSpin(callBack: SimpleSlotCallbackInterface): void {
        if (this.isSpinning) {
            return;
        }
        this.isSpinning = true;
        const minSpinTime: number = SimpleSlotWheelConstants.minSpinTime;
        const randomSymbolsCnt: number = SimpleSlotWheelConstants.minSymbolsDuringSpin +
            Math.floor(Math.random() * SimpleSlotWheelConstants.randomSymbolsFactorDuringSpin);
        const reelTargetPos: number = this.reelContainer.position.y +
            SimpleSlotWheelConstants.symbolSize * randomSymbolsCnt;
        this.inProgressTweening = {
            tweenObject: this.reelContainer,
            initialY: this.reelContainer.position.y,
            targetY: reelTargetPos,
            time: minSpinTime,
            easing: SimpleSlotWheelHelpers.backOut(0.5),
            change: null,
            complete: () => {
                this.reelComplete(callBack);
            },
            start: Date.now(),
        };

        /**
         * add onUpdate for the symbols movement (inside the container)
         */
        this.appTicker.add(() => {
            if (_.isNil(this.inProgressTweening)) {
                return;
            }
            this.moveSymbolsInContainer();
        });

        /**
         * add onUpdate for the container movement (on screen)
         */
        this.appTicker.add(() => {
            if (_.isNil(this.inProgressTweening)) {
                return;
            }
            this.moveContainer();
        });
    }

    /**
     * Force stops the wheel and displays result symbols
     */
    public stopSpin(): void {
        if (!this.isSpinning || _.isNil(this.inProgressTweening)) {
            return;
        }
        this.reelContainer.position.y = this.inProgressTweening.targetY;
        this.moveSymbolsInContainer();
        if (this.inProgressTweening.complete) { this.inProgressTweening.complete(); }
        this.inProgressTweening = undefined;
    }

    /**
     * Container movement on screen
     * @protected
     */
    protected moveContainer(): void {
        const now: number = Date.now();
        const phase: number = Math.min(1, (now - this.inProgressTweening.start) / this.inProgressTweening.time);
        this.inProgressTweening.tweenObject.position.y =
            SimpleSlotWheelHelpers.standardLerp(this.inProgressTweening.initialY,
                this.inProgressTweening.targetY, this.inProgressTweening.easing(phase));
        if (this.inProgressTweening.change) { this.inProgressTweening.change(); }
        if (phase === 1) {
            this.inProgressTweening.tweenObject.position.y = this.inProgressTweening.targetY;
            if (this.inProgressTweening.complete) { this.inProgressTweening.complete(); }
            this.inProgressTweening = undefined;
        }
    }

    /**
     * Symbols movement inside the container
     * @protected
     */
    protected moveSymbolsInContainer(): void {
        const symbolSize: number = SimpleSlotWheelConstants.symbolSize;
        const currentPosition: number = this.reelContainer.position.y;
        const initialPosition: number = this.initialReelContainerPosition.y;
        const unitsMoved: number = Math.floor((currentPosition - initialPosition) / symbolSize);
        const currentLowestSymbolY: number = this.lowestSymbolY - (unitsMoved * symbolSize);
        let deltaFactor: number = 0;
        for (let j: number = 0; j < this.onDisplaySymbols.length; j++) {
            const symbol: Sprite = this.onDisplaySymbols[j].sprite;
            if (symbol.position.y > currentLowestSymbolY) {
                const currentDeltaFactor: number = Math.floor((symbol.position.y - currentLowestSymbolY) / symbolSize);
                if (currentDeltaFactor > 0) {
                    deltaFactor = Math.max(deltaFactor, currentDeltaFactor);
                }
                symbol.position.y = symbol.position.y - (this.nbSymbolsTotal * symbolSize);
                const symbolMetadata: SimpleSlotWheelSymbolData = this.getNextSymbol();
                this.onDisplaySymbols[j].symbolID = symbolMetadata.symbolID;
                this.onDisplaySymbols[j].symbolName = symbolMetadata.symbolName;
                symbol.texture = PIXI.loader.resources[symbolMetadata.symbolName].texture;
            }
        }
        /**
         * delta factor is used on stop spin, where the movement is fast forwarded
         */
        if (deltaFactor > this.nbSymbolsTotal) {
            for (let j: number = 0; j < this.onDisplaySymbols.length; j++) {
                const symbol: Sprite = this.onDisplaySymbols[j].sprite;
                symbol.position.y = symbol.position.y - ((deltaFactor - this.nbSymbolsTotal) * symbolSize);
            }
        }
    }

    /**
     * @inheritDoc
     * @protected
     */
    protected setResourcesNeeded(): void {
        const assets = [
            {id: "SYM1", url: "assets/graphics/SYM01.png", priority: AssetPriority.NORMAL, type: "texture"},
            {id: "SYM2", url: "assets/graphics/SYM02.png", priority: AssetPriority.NORMAL, type: "texture"},
            {id: "SYM3", url: "assets/graphics/SYM03.png", priority: AssetPriority.NORMAL, type: "texture"},
            {id: "SYM4", url: "assets/graphics/SYM04.png", priority: AssetPriority.NORMAL, type: "texture"},
            {id: "SYM5", url: "assets/graphics/SYM05.png", priority: AssetPriority.NORMAL, type: "texture"},
            {id: "SYM6", url: "assets/graphics/SYM06.png", priority: AssetPriority.NORMAL, type: "texture"},
        ];
        SimpleSlotResourceLoader.instance.addAssets(assets, this.onAllAssetsLoaded.bind(this));
    }

    /**
     * Callback for assets loaded will set up the wheel
     * @protected
     */
    protected onAllAssetsLoaded(): void {
        this.setupReelsFrameInfo();
        this.initialiseSymbolsOnWheel();
        this.setupWheelMask();
        this.isSpinning = false;
    }

    /**
     * Stores the reel frame information to properly align symbols
     * @protected
     */
    protected setupReelsFrameInfo(): void {
        const reelFrame: Sprite = new Sprite(PIXI.loader.resources.REEL.texture);
        this.reelsFrameSize = new Point(SimpleSlotGlobalConstants.universalScale * reelFrame.width,
            SimpleSlotGlobalConstants.universalScale * reelFrame.height);
    }

    /**
     * Sets up the initial symbols
     * @protected
     */
    protected initialiseSymbolsOnWheel(): void {
        const symbolSize: number = SimpleSlotWheelConstants.symbolSize;
        for (let i = 0; i < this.nbSymbolsTotal; i++) {
            const symbolMetadata: SimpleSlotWheelSymbolData = this.getNextSymbol();
            const symbol: Sprite = new Sprite(PIXI.loader.resources[symbolMetadata.symbolName].texture);
            symbol.position.y = -1 * i * symbolSize;
            symbol.scale.set(SimpleSlotGlobalConstants.universalScale);
            symbol.position.x = Math.round((symbolSize - symbol.width) / 2);
            const fullSymbol: SimpleSlotWheelSymbol = new SimpleSlotWheelSymbol();
            fullSymbol.sprite = symbol;
            fullSymbol.symbolID = symbolMetadata.symbolID;
            fullSymbol.symbolName = symbolMetadata.symbolName;
            this.onDisplaySymbols.push(fullSymbol);
            this.reelContainer.addChild(symbol);
            if (symbol.position.y > this.lowestSymbolY) {
                this.lowestSymbolY = symbol.position.y;
            }
        }

        this.reelContainer.x = SimpleSlotScreenSize.width / 3 + (this.reelsFrameSize.x - symbolSize) / 2;
        this.reelContainer.y = SimpleSlotScreenSize.height / 2 + symbolSize / 2;
        this.initialReelContainerPosition = new Point(this.reelContainer.x, this.reelContainer.y);
    }

    /**
     * Adds a mask over the reel
     * @protected
     */
    protected setupWheelMask(): void {
        const wheelMask: Graphics = new Graphics();
        wheelMask.beginFill(0xff5733);
        wheelMask.drawRect(0, 0, this.reelsFrameSize.x, this.reelsFrameSize.y);
        wheelMask.endFill();
        wheelMask.x = SimpleSlotScreenSize.width / 3;
        wheelMask.y = SimpleSlotScreenSize.height / 2 - this.reelsFrameSize.y / 2;
        wheelMask.isMask = true;
        wheelMask.visible = false;
        this.display.addChild(wheelMask);
        this.reelContainer.mask = wheelMask;
    }

    /**
     * Reel movement complete, will continue the game flow
     * @param callBack
     * @protected
     */
    protected reelComplete(callBack: SimpleSlotCallbackInterface): void {
        if (this.isSpinning) {
            for (let i = 0; i < this.onDisplaySymbols.length; i++) {
                const onDisplaySymbol = this.onDisplaySymbols[i];
                if (onDisplaySymbol.sprite.position.y > this.lowestSymbolY) {
                    this.lowestSymbolY = onDisplaySymbol.sprite.position.y;
                }
            }
            this.isSpinning = false;
            callBack.call(null);
        }
    }

    /**
     * Gets a symbol from the config list
     * @protected
     */
    protected getNextSymbol(): SimpleSlotWheelSymbolData {
        if (this.allSymbolsArray.length === 0) {
            this.allSymbolsArray = _.cloneDeep(this.initialAllSymbolsArray);
        }

        return this.allSymbolsArray.shift();
    }
}
