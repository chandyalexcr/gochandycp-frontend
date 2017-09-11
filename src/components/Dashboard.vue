<template>
	<div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex md4 class="system-info">
          <v-subheader>Operative System</v-subheader>
          <label><v-icon>computer</v-icon> {{server.OS}}</label>
        </v-flex>
        <v-flex md4 class="xs6 system-info">
          <v-subheader>Processor</v-subheader>
          <label><v-icon>memory</v-icon> {{server.cpuName}}</label>
        </v-flex>
        <v-flex md4 class="system-info">
          <v-subheader>Main IP Address</v-subheader>
          <label>
            <v-icon>public</v-icon>  <a :href="IPUrl()" target="_blank" title="open in new tab">{{server.mainIP}}</a>
          </label>
        </v-flex>
      </v-layout>
      <br><br>
      <v-divider></v-divider>
      <br>
      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-subheader>CPU Load Last Hour: {{ server.cpuLoadSixty }}% </v-subheader>
          <v-progress-circular v-bind:size="100" v-bind:width="15" v-bind:rotate="270"
            v-bind:value="server.cpuLoadSixty" class="blue--text">
            {{ server.cpuLoadSixty }}%
          </v-progress-circular>
        </v-flex>
        <v-flex xs12 md4>
          <v-subheader>RAM Usage: {{server.ramUsed}}Mb / {{ server.ramTotal }}Mb</v-subheader>
          <v-progress-circular v-bind:size="100" v-bind:width="15" v-bind:rotate="270"
            v-bind:value="(server.ramUsed*100)/server.ramTotal" class="purple--text">
            {{ server.ramUsed }} Mb
          </v-progress-circular>
        </v-flex>
        <v-flex xs12 md4>
          <v-subheader>Disk Usage: {{ server.hddUsed }}Mb / {{ server.hddTotal }}Mb</v-subheader>
          <v-progress-circular v-bind:size="100" v-bind:width="48" v-bind:rotate="270"
            v-bind:value="(server.hddUsed*100)/server.hddTotal" class="orange--text">
          </v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
	</div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      server: { OS: 'waiting...', cpuName: 'waiting...', ramUsed: 0, ramTotal: 100, hddUsed: 0, hddTotal: 100 }
    }
  },
  created () {
    this.getServerInfo()
  },
  methods: {
    IPUrl () { return 'http://' + this.server.mainIP },
    getServerInfo () {
      this.$axios.get('http://192.168.56.101:8080/server/all-info')
      .then(response => {
        this.server = response.data
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss">
  .system-info {
    label { padding: 20px 15px 12px 15px; font-size: 14px !important; font-weight: 400; }
    a { text-decoration: none; color: #44a; }
  }
</style>