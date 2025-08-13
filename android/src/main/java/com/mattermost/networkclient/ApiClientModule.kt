package com.mattermost.networkclient

import com.facebook.fbreact.specs.NativeApiClientSpec
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import java.io.IOException
import java.util.Timer
import java.util.TimerTask

class ApiClientModule(reactContext: ReactApplicationContext) : NativeApiClientSpec(reactContext) {
    private var implementation: ApiClientModuleImpl = ApiClientModuleImpl(reactContext)
    private var storeId = ""
    private var vendorId = ""
    private var accessToken = ""
    private var host = "https://api.waisongbang.com/"
    private var uniqueId = ""
    private var version = ""

    private var heartTimerTask: TimerTask? = null
    private var heartTimer: Timer? = null

    override fun getName(): String = ApiClientModuleImpl.NAME

    override fun addListener(eventType: String?) {
        // Keep: Required for RN built in Event Emitter Calls
    }

    override fun removeListeners(count: Double) {
        // Keep: Required for RN built in Event Emitter Calls
    }

    override fun head(
        baseUrl: String?,
        endpoint: String?,
        options: ReadableMap?,
        promise: Promise?
    ) {
        if (baseUrl.isNullOrEmpty() || endpoint.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("invalid HEAD request"))
            return
        }
        implementation.head(baseUrl, endpoint, options, promise)
    }

    override fun get(
        baseUrl: String?,
        endpoint: String?,
        options: ReadableMap?,
        promise: Promise?
    ) {
        if (baseUrl.isNullOrEmpty() || endpoint.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("invalid GET request"))
            return
        }
        implementation.get(baseUrl, endpoint, options, promise)
    }

    override fun put(
        baseUrl: String?,
        endpoint: String?,
        options: ReadableMap?,
        promise: Promise?
    ) {
        if (baseUrl.isNullOrEmpty() || endpoint.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("invalid PUT request"))
            return
        }
        implementation.put(baseUrl, endpoint, options, promise)
    }

    override fun post(
        baseUrl: String?,
        endpoint: String?,
        options: ReadableMap?,
        promise: Promise?
    ) {
        if (baseUrl.isNullOrEmpty() || endpoint.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("invalid POST request"))
            return
        }
        implementation.post(baseUrl, endpoint, options, promise)
    }

    override fun patch(
        baseUrl: String?,
        endpoint: String?,
        options: ReadableMap?,
        promise: Promise?
    ) {
        if (baseUrl.isNullOrEmpty() || endpoint.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("invalid PATCH request"))
            return
        }
        implementation.patch(baseUrl, endpoint, options, promise)
    }

    override fun methodDelete(
        baseUrl: String?,
        endpoint: String?,
        options: ReadableMap?,
        promise: Promise?
    ) {
        if (baseUrl.isNullOrEmpty() || endpoint.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("invalid DELETE request"))
            return
        }
        implementation.delete(baseUrl, endpoint, options, promise)
    }

    override fun upload(
        baseUrl: String?,
        endpoint: String?,
        fileUrl: String?,
        taskId: String?,
        options: ReadableMap?,
        promise: Promise?
    ) {
        if (baseUrl.isNullOrEmpty() || endpoint.isNullOrEmpty() || fileUrl.isNullOrEmpty() || taskId.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("invalid upload request"))
            return
        }
        implementation.upload(baseUrl, endpoint, fileUrl, taskId, options, promise)
    }

    override fun download(
        baseUrl: String?,
        endpoint: String?,
        filePath: String?,
        taskId: String?,
        options: ReadableMap?,
        promise: Promise?
    ) {
        if (baseUrl.isNullOrEmpty() || endpoint.isNullOrEmpty() || filePath.isNullOrEmpty() || taskId.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("invalid download request"))
            return
        }
        implementation.download(baseUrl, endpoint, filePath, taskId, options, promise)
    }

    override fun cancelRequest(taskId: String?, promise: Promise?) {
        if (taskId.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("invalid request cancellation"))
            return
        }
        implementation.cancelRequest(taskId, promise)
    }

    override fun createClientFor(baseUrl: String?, config: ReadableMap?, promise: Promise?) {
        if (baseUrl.isNullOrEmpty() || config == null || promise == null) {
            promise?.reject(Exception("missing parameters to create a client"))
            return
        }
        implementation.createClientFor(baseUrl, config, promise)
    }

    override fun getClientHeadersFor(baseUrl: String?, promise: Promise?) {
        if (baseUrl.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("missing parameters to get the headers for the client"))
            return
        }
        implementation.getClientHeadersFor(baseUrl, promise)
    }

    override fun addClientHeadersFor(baseUrl: String?, headers: ReadableMap?, promise: Promise?) {
        if (baseUrl.isNullOrEmpty() || headers == null || promise == null) {
            promise?.reject(Exception("missing parameters to add headers to the client"))
            return
        }
        implementation.addClientHeadersFor(baseUrl, headers, promise)
    }

    override fun importClientP12For(
        baseUrl: String?,
        path: String?,
        password: String?,
        promise: Promise?
    ) {
        if (baseUrl.isNullOrEmpty() || path.isNullOrEmpty() || password == null || promise == null) {
            promise?.reject(Exception("missing parameters to import certificate for client"))
            return
        }
        implementation.importClientP12For(baseUrl, path, password, promise)
    }

    override fun invalidateClientFor(baseUrl: String?, promise: Promise?) {
        if (baseUrl.isNullOrEmpty() || promise == null) {
            promise?.reject(Exception("missing parameters to invalidate the client"))
            return
        }
        implementation.invalidateClientFor(baseUrl, promise)
    }

    override fun setStoreInfo(
        storeId: String?,
        vendorId: String?,
        accessToken: String?,
        host: String?,
        uniqueId: String?,
        version: String?
    ) {
        this.storeId = storeId ?: ""
        this.vendorId = vendorId ?: ""
        this.accessToken = accessToken ?: ""
        this.host = host ?: ""
        this.uniqueId = uniqueId ?: ""
        this.version = version ?: ""
        implementation.setStoreInfo(
            this.storeId,
            this.vendorId,
            this.accessToken,
            this.host,
            this.uniqueId,
            this.version
        )
        if (this.host.isNotEmpty())
            implementation.createClientFor(this.host)
    }

    private fun handleHeartBeatError(e: IOException) {
        emitOnHeartBeatError(e.toString())
    }

    override fun initialize() {
        super.initialize()
        implementation.createClientFor(host)
        if (heartTimerTask == null) {
            heartTimerTask = object : TimerTask() {
                override fun run() {
                    if (accessToken.isNotEmpty() && storeId.isNotEmpty())
                        implementation.uploadHeartBeat(::handleHeartBeatError)
                }
            }
        }
        if (heartTimer == null) {
            heartTimer = Timer()
        }
        heartTimer?.schedule(heartTimerTask, 0, 60 * 1000)
    }

    override fun invalidate() {
        super.invalidate()

        heartTimer?.cancel()
        heartTimer?.purge() // 移除所有已取消的任务
        heartTimer = null

        heartTimerTask?.cancel()
        heartTimerTask = null
    }

}
