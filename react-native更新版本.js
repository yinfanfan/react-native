import {
    Alert,
    Platform,
    Linking
  } from 'react-native'
  
  import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess
  } from 'react-native-update'
  
  
  import _updateConfig from '../../update.json'
  const { appKey } = _updateConfig[Platform.OS]
  const { appId } = _updateConfig[Platform.OS]
  
  const prod_id = {
    "ios" : 10204,
    "android" : 10205
  }
  
  
  export default {
    doUpdate(info) {
      downloadUpdate(info).then(hash => {
        Alert.alert('温馨提示', '下载完毕, 是否重启应用以完成更新?', [
          { text: '是', onPress: () => { switchVersion(hash) } },
          { text: '下次启动时', onPress: () => { switchVersionLater(hash) } },
        ])
      }).catch(err => {
        Alert.alert('温馨提示', '更新失败，您稍后可以手动检查更新')
      })
    },
  
    checkUpdate(manual = false) {
      return checkUpdate(appKey).then(info => {
      //   if (isFirstTime) {
      //     markSuccess();
      //     Alert.alert('提示', 'sucdess');
      //  // }
      //  } else if (isRolledBack) {
      //    Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
      //  }else{
      //    Alert.alert('提示', 'none.');
      //  }
  
        delete info.pdiffUrl
  
        if (info.expired) {
          Alert.alert('温馨提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
            { text: '确定', onPress: () => { info.downloadUrl && Linking.openURL(info.downloadUrl) } },
            // { text: '确定', onPress: () => { Linking.openURL('https://fir.im/j1g3') } },
          ])
        } else if (info.upToDate) {
          if (manual) {
            Alert.alert('温馨提示', '您的应用版本已是最新 V' + packageVersion + '.')
          }
        } else if (info.update) {
          if (manual) {
            Alert.alert('温馨提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
              { text: '是', onPress: () => { this.doUpdate(info) } },
              { text: '否', },
            ])
          } else {
            // 打开app后台下载热更新
            this.doUpdate(info);
          }
        }
      }).catch(err => {
        Alert.alert('温馨提示', '更新失败.')
      })
    },
  
    isDebugApp() {
      return !(appId == prod_id[Platform.OS])
    }
  }
  
