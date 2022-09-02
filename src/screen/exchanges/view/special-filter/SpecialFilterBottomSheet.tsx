import * as React from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { IAbstractBottomSheet } from "../../model/ui/IAbstractBottomSheet";


/**
 * FRE - bottom-sheet including datepicker for iOS only
 *
 * @param superProps
 * @constructor
 */
export default function ExchangeSpecialBottomSheet(superProps: IAbstractBottomSheet) {

  const {customSnapPoints, onCloseHandler} = superProps;

  // variables
  const snapPoints = React.useMemo(() => customSnapPoints ?? [400], []);

  // renders
  return (
    <BottomSheet
      onClose={()=> {onCloseHandler ? onCloseHandler(null) : () => null;}}
      ref={superProps.containerRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={
        React.useCallback((props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ), [])}
    >
      {React.useMemo(() => superProps.children, [])}
    </BottomSheet>
  );
}

