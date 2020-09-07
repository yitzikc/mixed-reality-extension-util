import {
    getParameterLastValue,
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

test('test get boolean option', () => {
    [
        "Yes",
        "Y",
        "yesssss",
        "yes!   ",
        "y     ",
        "y"
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
        "no!!!!",
        "no   ",
        "N     ",
        "maybe"
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

    // The options are case sensitive
    expect(getBooleanOption({
        "boolean": "Y"
    }, "Boolean", false)).toBe(false);

});
