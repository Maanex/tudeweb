const htmlSelfrolesRoles = `
    <div class="selfroles-roles input-list">
        <input class="selfroles-emote input-list-quad" type="text" placeholder="🔮">
        <input class="selfroles-role input-list-fill" type="text" placeholder="536547973937496087">
        <button class="input-list-close"><i class="fas fa-times"></i></button>
    </div>
`;

const htmlLevelupRewards = `
    <div class="levelup-rewards input-list">
        <input class="levelup-level input-list-rect-rev" type="text" placeholder="1">
        <input class="levelup-role input-list-fill" type="text" placeholder="536547973937496087">
        <button class="input-list-close"><i class="fas fa-times"></i></button>
    </div>
`;

const htmlCommandsChannel = `
<div class="commands-override input-list" style="margin-bottom: 0">
    <input class="commands-channel input-list-fill-rev" type="text" placeholder="Channel ID">
    <input class="commands-prefix input-list-rect" type="text" placeholder="Prefix" title="Optional">
    <button class="input-list-close"><i class="fas fa-times"></i></button>
    <div class="space"></div>
    <select class="commands-type input-list-select">
        <option value="blacklist">Blacklist</option>
        <option value="whitelist">Whitelist</option>
    </select>
    <textarea class="commands-list input-list-fill-rev" type="text" placeholder="command1 command2 command3"></textarea>
    <div class="space divider"></div>
</div>
`;

const modules = [
    "modlog",
    "quotes",
    "memes",
    "dynvoice",
    "levelup",
    "commands",
    "totm",
    "casual",
    "selfroles",
    "birthday",
    "autoleaderboard",
    "cleanchat",
    "counting"
]

var resetStore = '';

/*
 *
 */

$(() => {
    resetStore = $('#categories').html();
    init();
});

function init() {
    $('.category>.ctitle').on('click', a=>$(a.currentTarget).parent().toggleClass('closed'));
    $('.mtitle').on('click', a=>{
        $(a.currentTarget).children('.check').toggleClass('checked')
        $(a.currentTarget).parent().toggleClass('closed')
    });
    $('.check.su').on('click', a=>$(a.currentTarget).toggleClass('checked'));
    $('#selfroles-add').on('click', a=>{
        var c = $(htmlSelfrolesRoles).insertBefore(a.currentTarget);
        c.children('button').on('click', b=>$(b.currentTarget).parent().remove());
    });
    $('#levelup-add').on('click', a=>{
        var c = $(htmlLevelupRewards).insertBefore(a.currentTarget);
        c.children('button').on('click', b=>$(b.currentTarget).parent().remove());
    });
    $('#commands-add').on('click', a=>{
        var c = $(htmlCommandsChannel).insertBefore(a.currentTarget);
        c.children('button').on('click', b=>$(b.currentTarget).parent().remove());
    });
    $('.ctc').on('click', a=>{
        $(a.currentTarget).parent().children('textarea').select();
        document.execCommand('copy');
        alert('Copied to clipboard!');
    });
    $('#btn-import').on('click', a=>btnImport($(a.currentTarget).parent().children('textarea').val()));
    $('#tabs>a[link]').on('click', a=>btnTab($(a.currentTarget).attr('link', a)));
}

//

function reset() {
    $('#categories').html(resetStore);
    init();
}

function isModActive(name) {
    return $('#' + name).hasClass('checked');
}

