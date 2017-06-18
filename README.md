To build:

1. package js files using this command:
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

2. increment the version code in the manifest

3. In Android Studio, generate a signed APK
