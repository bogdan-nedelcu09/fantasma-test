import {SimpleSlotBackgroundModule} from "app/modules/background_module/simple-slot-background-module";
import {SimpleSlotGameLogicModule} from "app/modules/game_logic_module/simple-slot-game-logic-module";
import {SimpleSlotMoneyModule} from "app/modules/money_module/simple-slot-money-module";
import {SimpleSlotUserInterfaceModule} from "app/modules/ui_module/simple-slot-user-interface-module";
import {SimpleSlotWheelModule} from "app/modules/wheel_module/simple-slot-wheel-module";
import {SimpleSlotWinningsModule} from "app/modules/winnings_module/simple-slot-winnings-module";
import {SimpleSlotAbstractModule} from "app/utils/abstracts/simple-slot-abstract-module";
import {SimpleSlotEventDispatcher} from "app/utils/generics/simple-slot-event-dispatcher";
import {SimpleSlotResourceLoader} from "app/utils/generics/simple-slot-resource-loader";
import {SimpleSlotScreenSize} from "app/utils/generics/simple-slot-screen-size";
import {
    Dom,
    PixiAppWrapper as Wrapper,
    PixiAppWrapperOptions as WrapperOpts,
} from "pixi-app-wrapper";
import "pixi-particles";
import "pixi-spine";
import Container = PIXI.Container;

/**
 * Showcase for PixiAppWrapper class.
 */
export class SimpleSlotEntryPoint {
    protected app: Wrapper;
    protected simpleSlotEventDispatcher: SimpleSlotEventDispatcher;
    protected simpleSlotResourceLoader: SimpleSlotResourceLoader;
    protected gameModules: Array<SimpleSlotAbstractModule> = [];

    constructor() {
        this.createGlobalSingletons();
        this.createMainApp();
        this.registerModules();
        this.simpleSlotResourceLoader.startLoading();
    }

    /**
     * Creates the main pixi app
     * @protected
     */
    protected createMainApp(): void {
        const canvas = Dom.getElementOrCreateNew<HTMLCanvasElement>("app-canvas", "canvas", document.getElementById("app-root"));
        const appOptions: WrapperOpts = {
            width: 1920,
            height: 1080,
            scale: "keep-aspect-ratio",
            align: "middle",
            resolution: window.devicePixelRatio,
            roundPixels: true,
            transparent: false,
            backgroundColor: 0x000000,
            view: canvas,
            showFPS: true,
        };

        this.app = new Wrapper(appOptions);
        SimpleSlotScreenSize.width = this.app.initialWidth;
        SimpleSlotScreenSize.height = this.app.initialHeight;
    }

    /**
     * Register game modules
     * @protected
     */
    protected registerModules(): void {
        this.gameModules = [];
        this.registerBackgroundModule();
        this.registerWinningsModule();
        this.registerWheelModule();
        this.registerUserInterfaceModule();
        this.registerMoneyModule();
        this.registerGameLogicModule();
    }

    /**
     * Adds Background module
     * @protected
     */
    protected registerBackgroundModule(): void {
        const bgModule: SimpleSlotBackgroundModule = new SimpleSlotBackgroundModule();
        this.commonSetupModule(bgModule, true);
    }

    /**
     * Adds Wheel module
     * @protected
     */
    protected registerWheelModule(): void {
        const wheelModule: SimpleSlotWheelModule = new SimpleSlotWheelModule();
        this.commonSetupModule(wheelModule, true);
    }

    /**
     * Adds User Interface module
     * @protected
     */
    protected registerUserInterfaceModule(): void {
        const userInterfaceModule: SimpleSlotUserInterfaceModule = new SimpleSlotUserInterfaceModule();
        this.commonSetupModule(userInterfaceModule, true);
    }

    /**
     * Adds Winnings module
     * @protected
     */
    protected registerWinningsModule(): void {
        const winningsModule: SimpleSlotWinningsModule = new SimpleSlotWinningsModule();
        this.commonSetupModule(winningsModule, true);
    }

    /**
     * Adds Money module
     * @protected
     */
    protected registerMoneyModule(): void {
        const moneyModule: SimpleSlotMoneyModule = new SimpleSlotMoneyModule();
        this.commonSetupModule(moneyModule, false);
    }

    /**
     * Adds Game Logic module
     * @protected
     */
    protected registerGameLogicModule(): void {
        const gameLogicModule: SimpleSlotGameLogicModule = new SimpleSlotGameLogicModule();
        this.commonSetupModule(gameLogicModule, false);
    }

    /**
     * Common - Setup a module
     * @param module
     * @param hasView
     * @protected
     */
    protected commonSetupModule(module: SimpleSlotAbstractModule, hasView: boolean = false): void {
        let moduleCanvas: Container;
        if (hasView) {
            moduleCanvas = new Container();
            this.app.stage.addChild(moduleCanvas);
        }
        module.postRegister(moduleCanvas);
        if (hasView) {
            module.shareTicker(this.app.ticker);
        }
        this.gameModules.push(module);
    }

    /**
     * Creates global singletons
     * @protected
     */
    protected createGlobalSingletons(): void {
        this.simpleSlotEventDispatcher = new SimpleSlotEventDispatcher();
        this.simpleSlotResourceLoader = new SimpleSlotResourceLoader();
    }
}