function exportModData(name) {
    var out = {};
    switch(name){
        case 'modlog':
            out.channel = getModuleVar(name, 'channel');
            break;
        case 'commands':
            var channels = [];
            if(getModuleBool(name, 'genable')){
                var global = {};
                global.id = 'global';
                global.prefix = getModuleVar(name, 'prefix');
                if(getModuleVar(name, 'list') == undefined) global.blacklist = [];
                else global[getModuleVar(name, 'type')] = getModuleVar(name, 'list').split(' ');
                channels[0] = global;
            }
            for(var a of $('.commands-override')){
                if($(a).children('.commands-channel').val() == '' || isNaN($(a).children('.commands-channel').val())) continue;

                var obj = {};
                obj.id = '°' + $(a).children('.commands-channel').val() + '°';

                obj.prefix = $(a).children('.commands-prefix').val();
                if(obj.prefix == '') obj.prefix = undefined;

                if($(a).children('.commands-list').val() == undefined) obj.blacklist = [];
                else obj[$(a).children('.commands-type').val()] = $(a).children('.commands-list').val().split(' ');
                
                channels.push(obj);
            }
            out.channels = channels;
            break;
        case 'cleanchat':
            out.tempMuteRole = getModuleVar(name, 'role');
            out.useModLog = getModuleBool(name, 'modlog');
            break;
        case 'selfroles':
            var roles = {};
            for(var a of $('.selfroles-roles')) {
                if($(a).children('.selfroles-emote').val() != '')
                    roles[$(a).children('.selfroles-emote').val()] = '°' + $(a).children('.selfroles-role').val() + '°';
            }
            roles.divider = getModuleVar(name, 'divider');
            out.roles = roles;
            out.channel = getModuleVar(name, 'channel');
            break;
        case 'dynvoice':
            out.category = getModuleVar(name, 'category');
            out.channelName = getModuleVar(name, 'name');
            break;
        case 'memes':
            out.channel = getModuleVar(name, 'channel');
            break;
        case 'quotes':
            out.channel = getModuleVar(name, 'channel');
            out.dbOptOut = getModuleBool(name, 'dbOptOut');
            break;
        case 'casual':
            break;
        case 'counting':
            out.channel = getModuleVar(name, 'channel');
            if(getModuleVar(name, 'emotes') != undefined) out.emotes = getModuleVar(name, 'emotes').split(' ');
            break;
        case 'levelup':
            var max = 0;
            var rew = {};
            for(var a of $('.levelup-rewards')) {
                var level = $(a).children('.levelup-level').val();
                rew[level] = '°' + $(a).children('.levelup-role').val() + '°';
                if(level > max) max = level;
            }
            rew.max = max;
            out.announcementChannel = getModuleVar(name, 'channel');
            out.roleReward = rew;
            if(getModuleVar(name, 'excluded') != undefined) out.excludedChannels = getModuleVar(name, 'excluded').split(' ');
            break;
        case 'totm':
            out.channel = getModuleVar(name, 'channel');
            break;
        case 'autoleaderboard':
            out.channel = getModuleVar(name, 'channel');
            out.useModLog = getModuleBool(name, 'modlog');
            break;
        case 'birthday':
            out.channel = getModuleVar(name, 'channel');
            break;
    }
    return out;
}

function getModuleVar(modname, param) {
    var out = $('#' + modname + '-' + param).val();
    if(out == '') return undefined;
    return isNaN(out) ? out : `°${out}°`;
}

function getModuleBool(modname, param) {
    return $('#' + modname + '-' + param).hasClass('checked');
}

