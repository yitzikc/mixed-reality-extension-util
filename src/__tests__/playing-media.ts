import {
    PlayingMedia
} from '..';


test('test volume-up-down', () => {
    const pm = new PlayingMedia(undefined, { volume: 0.5});
    expect(pm.currentVolume).toEqual(0.5);
    pm.changeVolume(25);
    expect(pm.currentVolume).toEqual(0.625);
    pm.changeVolume(-20);
    expect(pm.currentVolume).toEqual(0.5);
    pm.changeVolume(50);
    expect(pm.currentVolume).toEqual(0.75);
    pm.changeVolume(50);
    expect(pm.currentVolume).toEqual(1);
    pm.changeVolume(10);
    expect(pm.currentVolume).toEqual(1);
    pm.changeVolume(-20);
    expect(pm.currentVolume).toEqual(0.8);
    pm.setState({volume: 0.5});
    expect(pm.currentVolume).toEqual(0.5);
    pm.changeVolume(-100);
    expect(pm.currentVolume).toEqual(0);
});

test('test start-stop-pause', () => {
    const pm = new PlayingMedia();
    expect(pm.isPaused).toBe(false);
    pm.pause();
    expect(pm.isPaused).toBe(true);
    pm.resume();
    expect(pm.isPaused).toBe(false);
    pm.resume();
    expect(pm.isPaused).toBe(false);

    pm.setState({paused: true, volume: 1});
    expect(pm.currentVolume).toEqual(1);
    expect(pm.isPaused).toBe(true);

    pm.stop();
    expect(pm.isLoaded).toBe(false);
    expect(pm.currentVolume).toBe(undefined);
    expect(pm.isPaused).toBe(false);
});
