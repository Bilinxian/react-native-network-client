package com.mattermost.networkclient.interfaces

import com.mattermost.networkclient.retriesExhausted
import okhttp3.Interceptor
import okhttp3.Response
import java.io.IOException
import java.util.concurrent.TimeUnit

interface RetryInterceptor : Interceptor {
    val retryLimit: Double
    val retryMethods: Set<String>
    val retryStatusCodes: Set<Int>

    companion object {
        const val defaultRetryLimit = 2.0
        val defaultRetryStatusCodes = setOf(408, 500, 502, 503, 504)
        val defaultRetryMethods = setOf("GET", "PATCH", "POST", "PUT", "DELETE")
    }

    fun getWaitInterval(attempts: Int): Long

    @Throws(IOException::class)
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        var response = chain.proceed(request)
        var attempts = 1;

        while (!response.isSuccessful
                && attempts <= retryLimit
                && retryStatusCodes.contains(response.code)
                && retryMethods.contains(request.method.toUpperCase())) {
            runCatching { response.close() }
            TimeUnit.MILLISECONDS.sleep(getWaitInterval(attempts))
            attempts++;

            response = chain.proceed(request)
        }

        if (attempts >= retryLimit) {
            response.retriesExhausted = true
        }

        return response;
    }
}
