// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { NativeModules } from "react-native";

import { validateRequestOptions } from "../schemas";

const { GenericClient: NativeGenericClient } = NativeModules;

/**
 * Generic client for making requests
 */
class GenericClient implements GenericClientInterface {
    get = (url: string, options?: RequestOptions): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.get(url, options);
    };
    put = (url: string, options?: RequestOptions): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.put(url, options);
    };
    post = (url: string, options?: RequestOptions): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.post(url, options);
    };
    patch = (
        url: string,
        options?: RequestOptions
    ): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.patch(url, options);
    };
    delete = (
        url: string,
        options?: RequestOptions
    ): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.delete(url, options);
    };
}

export default new GenericClient();
