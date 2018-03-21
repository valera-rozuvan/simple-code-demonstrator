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
        var nem = require("nem-sdk").default;

        $('#button_01').click(function () {
            var walletName = $('#input_login').val()
            var password = $('#input_pwd').val()
            // Create PRNG wallet
            var wallet = nem.model.wallet.createPRNG(walletName, password, nem.model.network.data.testnet.id);
            
            // Convert stringified wallet object to word array
            var wordArray = nem.crypto.js.enc.Utf8.parse(JSON.stringify(wallet));
            
            // Word array to base64
            var base64 = nem.crypto.js.enc.Base64.stringify(wordArray);
            
            $('#textarea_01').val('Wallet name: '+walletName+'\nPassword: '+password+'\nWallet:\n'+base64);
            $('#textarea_wallet').val(base64);
        });
        $('#button_02').click(function () {
            var rBytes = nem.crypto.nacl.randomBytes(32);
            var rHex = nem.utils.convert.ua2hex(rBytes);
            var keyPair = nem.crypto.keyPair.create(rHex);
            $('#input_pk').val(rHex);
            $('#input_pubk').val(keyPair.publicKey.toString());
            $('#input_addr').val(nem.model.address.toAddress(keyPair.publicKey.toString(),  nem.model.network.data.testnet.id));
        });
        $('#button_showwallet').click(function () {
            var password = $('#input_pwd2').val();
            // Create Brain wallet
            var base64 =  $('#textarea_wallet').val();
            var decArray = nem.crypto.js.enc.Base64.parse(base64);
            var strWallet = nem.crypto.js.enc.Utf8.stringify(decArray);
            var wallet = JSON.parse(strWallet);
            // Create a common object
            var common = nem.model.objects.create("common")(password, "");
            
            // Get the wallet account to decrypt
            var walletAccount = wallet.accounts['0'];
            
            // Decrypt account private key 
            try {
                nem.crypto.helpers.passwordToPrivatekey(common, walletAccount, walletAccount.algo);
                var keyPair = nem.crypto.keyPair.create(common.privateKey);
                $('#wallet_detail').val('Wallet name: '+wallet.name+'\nAddress: '+walletAccount.address+'\nPrivate key: '+common.privateKey+'\nPublic Key: '+keyPair.publicKey.toString());
            } catch(err) {
                $('#wallet_detail').val('Wallet name: '+wallet.name+'\nAddress: '+walletAccount.address+'\nBAD PASSWORD');
            }
        });

    });
}).call(this);
