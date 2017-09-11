<template>
  <v-app id="example-2" toolbar>
    <!-- Nav Menu -->
    <v-navigation-drawer absolute persistent light v-model="drawer" overflow>
      <!-- Menu header -->
      <v-toolbar flat class="teal darken-1" extended>
        <v-list class="transparent">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/24.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content class="white--text">
              <v-list-tile-title>chandyalex</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <!-- Menu items -->
      <v-list id="main-side-menu" class="pt-0" dense>
        <v-divider></v-divider>
        <template v-for="item in menuItems">
          <!-- without submenus -->
          <template v-if="item.sub.length==0">
            <router-link :to="item.link" tag="v-list-tile" :exact="item.link=='/'">
              <v-list-tile-action>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </template>
          <!-- with submenus -->
          <template v-else>
            <v-list-group>
              <v-list-tile slot="item">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <router-link :to="subitem.link||'/404'" tag="v-list-tile" v-for="subitem in item.sub" :key="subitem.title">
                <v-list-tile-title>{{ subitem.title }}</v-list-tile-title>
              </router-link>
            </v-list-group>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- Toolbar -->
    <v-toolbar fixed class="teal darken-1" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="appbar-title">{{ routeName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- Main  -->
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      routeName: '',
      drawer: true,
      // all menu items
      menuItems: [{
        title: 'Dashboard', icon: 'dashboard', link: '/', sub: []
      },
      {
        title: 'Domains',
        icon: 'language',
        link: '',
        sub: [{title: 'Add new domain', link: '/domains/new'},
        {title: 'List all domains', link: '/domains'}]
      },
      {
        title: 'Services',
        icon: 'android',
        link: '',
        sub: [{title: 'List all services'}, {title: '/help'}]
      },
      {
        title: 'Settings', icon: 'settings', link: '/settings', sub: []
      },
      {
        title: 'Help', icon: 'help', link: '/help', sub: []
      }]
    }
  },
  mounted () {
    this.getRouteName()
  },
  watch: {
    '$route': 'getRouteName'
  },
  methods: {
    getRouteName () { this.routeName = this.$route.name }
  }
}
</script>

<style lang="scss">
  $primary-color: #00897b;
  #main-side-menu {
    .list--group__header--active .list__tile {
      background: #fff;
      .list__tile__action > i { color: $primary-color !important; }
    }
    .router-link-exact-active  {
      .list__tile__action > i,  .list__tile__content {
        color: $primary-color !important; font-weight: 600;
      }
    }
  }
  .appbar-title { font-size: 18px; font-weight: 400; }
  $sidenav-width: 280px;
  @media (min-width: 1280px) {
    #toggle-menu-icon { visibility: hidden; margin-left: -36px; }
    #main-toolbar {z-index: 200; margin-left: $sidenav-width; }
    #main-sidenav { z-index: 199;  }
    #main-sidenav {
      .md-sidenav-content { pointer-events: auto; width: $sidenav-width;
        transform: translate3D(0,0,0); box-shadow: 2px 0 3px #ddd; }
      .md-list-item > a, .md-list-item-container > span { font-size: 13px;}
    }
    #main-container {
      z-index: 198; height: 100vh; margin-top: -64px; padding-top: 64px; margin-left: 304px;
      #router-view { width: 100%; height: 100%; overflow-y: auto; }
    }
  }
</style>