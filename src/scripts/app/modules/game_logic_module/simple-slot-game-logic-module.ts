/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotEndGameDecisionProxy} from "app/modules/game_logic_module/proxy/simple-slot-end-game-decision-proxy";
import {SimpleSlotAbstractModule} from "app/utils/abstracts/simple-slot-abstract-module";

export class SimpleSlotGameLogicModule extends SimpleSlotAbstractModule {
    /**
     * @inheritDoc
     * @protected
     */
    protected createProxy(): void {
        this.proxy = new SimpleSlotEndGameDecisionProxy();
    }
}
