import * as React from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export interface IAbstractBottomSheet {
    containerRef:  React.Ref<BottomSheetMethods>,
    customSnapPoints?: Array<number | string>,
    onCloseHandler?: Function,
    children: Element | React.ReactElement<any, any>,
}
