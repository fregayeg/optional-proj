/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// declare global {
//     namespace ReactNavigation {
//         interface RootParamList extends RootStackParamList {}
//     }
// }

export type MockRootStackParamList = {
    MockRoot: NavigatorScreenParams<MockRootTabParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof MockRootStackParamList> = NativeStackScreenProps<
    MockRootStackParamList,
    Screen
    >;

export type MockRootTabParamList = {
    FakeScreen: undefined;
    Reimbursements: undefined;
};

export type MockRootTabScreenProps<Screen extends keyof MockRootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<MockRootTabParamList, Screen>,
    NativeStackScreenProps<MockRootStackParamList>
    >;
