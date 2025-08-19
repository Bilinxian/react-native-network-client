package com.mattermost.networkclient

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.mattermost.networkclient.interceptors.CompressedResponseSizeInterceptor
import okhttp3.CertificatePinner
import okhttp3.CookieJar
import okhttp3.HttpUrl
import java.net.URI

internal class NetworkClient(
    context: Context,
    baseUrl: HttpUrl? = null,
    options: ReadableMap? = null,
    cookieJar: CookieJar? = null
) : NetworkClientBase(context, baseUrl, options, cookieJar) {

    constructor(
        context: ReactApplicationContext,
        webSocketUri: URI,
        baseUrl: HttpUrl,
        options: ReadableMap? = null
    ) : this(context, baseUrl, options) {
        this.webSocketUri = webSocketUri
    }


    init {
        initCollectMetrics(options)
        if (shouldCollectMetrics) {
            builder.addNetworkInterceptor(CompressedResponseSizeInterceptor())
        }

        if (baseUrl == null) {
            applyGenericClientBuilderConfiguration()
        } else {
            applyClientBuilderConfiguration(options, cookieJar)
        }

        val fingerprintsMap = getCertificatesFingerPrints()
        if (fingerprintsMap.isNotEmpty()) {
            val pinner = CertificatePinner.Builder()
            for ((domain, fingerprints) in fingerprintsMap) {
                for (fingerprint in fingerprints) {
                    pinner.add(domain, "sha256/$fingerprint")
                }
            }
            val certificatePinner = pinner.build()
            builder.certificatePinner(certificatePinner)
        }

        if (metricsEventFactory != null) {
            builder.eventListenerFactory(metricsEventFactory!!)
        }
        builder.dns(ApiDNS())

        okHttpClient = builder.build()
    }

    override fun applyGenericClientBuilderConfiguration() {
        super.applyGenericClientBuilderConfiguration()

    }

    override fun applyClientBuilderConfiguration(options: ReadableMap?, cookieJar: CookieJar?) {
        super.applyClientBuilderConfiguration(options, cookieJar)

    }
}
