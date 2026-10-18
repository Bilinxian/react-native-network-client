package com.mattermost.networkclient

import com.facebook.react.bridge.ReadableMap
import okhttp3.CookieJar
import okhttp3.HttpUrl
import java.net.URI

internal class NetworkClient(baseUrl: HttpUrl? = null, options: ReadableMap? = null, cookieJar: CookieJar? = null): NetworkClientBase(baseUrl) {
    constructor(webSocketUri: URI, baseUrl: HttpUrl, options: ReadableMap? = null) : this(baseUrl, options) {
        this.webSocketUri = webSocketUri
    }

    init {
        if (baseUrl == null) {
            applyGenericClientBuilderConfiguration()
        } else {
            applyClientBuilderConfiguration(options, cookieJar)
        }

        okHttpClient = builder.build()
    }

    override fun applyGenericClientBuilderConfiguration() {
        super.applyGenericClientBuilderConfiguration()
        applyFlipperInterceptor()
    }

    override fun applyClientBuilderConfiguration(options: ReadableMap?, cookieJar: CookieJar?) {
        super.applyClientBuilderConfiguration(options, cookieJar)
        applyFlipperInterceptor()
    }

    private fun applyFlipperInterceptor() {

    }
}
