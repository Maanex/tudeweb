
var app;
app = new Vue({
    el: '#app',
    data: {
        
    }
});

function init3D() {
  document.addEventListener('mousemove', function(e) {
    let bounds = document.body.getBoundingClientRect();
    let xAxis = -(bounds.left+(bounds.right-bounds.left)/2 - e.clientX);
    let yAxis = -(bounds.top+(bounds.bottom-bounds.top)/2 - e.clientY);
  
    for (let deco of document.getElementsByClassName('deco')) {
      let depth = parseInt(deco.getAttribute('depth'));
      if (!depth) continue;
      if (deco.classList.contains('arrow')) deco.style.setProperty('--trans', `translate(${xAxis / depth}%, ${yAxis / depth}%)`);
      else deco.style.setProperty('--trans', `translate(${xAxis / depth}%, ${yAxis / depth}%) rotate(${Math.sqrt(e.clientX ** 2 + e.clientY ** 2) / depth * 2}deg)`);
    }
    document.getElementById('invite-button').style.setProperty('--trans', `translate(${xAxis / 60}px, ${yAxis / 60}px)`);
    document.getElementById('about-button').style.setProperty('--trans', `translate(${xAxis / 100}px, ${yAxis / 100}px)`);
    document.getElementsByTagName('h1')[0].style.setProperty('--trans', `translate(${xAxis / 70}px, ${yAxis / 70}px)`);
    document.getElementsByTagName('h2')[0].style.setProperty('--trans', `translate(${xAxis / 100}px, ${yAxis / 100}px)`);
    document.getElementById('imgdiscord').style.setProperty('--trans', `translate(${xAxis / 60}px, ${yAxis / 60}px)`);
    document.getElementById('discordimgdetail').style.setProperty('--trans', `translate(${xAxis / 60}px, ${yAxis / 60}px)`);
    document.getElementById('pricetagcont').style.setProperty('--transf', `translate(${xAxis / 70}px, ${yAxis / 70}px)`);
    document.getElementById('imggame1').style.setProperty('--trans', `translate(${xAxis / 80}px, ${yAxis / 80}px)`);
    document.getElementById('imggame2').style.setProperty('--trans', `translate(${xAxis / 110}px, ${yAxis / 110}px) scale(.9)`);
    document.getElementById('imggame3').style.setProperty('--trans', `translate(${xAxis / 140}px, ${yAxis / 140}px) scale(.8)`);
  });
}
// init3D();