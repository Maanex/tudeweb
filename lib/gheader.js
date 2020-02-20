window._header = [
    {
        'name': 'Club',
        'url': 'club',
        'elements': [
            { name: 'Tude Club', url: './club'                        },
            { name: 'Arcade',    url: './arcade'                      },
            { name: 'Events',    url: 'https://events.tude.ga/'                      },
            { name: 'Discord',   url: 'https://discord.gg/mJnQXet'       }
        ]
    },
    {
        'name': 'Products',
        'url': 'products',
        'elements': [
            { name: 'Linjo',        url: 'https://play.google.com/store/apps/details?id=de.tude.lines'                       },
            { name: 'Free Stuff',   url: './freestuff'                      },
            { name: 'All Products', url: './products'                       },
        ]
    },
    {
        'name': 'More',
        'url': 'more',
        'elements': [
            { name: 'About',      url: './about'                       },
            { name: 'Developers', url: 'https://developers.tude.ga/'   },
            { name: 'Contact',    url: 'mailto:tudeteam@gmail.com'     },
            { name: 'Legal',      url: './legal'                       },
            { name: 'Even More',  url: './more'                        }
        ]
    }
]

Vue.component('gheaderd-element', {
    props: [ 'name', 'url' ],
    template: `
    <li class="moreListItem">
        <a class="moreListLink" :href="url">
            {{ name }}
            <i v-if="isExternal()&&false" class="fas fa-external-link-square-alt headerLinkExtern" title="External Link"></i>
        </a>
    </li>
    `,
    methods: {
        isExternal: function() { return this.url.startsWith('http'); }
    }
});

Vue.component('gheaderd-category', {
    props: [ 'name', 'elements', 'url', 'theme' ],
    template: `
    <li>
        <a :href="url"><span class="navLink">
            {{ name }}
            <img :src="getDropdown" class="navMore">
        </span></a>
        <ul class="moreList">
            <gheaderd-element v-for="element in elements" :key="element.name" :name="element.name" :url="element.url"></gheaderd-element>
        </ul>
    </li>
    `,
    computed: {
        getDropdown() {
            switch(this.theme) {
                case 'light': return './assets/dropdown_white.svg';
                default: return './assets/dropdown_black.svg';
            }
        }
    }
});

Vue.component('gheader', {
    props: [ 'theme' ],
    template: `
    <header :theme="theme">
        <div class="header desktopHeader">
            <div class="headerInner">
                <div class="headerLogo"><a href="https://tude.ga/"><img :src="getLogo"></a></div>
                <ul class="headerNav">
                    <gheaderd-category v-for="category in _header" :key="category.name" :name="category.name" :elements="category.elements" :url="category.url" :theme="theme"></gheaderd-category>
                </ul>
            </div>
        </div>
        <div class="header mobileHeader"><a href="https://tude.ga/">Tude</div>
    </header>
    `,
    computed: {
        getLogo() {
            switch(this.theme) {
                case 'light': return './assets/logo_white.svg';
                default: return './assets/logo_black.svg';
            }
        }
    }
});