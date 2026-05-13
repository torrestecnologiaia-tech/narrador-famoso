package com.narradorfamoso

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.chaquo.python.Python

class PythonModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "PythonModule"
    }

    @ReactMethod
    fun callPython(moduleName: String, functionName: String, argsJson: String, promise: Promise) {
        try {
            val py = Python.getInstance()
            val module = py.getModule(moduleName)
            val result = module.callAttr(functionName, argsJson)
            promise.resolve(result.toString())
        } catch (e: Exception) {
            promise.reject("PYTHON_ERROR", e.message)
        }
    }
}
