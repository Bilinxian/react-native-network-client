// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {validateRequestOptions} from "../schemas";
import {ClientResponse, GenericClientInterface, RequestOptions} from "../types/APIClient";


const NativeGenericClient = require("./NativeGenericClient").default;

/**
 * Generic client for making requests
 */
class GenericClient implements GenericClientInterface {
    head = (url: string, options?: RequestOptions): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.headAsync(url, options);
    };
    get = (url: string, options?: RequestOptions): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.getAsync(url, options);
    };
    put = (url: string, options?: RequestOptions): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.putAsync(url, options);
    };
    post = (url: string, options?: RequestOptions): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.postAsync(url, options);
    };
    patch = (url: string, options?: RequestOptions): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.patchAsync(url, options);
    };
    delete = (url: string, options?: RequestOptions): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeGenericClient.methodDeleteAsync(url, options);
    };
}

export default new GenericClient();
