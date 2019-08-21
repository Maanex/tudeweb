
for (var d of document.getElementsByClassName('input'))
    d.onfocus = e => e.target.classList.remove('error')

