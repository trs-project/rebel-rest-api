const chalkAnimation = require('chalkercli');

let str = String.raw`
LOADING REBEL[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒] 
`;

let logo = String.raw`
        _____  ______ ____  ______ _      
       |  __ \|  ____|  _ \|  ____| |     
       | |__) | |__  | |_) | |__  | |     
       |  _  /|  __| |  _ <|  __| | |     
       | | \ \| |____| |_) | |____| |____ 
       |_|  \_\______|____/|______|______|
`;

// Animation start hocche
const karaoke = chalkAnimation.karaoke(str);
const rainbow = chalkAnimation.rainbow(logo);

// 7 second por animation theme giye main app start hobe
setTimeout(() => {
    karaoke.stop();
    rainbow.stop();
    console.clear();
    require('./app/main.js');
}, 7000);