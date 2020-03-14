const { exec } = require('child_process');
const argv  = require('yargs').argv;

const degradeParams = argv.degrade ? '-wallpaper' : '';

exec(`secret-tool lookup domain ${argv.domain} user ${argv.user}`, (err, stdout) => {
    if (err) {
        console.log(err);
        return;
    }

    exec(
        `xfreerdp /g:${argv.gateway} /gu:${argv.user} /gd:${argv.domain} /gp:${stdout} /v:${argv.server}`
        + ` /u:${argv.user} /p:${stdout} ${degradeParams}`
        + ' /bpp:32 /multimon +auto-reconnect /auto-reconnect-max-retries:5 +fonts +aero /microphone /sound'
        + ' /audio-mode:0 /cert:ignore',
    );
});
