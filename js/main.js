/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

(function () {
    require.config({
        baseUrl: 'js',
        paths: {
            jquery: 'vendor/jquery/jquery.min',
            nem: 'vendor/nem/nem-sdk'
        }
    });

    require(['jquery','nem'], function ($) {
        $.noConflict();

        $('#button_01').click(function () {
            $('#textarea_01').val('!!!!!!!!!!!!!!!!!!!!!!!!!\n\n\nHello, world!!!!');
        });
        $('#button_02').click(function () {
            var nem = require("nem-sdk").default;
            var rBytes = nem.crypto.nacl.randomBytes(32);
            var rHex = nem.utils.convert.ua2hex(rBytes);
            var keyPair = nem.crypto.keyPair.create(rHex);
            $('#input_pk').val(rHex);
            $('#input_pubk').val(keyPair.publicKey.toString());
            $('#input_addr').val(nem.model.address.toAddress(keyPair.publicKey.toString(),  nem.model.network.data.testnet.id));
        });
    });
}).call(this);
