import { getParameterLastValue } from '..';

test('test-get-last-parameter', () => {
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
