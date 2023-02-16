/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function($) {
    'use strict';

    // Only do this on the autodownload page.
    if ($('body').attr('id') === 'thunderbird-download') {
        // IE11 safe check for determining if we've already downloaded Thunderbird
        var lowercaseQuery = window.location.search.toLowerCase();
        var isDownloaded = /([?|&]+downloaded=true)/.test(lowercaseQuery) === true;
        if (isDownloaded) {
            return;
        }

        var isIELT9 = window.Mozilla.Client.platform === 'windows' && /MSIE\s[1-8]\./.test(navigator.userAgent);
        var $platformLink = $('#download-button-desktop-release .download-list li:visible .download-link');
        var downloadURL;

        // Only auto-start the download if a visible platform link is detected.
        if ($platformLink.length) {
            downloadURL = $platformLink.attr('href');

            // If user is not on an IE that blocks JS triggered downloads, start the
            // platform-detected download a second after DOM ready event. We don't rely on
            // the window load event as we have third-party tracking pixels.
            if (!isIELT9) {
                $(function() {
                    setTimeout(function() {
                        window.location.href = downloadURL;
                    }, 1000);
                });
            }
        }
    }
})(window.jQuery);
