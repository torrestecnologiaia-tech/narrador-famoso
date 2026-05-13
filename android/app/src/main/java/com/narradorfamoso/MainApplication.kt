package com.narradorfamoso

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.chaquo.python.Python
import com.chaquo.python.android.AndroidPlatform

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
          add(PythonPackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    if (!Python.isStarted()) {
        Python.start(AndroidPlatform(this))
    }
    loadReactNative(this)
  }
}
