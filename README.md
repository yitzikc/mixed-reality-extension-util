# mixed-reality-extension-util

Utilities to help developing Node.JS applications which integrate with virtual worlds
using [Microsoft's Mixed Reality Extension SDK](https://www.npmjs.com/package/@microsoft/mixed-reality-extension-sdk).

## Parameter-set Util

Utility functions for reading arguments passed to the application via query parameters. Examples:

```typescript
// Get a string argument, with a default value
const soundFilePath = getParameterLastValue(params, 'sf', 'alarm.ogg');

// Get a string argument, with the default ''
const name  = getParameterLastValue(params, 'name');

// Get all the instances of a parameter as an array
const users = getParameterAllValues(params, 'user'))

// Get a boolean parameter, defaulting to true
const modsOnly = getBooleanOption(params, 'mo', true);

// Get a color value from an RGB hexvalue, which the default being #304050
// The returned value may be with alpha (Color4) or without (color3)
const userColor = getColorOption(params, 'col', '304050');
```

## Playing Media

A wrapper around the *MediaInstance* class, simplifying the action of stopping playback and changing the volume.
An example for video, assuming *playingActor* is an actor already defined: 

```typescript
const args = { paused: true, volume: 0.5}
const video = this.mediaAssets.createVideoStream(args.uri, { uri: userUri });
let playingVideo = new PlayingMedia(
    playingActor.startVideoStream(video.id, args), args);

assert(playingVideo.isLoaded && playingVideo.isPaused);
playingVideo.resume();
assert(! playingVideo.isPaused);

// Raise the volume by 25%:
playingVideo.changeVolume(25);
console.log('Current volume: %f', playingVideo.currentVolume);
// Current volume: 0.625

// Cap volume at 1
playingVideo.changeVolume(75);
console.log('Current volume: %f', playingVideo.currentVolume);
// Current volume: 1

playingVideo.changeVolume(-50);
console.log('Current volume: %f', playingVideo.currentVolume);
// Current volume: 0.5

// Stop
playingVideo.stop();
assert(! playingVideo.isLoaded);
assert(playingVideo.currentVolume === undefined);
```
