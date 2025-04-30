package com.mattermost.networkclient;

import android.util.Log;

import androidx.annotation.NonNull;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Collections;
import java.util.List;

import okhttp3.Dns;

public class ApiDNS implements Dns {
    @NonNull
    @Override
    public List<InetAddress> lookup(@NonNull String hostname) throws UnknownHostException {
        List<InetAddress> singletonList;
        try {
            Log.i("ApiDNS", "请求的服务器域名：" + hostname);
            switch (hostname) {
                case "api.waisongbang.com":
                case "www.cainiaoshicai.cn":
                    singletonList = Collections.singletonList(getAddress(hostname, "39.96.80.175"));
                    Log.d("ApiDNS", "服务器IP：" + singletonList);
                    return singletonList;
                case "im.waisongbang.com":
                case "yy.waisongbang.com":
                case "product-service.waisongbang.com":
                    singletonList = Collections.singletonList(getAddress(hostname, "47.93.170.207"));
                    Log.d("ApiDNS", "服务器IP：" + singletonList);
                    return singletonList;
            }
        } catch (UnknownHostException ignored) {
        }
        singletonList = Dns.SYSTEM.lookup(hostname);
        Log.d("ApiDNS", "系统获取到服务器IP：" + singletonList);
        return singletonList;
    }

    private InetAddress getAddress(String hostname, String ip) throws UnknownHostException {
        byte[] ipBytes = InetAddress.getByName(ip).getAddress();
        return InetAddress.getByAddress(hostname, ipBytes);
    }

}
