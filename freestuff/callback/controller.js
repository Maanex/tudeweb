
var app;
app = new Vue({
  el: '#app',
  data: {
    permissionIssue: false,
    guildId: 0
  }
});

window.onload = () => {
  let url = new URL(location.href);
  if (url.searchParams.has('error')) {
    switch (url.searchParams.get('error')) {
      case 'access_denied':
      default:
        location.href = './freestuff';
        break;
    }
  } else {
    if (!url.searchParams.has('permissions') || ((url.searchParams.get('permissions') & 265280) != 265280)) {
      app.permissionIssue = true;
    }
    if (url.searchParams.has('guild_id')) {
      app.guildId = url.searchParams.get('guild_id');
    }

  }
}