
let content = [
  {
    title: 'linjo',
    desc: 'out now',
    link: 'https://play.google.com/store/apps/details?id=de.tude.lines',
    img: 'splashart_linjo.svg',
    color: '#6289D9'
  },
  {
    title: 'tude\nevents',
    desc: 'season 2',
    link: 'https://events.tude.ga/',
    img: 'splashart_tudeevents.svg',
    color: '#E59C30'
  },
  {
    title: 'we are\ntude',
    desc: 'about us',
    link: '/about',
    img: 'splashart_aboutus.svg',
    color: '#6A8D80'
  }
]

let app;
app = new Vue({
  el: '#app',
  data: {
    contentstate: '',
    contentpage: 0,
    contentamount: content.length,
    content: content[0],
    allcontent: content
  },
  computed: {
    contentcolorhover: function() {
      return shadeColor(this.content.color, -30);
    }
  }
});

let switchTimer = null;
function changeContent(page = -1) {
  if (switchTimer) clearTimeout(switchTimer);
  switchTimer = setTimeout(changeContent, 10000);

  if (page == app.contentpage) return;

  if (page == -1) page = app.contentpage + 1;
  if (page >= content.length) page = 0;
  app.contentpage = page;

  app.contentstate = 'out';
  setTimeout(() => {
      Vue.set(app, 'content', content[page]);
      app.$nextTick(() => app.contentstate = '');
  }, 300);
}
changeContent(0);

//

/* src https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors */
function shadeColor(color, percent) {
  var R = parseInt(color.substring(1,3),16); var G = parseInt(color.substring(3,5),16); var B = parseInt(color.substring(5,7),16);
  R = parseInt(R * (100 + percent) / 100); G = parseInt(G * (100 + percent) / 100); B = parseInt(B * (100 + percent) / 100);
  R = (R<255)?R:255; G = (G<255)?G:255; B = (B<255)?B:255;  
  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16)); var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16)); var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
  return "#"+RR+GG+BB;
}

function makeColorMagic(H, am) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    l -= am;
    h += am / 3;
  
    return "hsl(" + h + "," + s + "%," + l + "%)";
}