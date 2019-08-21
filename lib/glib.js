
window.isEquivalent = (a, b) => {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) return false;

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (propName.startsWith('_')) continue;

        if (typeof a[propName] === 'object') {
            if (!window.isEquivalent(a[propName], b[propName])) return false;
        } else {
            if (a[propName] !== b[propName]) return false;
        }
    }

    return true;
}

window.setCookie = (name, value = '', expires = '') => {
    if (expires) {
        var date = new Date();
        date.setTime(date.getTime() + expires);
        expires = date.toUTCString();
    }
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

window.getCookie = (name, orElse = undefined) => {
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1, c.length);
        if (c.indexOf(`${name}=`) == 0) return c.substring(name.length + 1, c.length);
    }
    return orElse;
}