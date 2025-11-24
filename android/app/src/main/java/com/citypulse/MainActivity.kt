package com.citypulse

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.zoontek.rnbootsplash.RNBootSplash

class MainActivity : ReactActivity() {

  // Name of the main JS component
  override fun getMainComponentName(): String = "CityPulse"

  // New architecture delegate (Fabric flag)
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    // Initialize the splash screen
    RNBootSplash.init(this, R.style.BootTheme)

    // Recommended pattern for RN
    super.onCreate(null)
  }
}
