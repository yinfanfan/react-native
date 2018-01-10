#建议先删除android - app下面的build文件夹（不然可能出现无法删除android - app - build - resvalue的情况）

#cd android

#gradle clean

#./gradlew.bat assembleRelease

之后等待打包完毕即可。
打包完毕之后，将android - app - build - outputs - apk — app-release.apk发送到android手机端即可安装

如果出现：
unable to process incoming event 'ProcessComplete'  <ProgressCompleteEvent>这种错误
需要在在混淆文件proguard-rules.pro中加入
-keep class android.text {* ;}
-dontwarn android.text.*
然后用  ./gradlew.bat assembleRelease --console plain 代替 ./gradlew.bat assembleRelease 命令，同时
在混淆文件里面加入以上代码，注意在打包之前，使用gradle clean清理一下配置信息。
