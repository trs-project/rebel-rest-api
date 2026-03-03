const chalk = require('chalk');
const moment = require('moment-timezone');

module.exports = (data, option) => {
    // Bangladesh Timezone set kora hoyeche
    const time = moment.tz("Asia/Dhaka").format("HH:mm:ss DD/MM/YYYY");
    
    // Alada alada option-er jonno alada color coding
    let status;
    switch (option.toUpperCase()) {
        case "STATUS":
            status = chalk.cyanBright(`[ REBEL-STATUS ]`);
            break;
        case "LOAD":
            status = chalk.greenBright(`[ REBEL-LOAD ]`);
            break;
        case "HOST UPTIME":
            status = chalk.magentaBright(`[ REBEL-UPTIME ]`);
            break;
        case "ERROR":
            status = chalk.redBright(`[ REBEL-ERROR ]`);
            break;
        case "WARN":
            status = chalk.yellowBright(`[ REBEL-WARN ]`);
            break;
        default:
            status = chalk.blueBright(`[ ${option.toUpperCase()} ]`);
            break;
    }

    // Console output format
    console.log(`${chalk.gray(`(${time})`)} ${status} ${chalk.white(data)}`);
};