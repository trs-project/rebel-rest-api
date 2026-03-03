const router = require("express").Router();
const log = require("../utils/logger");
const { readdirSync } = require('fs-extra');
const path = require('path');

try {
    let n = 0;
    const srcPath = path.join(process.cwd(), "/lib/");

    // 1. Root /lib/ folder-er JS file gulo load kora
    const rootFiles = readdirSync(srcPath).filter((file) => file.endsWith(".js"));
    
    for (let file of rootFiles) {
        const route = require(path.join(srcPath, file));
        if (route.name && route.index) {
            router.get(route.name, route.index);
            n++;
        }
    }

    // 2. /lib/ er bhetorer sub-folders theke JS file load kora
    const subDirs = readdirSync(srcPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (let dir of subDirs) {
        const dirPath = path.join(srcPath, dir);
        const fileName = readdirSync(dirPath).filter((file) => file.endsWith(".js") && file !== 'main.js');

        for (let j of fileName) {
            const route = require(path.join(dirPath, j));
            if (route.name && route.index) {
                router.get(route.name, route.index);
                n++;
            }
        }
    }

    log(`Successfully loaded ${n} REBEL routes`, 'LOAD');

} catch (e) {
    log(`Error loading routes: ${e.message}`, 'ERROR');
    console.error(e);
}

module.exports = router;