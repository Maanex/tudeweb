
var app;
app = new Vue({
  el: '#app',
  data: {
    currImg: '/assets/freestuff/theme-1.png',
    themeId: 1,
    availableThemes: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    themeImages: [
      '/assets/freestuff/theme-1.png',
      '/assets/freestuff/theme-2.png',
      '/assets/freestuff/theme-3.png',
      '/assets/freestuff/theme-4.png',
      '/assets/freestuff/theme-5.png',
      '/assets/freestuff/theme-6.png',
      '/assets/freestuff/theme-7.png',
      '/assets/freestuff/theme-8.png',
      '/assets/freestuff/theme-9.png',
    ],
    info: ''
  },
  watch: {
    themeId: function(id) {
      this.currImg = this.themeImages[id - 1];
      switch (id) {
        case 7:
          this.info = 'This theme displayes a website embed, if available';
          break;
        case 8:
          this.info = 'This theme will not display a website embed';
          break;
        default:
          this.info = '';
      }
    }
  }
});
