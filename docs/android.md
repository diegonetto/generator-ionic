## Android Walkthrough

Research & Contribution by @ltfschoen (Luke Schoen)



- Install Generator Ionic

```

npm cache clear

npm install -g generator-ionic

mkdir my-ionic-project && cd $_

yo ionic

```

- Execute the following command in Terminal program to run a web server on your localhost. This will automatically open a tab in your default web browser at the following address and load your app http://127.0.0.1:9000/

```

grunt serve

```

- Now we want to emulate your app on an Android Virtual Device (AVD). Start by downloading the latest [Android SDK](https://developer.android.com/sdk/index.html#download)

- On a Mac OS, extract downloaded ZIP file to an installation directory (i.e. /Applications/adt-bundle-mac-x86_64-20140702/). Note that the folder should match the name of the downloaded ZIP file adt-bundle-mac-x86_64-20140702.zip

- Update the Bash Profile document to include PATH environment variables to the Android SDK platform-tools and tools directory so the 'android' command may be executed regardless of your present working directory in the Terminal program. Note: This step may be necessary in order to allow you to use the 'android' command and avoid encountering the following error:

```

[Error: The command android failed. Make sure you have the latest Android SDK installed, and the android command (inside the tools/ folder) added to your path. Output: /bin/sh: android: command not found ]

```

- Execute the following command in the Terminal program to edit your Bash Profile document:

```

touch ~/.bash_profile; open ~/.bash_profile

```

- Copy and Paste the following at the top of the file (without removing existing data within the file). Replace all instances of adt-bundle-mac-x86_64-20140702 that are shown below with the filename of the ZIP file that you downloaded. Save and close the file.

```

export PATH=/user/local/bin:$PATH

export PATH=$PATH:/Applications/adt-bundle-mac-x86_64-20140702/sdk/tools

export PATH=${PATH}:/Applications/adt-bundle-mac-x86_64-20140702/sdk/tools:/Applications/adt-bundle-mac-x86_64-20140702/sdk/tools

```

- Execute the updated Bash Profile with the following command in the Terminal program to update the PATH:

```

source ~/.bash_profile

```

- Execute the following command in Terminal program to install Apache Ant using Homebrew

```

brew install ant

```

- Note: The above step may be necessary to avoid encountering the following error:

```

Error: ERROR : executing command 'ant', make sure you have ant installed and added to your path.

```

- Execute the following command in Terminal program to open the Android Package Manager (APM):

```

android

```

- In the APM, expand Android 4.4.2 (API 19). Click checkboxes to install "SDK Platform" and "ARM EABI v7A System Image". Click "Install Packages..."

- Go to the Android SDK Manager menu in the top left of your screen. Click the "Tools" dropdown menu. Click "Manage AVDs...". This opens the AVD (Android Virtual Device) Manager. Click to select the device listed (i.e. default is AVD_for_Nexus Android 4.4.2). Click the "Repair..." Button on the right panel. Click the "Refresh" Button at the bottom right. Close the window.

- Execute the following command in Terminal program to install the Android Debug Bridge:

```

brew install android-platform-tools

```

- Note: The above steps may be necessary to avoid encountering the following errors:

```

Error: Please install Android target 19 (the Android newest SDK). Make sure you have the latest Android tools installed as well. Run "android" from your command-line to install/update any missing SDKs or tools.

Error executing "adb devices": /bin/sh: adb: command not found

emulator: ERROR: This AVD's configuration is missing a kernel file!!

```

- Add the Android Platform with the following commands in Terminal program. No warnings or errors should be encountered. Note that it may take a while to load your app in the Android emulator.

```

grunt platform:add:android

grunt build

grunt emulate:android

```
