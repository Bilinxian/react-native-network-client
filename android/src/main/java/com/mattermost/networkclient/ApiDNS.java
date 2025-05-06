package com.mattermost.networkclient;

import android.util.Log;

import androidx.annotation.NonNull;

import com.qiniu.android.dns.DnsManager;
import com.qiniu.android.dns.IResolver;
import com.qiniu.android.dns.NetworkInfo;
import com.qiniu.android.dns.Record;
import com.qiniu.android.dns.dns.DnsUdpResolver;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import okhttp3.Dns;

public class ApiDNS implements Dns {

    private final DnsManager dns;

    public ApiDNS() {
        IResolver[] resolvers = new IResolver[4];
        resolvers[0] = new DnsUdpResolver("223.5.5.5"); //自定义 DNS 服务器地址
        resolvers[1] = new DnsUdpResolver("119.29.29.29"); //自定义 DNS 服务器地址
        resolvers[2] = new DnsUdpResolver("114.114.114.114"); //自定义 DNS 服务器地址
        resolvers[3] = new DnsUdpResolver("180.76.76.76"); //自定义 DNS 服务器地址
        dns = new DnsManager(NetworkInfo.normal, resolvers);

    }

    @NonNull
    @Override
    public List<InetAddress> lookup(@NonNull String hostname) {
        List<InetAddress> singletonList = new ArrayList<>();
        try {
            Record[] records = dns.queryRecords(hostname);
            for (Record record : records) {
                Log.i("TAG", "happy dns解析的地址：" + record);
                singletonList.add(getAddress(hostname, record.value));
            }
            if (singletonList.isEmpty())
                singletonList = getResultFail(hostname);

        } catch (IOException e) {
            e.printStackTrace();
            singletonList = getResultFail(hostname);
        }
        Log.i("TAG", "最终dns解析的地址：" + singletonList);
        return singletonList;
    }

    private List<InetAddress> getResultFail(String hostname) {
        List<InetAddress> singletonList = new ArrayList<>();
        try {
            singletonList = Dns.SYSTEM.lookup(hostname);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }

        return singletonList;
    }

    private InetAddress getAddress(String hostname, String ip) throws UnknownHostException {
        InetAddress ipAddress = InetAddress.getByName(ip);
        Log.i("TAG", "ip获取：" + ipAddress);
        byte[] ipBytes = ipAddress.getAddress();
        Log.i("TAG", "网络地址字节：" + Arrays.toString(ipBytes));
        InetAddress inetAddress = InetAddress.getByAddress(hostname, ipBytes);
        Log.i("TAG", "网络地址：" + inetAddress);
        return inetAddress;
    }

}
