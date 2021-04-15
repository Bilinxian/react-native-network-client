// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// *******************************************************************
// - [#] indicates a test step (e.g. # Go to a screen)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element testID when selecting an element. Create one if none.
// *******************************************************************

import { Request } from "@support/server_api";
import { siteUrl, serverUrl } from "@support/test_config";
import { GenericClientRequestScreen } from "@support/ui/screen";
import { getHost } from "@support/utils";
import {
    customBody,
    customHeaders,
    performGenericClientRequest,
    verifyApiResponse,
    verifyResponseSuccessOverlay,
} from "../helpers";

describe("Put - Generic Client Request", () => {
    const testMethod = "PUT";
    const testServerUrl = `${serverUrl}/${testMethod.toLowerCase()}`;
    const testSiteUrl = `${siteUrl}/${testMethod.toLowerCase()}`;
    const testHost = getHost(siteUrl);
    const testStatus = 200;
    const testHeaders = { ...customHeaders };
    const testBody = { ...customBody };

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it("should return a valid response", async () => {
        // * Verify direct server response
        const apiResponse = await Request.apiPut({
            headers: testHeaders,
            body: testBody,
        });
        await verifyApiResponse(
            apiResponse,
            testSiteUrl,
            testStatus,
            testHost,
            testMethod,
            testHeaders,
            testBody
        );

        // # Select put
        await GenericClientRequestScreen.open();
        await GenericClientRequestScreen.putButton.tap();

        // # Perform generic client request
        await performGenericClientRequest({
            testUrl: testServerUrl,
            testHeaders,
            testBody,
        });

        // * Verify response success overlay
        await verifyResponseSuccessOverlay(
            testServerUrl,
            testStatus,
            testHost,
            testMethod,
            testHeaders,
            testBody
        );
    });
});
