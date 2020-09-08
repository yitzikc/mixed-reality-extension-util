import {
    getParameterLastValue,
    getParameterAllValues,
    getBooleanOption
} from '..';

test('test get-last-parameter', () => {
    expect(getParameterLastValue({
        im: '1.jpg',
        vi: '4'
    }, 'im')).toBe('1.jpg');

    expect(getParameterLastValue({
        im: '1.jpg'
    }, 'i')).toBe('');

    expect(getParameterLastValue({
        sn: '1.mp3',
        im: '1.jpg'
    }, 'sn', 'default.mp3')).toBe('1.mp3');

    expect(getParameterLastValue({
        im: '1.jpg',
        vi: '4'
    }, 'sn', 'default.mp3')).toBe('default.mp3');

    expect(getParameterLastValue({
        im: ['1.jpg', 'other.jpg'],
        vi: '44'
    }, 'im', 'default.jpg')).toBe('other.jpg');

});

test('get parameter all values', () => {
    const params = {
        a: "asdf",
        b: ["one", "two"]
    };

    expect(getParameterAllValues(params, "a")).toStrictEqual(["asdf"]); 
    expect(getParameterAllValues(params, "b")).toStrictEqual(["one", "two"]);
    expect(getParameterAllValues(params, "p")).toStrictEqual([]);   
});

test('test get boolean option', () => {
    [
        "Yes",
        "Y",
        "true",
        "yes   ",
        "  TRUE   ",
        "1"
    ].forEach((value) => {
        const params = {
            various: [ "this", "and", "that" ],
            Boolean: value
        }
        expect(getBooleanOption(params, "Boolean")).toBe(true);
    }, "Yes explicitly given");

    [
        "No",
        "n",
        "False",
        "no   ",
        "false   ",
        "maybe",
        "0",
        "   FALSE"
    ].forEach((value) => {
        const params = {
            various: [ "this", "and", "that" ],
            Boolean: value
        }
        expect(getBooleanOption(params, "Boolean")).toBe(false);
    });

    expect(getBooleanOption({
        other: "whatever"
    }, "Boolean", true)).toBe(true);

    expect(getBooleanOption({
        other: "whatever",
        Boolean: ""
    }, "Boolean", true)).toBe(true);

    // The options are case sensitive
    expect(getBooleanOption({
        "boolean": "Y"
    }, "Boolean", false)).toBe(false);

});
