package com.mattermost.networkclient

import com.facebook.flipper.plugins.network.NetworkFlipperPlugin
import com.facebook.react.modules.network.OkHttpClientFactory
import com.mattermost.networkclient.interceptors.RCTClientRequestInterceptor
import okhttp3.OkHttpClient

class RCTOkHttpClientFactory : OkHttpClientFactory {
    companion object {
        var flipperPlugin: NetworkFlipperPlugin? = null
    }
    override fun createNewNetworkModuleClient(): OkHttpClient {
        return OkHttpClient()
            .newBuilder()
            .cookieJar(ApiClientModuleImpl.cookieJar)
            .addInterceptor(RCTClientRequestInterceptor())
            .build()
    }
}
