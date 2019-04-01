<template>
  <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
    <v-list dense>
      <template v-for="item in items">
        <v-list-tile :key="item.text" :to="item.route">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: 'dashboard', text: 'Dashboard', route: '/' },
      { icon: 'list', text: 'Rank', route: 'rank' },
    ],
  }),
};
</script>

<style scoped>
</style>