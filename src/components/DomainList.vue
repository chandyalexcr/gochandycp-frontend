<template>
  <div>
    <v-list subheader>
      <v-subheader>ACTIVE DOMAINS</v-subheader>
        <v-list-tile avatar v-for="domain in domainList" v-bind:key="domain.title" @click="" v-if="domain.enabled">
          <v-list-tile-avatar>
            <v-icon class="green--text text--darken-1">public</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="replaceTld(domain.name)"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple :href="getLink(domain.name)" target="_blank">
              <v-icon class="blue--text text--lighten-1">launch</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon class="teal--text text--lighten-1">visibility</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon class="red--text text--lighten-1">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list subheader>
      <v-subheader>INACTIVE DOMAINS</v-subheader>
      <v-list-tile avatar v-for="domain in domainList" v-bind:key="domain.title" @click="" v-if="!domain.enabled">
        <v-list-tile-avatar>
          <v-icon class="red--text text--darken-1">public</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{replaceTld(domain.name)}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon class="teal--text text--lighten-1">visibility</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon class="red--text text--lighten-1">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <!-- router-link to="/domains/new">
    <v-btn fab absolute dark bottom right class="teal">
      <v-icon dark>add</v-icon>
    </v-btn>
    </router-link -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      domainList: [],
      items2: [
        { title: 'Travis Howard', avatar: '/static/doc-images/lists/5.jpg' }
      ]
    }
  },
  created () {
    this.getDomainList()
  },
  methods: {
    replaceTld (domain) {
      return domain.replace('tld.', 'www.')
    },
    getLink (domain) {
      return 'http://' + domain.replace('tld.', 'www.')
    },
    getDomainList () {
      this.$axios.get('http://192.168.56.101:8080/domains/all')
      .then(response => {
        this.domainList = response.data
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss">
  
</style>