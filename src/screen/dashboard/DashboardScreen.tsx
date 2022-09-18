import * as React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { RootTabScreenProps } from '@Root/types';

export default function TabOneScreen( { navigation }: RootTabScreenProps<'Dashboard'> ) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashborad Screen</Text>
            <Text style={styles.Subtitle}>This is the initial screen</Text>
        </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    Subtitle: {
        fontSize: 18,
        fontWeight: 'normal',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
} );
