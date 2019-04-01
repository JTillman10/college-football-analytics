<!--<template>
  <v-app>
    <toolbar></toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue';
export default {
  name: 'App',
  data() {
    return {
      //
    };
  },
  components: {
    toolbar: Toolbar,
  },
};
</script>-->
<template>
  <v-app>
    <navigation-drawer/>>
    <toolbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/core/NavigationDrawer.vue';
import Toolbar from './components/core/Toolbar.vue';

export default {
  components: {
    'navigation-drawer': NavigationDrawer,
    toolbar: Toolbar,
  },
};
</script>