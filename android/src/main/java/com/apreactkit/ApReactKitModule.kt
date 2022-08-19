package com.apreactkit
import com.adpushup.apmobilesdk.apappkit.ApAppKit
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ApReactKitModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
      return "ApReactKit"
    }

    @ReactMethod
    fun ping(adUnitId: String, adResponseId: String?, callbackType: String?){
      // Creating Map of extra parameters.
      val extras : Map<String?, String?> = mapOf(
        "plugin" to "ApReactKit",
        "callback" to callbackType,
      )
      // Collecting additional data and Sending it to Ap Logger though ApAppKit.
      ApAppKit.ping(reactApplicationContext, adUnitId, adResponseId, extras)
    }
}
