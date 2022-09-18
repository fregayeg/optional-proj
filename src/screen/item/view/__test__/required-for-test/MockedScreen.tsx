import * as React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export const FAKE_SCREEN = "Fake screen";

/**
 * This is a fake screen dedicated for tests
 * @constructor
 */
export default function MockedScreen() {
    const [componentMounted, setComponentMount] = React.useState<boolean>(false);

    React.useEffect(() =>  {
        setComponentMount(true);
    },[])
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{FAKE_SCREEN}</Text>
            {componentMounted}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
