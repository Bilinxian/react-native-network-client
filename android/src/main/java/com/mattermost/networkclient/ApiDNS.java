package com.mattermost.networkclient;

import android.util.Log;

import androidx.annotation.NonNull;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Dns;

public class ApiDNS implements Dns {

//    private final DnsManager dns;

    public ApiDNS() {
//        IResolver[] resolvers = new IResolver[4];
//        resolvers[0] = new DnsUdpResolver("223.5.5.5"); //自定义 DNS 服务器地址
//        resolvers[1] = new DnsUdpResolver("119.29.29.29"); //自定义 DNS 服务器地址
//        resolvers[2] = new DnsUdpResolver("114.114.114.114"); //自定义 DNS 服务器地址
//        resolvers[3] = new DnsUdpResolver("180.76.76.76"); //自定义 DNS 服务器地址
//        dns = new DnsManager(NetworkInfo.normal, resolvers);

    }

    @NonNull
    @Override
    public List<InetAddress> lookup(@NonNull String hostname) {
        List<InetAddress> singletonList  = getResultFail(hostname);
//        try {
//            Record[] records = dns.queryRecords(hostname);
//            for (Record record : records) {
//                Log.i("TAG", "happy dns解析的地址：" + record);
//                singletonList.add(getAddress(hostname, record.value));
//            }
//            if (singletonList.isEmpty())
//                singletonList = getResultFail(hostname);
//
//        } catch (IOException e) {
//            singletonList = getResultFail(hostname);
//        }
        Log.i("TAG", "最终dns解析的地址：" + singletonList);
        return singletonList;
    }

    private List<InetAddress> getResultFail(String hostname) {
        List<InetAddress> singletonList = new ArrayList<>();
        InetAddress ipAddress;
        try {
            singletonList = Dns.SYSTEM.lookup(hostname);
        } catch (UnknownHostException e) {
            switch (hostname) {
                case "api.waisongbang.com":
                    ipAddress = getAddress(hostname, "39.96.80.175");
                    if (null != ipAddress)
                        singletonList.add(ipAddress);
                    break;
                case "im.waisongbang.com":
                case "yy.waisongbang.com":
                case "product-service.waisongbang.com":
                    ipAddress = getAddress(hostname, "47.93.170.207");
                    if (null != ipAddress)
                        singletonList.add(ipAddress);
                    break;
            }
        }

        return singletonList;
    }

    private InetAddress getAddress(String hostname, String ip) {
        try {
            InetAddress ipAddress = InetAddress.getByName(ip);
            byte[] ipBytes = ipAddress.getAddress();
            return InetAddress.getByAddress(hostname, ipBytes);
        } catch (UnknownHostException e) {
            return null;
        }
    }

}
