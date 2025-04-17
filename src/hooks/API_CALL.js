async function API_CALL(url) {
  const errMsg = { rndex_error: `api call failed` };
  try {
    // console.log('api try', url);
    // const controller = new AbortController();
    // const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
    // const response = await fetch(url, { signal: controller.signal });
    const response = await fetch(url);
    // console.log('resp', response);
    // console.log('resp ok', response.ok);
    // clearTimeout(timeout);

    if (!response.ok) {
      throw new Error (`Response error: ${response.status}`);
    }
    const json = await response.json();
    return json
  } catch (err) {
    console.log('api catch');
    // console.error("issue", err.name === 'AbortError' ? 'Fetch timed out' : err);
    console.err("issue", err);
    return errMsg
  } 
};

// done, i'm using ios emulator, connect a real device
// not sure if I'll be able to, i use react-native-google-ads and it doesn't work with expo go
// yep just connect your device
// in expo? to pc via usb
// let me find cable :joy, and give required permissions in developer settings
// i did `trust this computer`  phone
// its running on the emulator at the moment why
// unsure, that's just what it opened when you ran the last command is there a way to open developer settings on ios there should be a check like "enable usb debugging and app installing" 
// not that I can find
// i can run this: https://docs.expo.dev/develop/development-builds/create-a-build/#build-the-native-app-ios-device
// but apple doesn't let you attach and debug from what I can tell
// seems to be running it there now
// approved it on my phone
// yep apple is weird tbh, fair. trying again
// i already have a released version of the app on my phone, will that interfere it?  probably yes cuz now we re installing this version to phone
// name:uhh, error:Device is busy (Waiting to reconnect to uhh)
// how do i let it go? I hit trust this computer and put my pin in
// hmmm i wish i could remove it without deleting the data on it, i store data locally it will overwrite, if wecan fix that uhh problem
// uhh is the name of the iphone lol
// let me test on my ipad one second
// i mean it says device is busy can you send me this -> /Users/poxford3/Documents/coding/RNDex/.expo/xcodebuild.log
/* 
Command line invocation:
    /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild -workspace /Users/poxford3/Documents/coding/RNDex/ios/RNDex.xcworkspace -configuration Debug -scheme RNDex -destination id=00008110-001E5CDA369B801E
*/

// thats all thats in there, hmm can you close all running apps in your phone
// just did, rerunning. for some reason the ipad didn't show up in the device list. it may be too old actually we need iphone
// same error. i can try deleting the app. :(
// hmm didn't fix it either, but i'll leave it removed for the time being
// isnt there any xcode process running on your device ?
// let me check, i doubt it
// nope, searched xcode in activity monitor and nothing showed up, isnt it running right
// just closed the simulators, maybe that was hangin git up ?! you agreed that device-pc connection right
// yes i have my phone plugged into the docking station, when I unplug my phone, it stops showing up in that list you showed
// hmm, lol
// it opened on simulator
// yes its showing up in my file explorer
// is it showing on xcode
// just opening it, yes it's showing up, can you build it in xcode for your iphone damn whatever :D
// the build failed with 131 issues lol then something is wrong :joy:
// if you want, i can go play with it for a bit to see if i can get it to build with xcode then ping you
/*

now we can just make new lines in here, not sure why i didnt think of this sooner
 LOG  resp ok true

HEY ?

hi, how you see that it stops working
the api call will stop working and the loading screen will just spin
with my luck, it won't work on device so it could be a simulator issue,
lets wait until it crashes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ... . . boom

lol okay

*/
export default API_CALL;

// test endpoint: const url = "https://fake-json-api.mock.beeceptor.com/users"