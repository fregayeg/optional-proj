
/**
 * FRE - this can be useful to transform all elements of an array 
 * into another format. 
 * @param transformFunction
 * @param arr
 */
export function map (transformFunction: Function, arr: Array<unknown>): Array<any> {

    return arr.reduce(
        function (newArr: Array<unknown>, item,idx) {
            newArr.push(transformFunction(item,idx));
            return newArr;
        }, []);
}
