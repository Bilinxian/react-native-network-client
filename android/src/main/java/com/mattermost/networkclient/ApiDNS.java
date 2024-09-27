package com.mattermost.networkclient;

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

        try {
            switch (hostname) {
                case "api.waisongbang.com":
                case "www.cainiaoshicai.cn":
                    return Collections.singletonList(InetAddress.getByName("39.96.80.175"));
                case "im.waisongbang.com":
                case "yy.waisongbang.com":
                case "product-service.waisongbang.com":
                    return Collections.singletonList(InetAddress.getByName("47.93.170.207"));
            }
        } catch (UnknownHostException ignored) {

        }
        return Dns.SYSTEM.lookup(hostname);
    }

}