function importModData(name, data){
    switch(name){
        case 'modlog':
            setModuleVar(name, 'channel', data.channel);
            break;
        case 'commands':
            for(var a of data.channels) {
                if(a.id == 'global') {
                    setModuleBool(name, 'genable', true);
                    setModuleVar(name, 'prefix', a.prefix);
                    setModuleVar(name, 'type', a.blacklist == undefined ? 'whitelist' : 'blacklist');
                    setModuleVar(name, 'list', (a.blacklist == undefined ? (a.whitelist == undefined ? '' : a.whitelist) : a.blacklist).join(' '));
                }

                var element = $(htmlCommandsChannel).insertBefore($('#commands-add'));
                element.children('.commands-channel').val(a.id);
                element.children('.commands-prefix').val(a.prefix);
                element.children('.commands-type').val(a.blacklist == undefined ? 'whitelist' : 'blacklist');
                element.children('.commands-list').val((a.blacklist == undefined ? (a.whitelist == undefined ? '' : a.whitelist) : a.blacklist).join(' '));
            }
            break;
        case 'cleanchat':
            setModuleVar(name, 'role', data.tempMuteRole);    
            setModuleBool(name, 'modlog', data.useModLog);
            break;
        case 'selfroles':
            for(var a in data.roles) {
                if(a == 'divider') continue;
                var element = $(htmlSelfrolesRoles).insertBefore($('#selfroles-add'));
                element.children('.selfroles-emote').val(a);
                element.children('.selfroles-role').val(data.roles[a]);
            }

            setModuleVar(name, 'channel', data.channel);
            setModuleVar(name, 'divider', data.roles.divider);
            break;
        case 'dynvoice':
            setModuleVar(name, 'category', data.category);
            setModuleVar(name, 'name', data.channelName);
            break;
        case 'memes':
            setModuleVar(name, 'channel', data.channel);
            setModuleBool(name, 'dbOptOut', data.dbOptOut);
            break;
        case 'quotes':
            setModuleVar(name, 'channel', data.channel);
            break;
        case 'casual':
            break;
        case 'counting':
            setModuleVar(name, 'channel', data.channel);
            setModuleVar(name, 'emotes', data.emotes.join(' '));
            break;
        case 'levelup':
            for(var i = 0; i <= data.roleReward.max; i++){
                if(data.roleReward[i+''] == undefined) continue;
                var element = $(htmlLevelupRewards).insertBefore($('#levelup-add'));
                element.children('.levelup-level').val(i);
                element.children('.levelup-role').val(data.roleReward[i+'']);
            }

            setModuleVar(name, 'channel', data.announcementChannel);
            setModuleVar(name, 'excluded', data.excludedChannels.join(' '));
            break;
        case 'totm':
            setModuleVar(name, 'channel', data.channel);
            break;
        case 'autoleaderboard':
            setModuleVar(name, 'channel', data.channel);
            setModuleBool(name, 'modlog', data.useModLog);
            break;
        case 'birthday':
            setModuleVar(name, 'channel', data.channel);
            break;
    }
}

function setModuleVar(modname, param, val){
    $('#' + modname + '-' + param).val(val);
}

function setModuleBool(modname, param, val){
    $('#' + modname + '-' + param).toggleClass('checked', val);
}

//

function btnExport(open = true, beautify = false) {
    var mods  = {};

    for(var mod of modules) {
        if(isModActive(mod))
            mods[mod] = exportModData(mod);
    }

    var out = {};
    out.modules = mods;
    var result = beautify ? JSON.stringify(out, null, 4) : JSON.stringify(out);
    result = result.split('"°').join('').split('°"').join('');
    $('#export-field').html(result);
    if(open) popup('export');
}

function btnReset() {
    reset();
}

function btnImport(json) {
    reset();

    for(var s of json.split(/[\t\n, :}\[\]]/g)) {
        if(s != '' && !isNaN(s)) {
            for(var a of '\t\n, :}[]'.split(''))
                for(var b of '\t\n, :}[]'.split(''))
                    json = json.split(a + s + b).join(a + '"' + s + '"' + b);
        }
    }

    var obj = JSON.parse(json).modules;
    for(var mod of modules) {
        var active = obj[mod] != undefined;
        $('#' + mod).toggleClass('checked', active);
        $('#' + mod).parent().parent().toggleClass('closed', !active);
        if(active) importModData(mod, obj[mod]);
    }

    popup();
}

function btnTab(loc, event) {
    $('#tabl > a').removeClass('active');
    $('#tl-' + loc).addClass('active');
    event.preventDefault();
    return false;
}

//

function popup(id = ''){
    if(id == '') {
        $('.popup').removeClass('on');
        $('#curtain').removeClass('on');
    } else {
        $('.popup').removeClass('on');
        $('#popup-' + id).addClass('on');
        $('#curtain').addClass('on');
    }
}