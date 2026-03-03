const fs = require('fs');

function check_api_key(apikey) {
    try {
        // API Key jodi na thake
        if (!apikey) {
            return {
                error: 1,
                msg: 'API Key is missing!'
            };
        }

        // APIKEY data load kora (require bar bar na kore readFileSync use kora better)
        const data_apikey = JSON.parse(fs.readFileSync(global.APIKEY, 'utf-8'));
        const userKey = data_apikey.find(i => i.apikey == apikey);

        // API Key jodi database-e na thake
        if (!userKey) {
            return {
                error: 1,
                msg: 'INVALID API KEY!'
            };
        }

        // Request limit check
        if (userKey.request <= 0 && userKey.type === 'free') {
            return {
                error: 1,
                msg: 'Your API Key has reached the request limit!'
            };
        }

        // Free user hole request ekta komiye file update kora
        if (userKey.type === 'free') {
            userKey.request -= 1;
            fs.writeFileSync(global.APIKEY, JSON.stringify(data_apikey, null, 4), 'utf-8');
            return { error: 0 };
        }

        // Premium user hole unlimited (no request deduction)
        if (userKey.type === 'premium') {
            return { error: 0 };
        }

    } catch (e) {
        return {
            error: 1,
            msg: 'An error occurred with your API KEY system!'
        };
    }
}

module.exports = {
    check_api_key
};