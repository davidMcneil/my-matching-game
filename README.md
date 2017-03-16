# My Matching Game
A simple Android app developed using React Native. Available for download [here](https://play.google.com/store/apps/details?id=com.mymatchinggame).

## Useful Commands

> react-native start

> react-native run-android

> adb reverse tcp:8081 tcp:8081

> adb shell input keyevent 82

> echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_watches && echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_queued_events && echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_instances && watchman shutdown-server && sudo sysctl -p
