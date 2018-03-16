var App = {
  name: "app",
  template: `
    <div id="app">
        <navbar sub-bar="true"/>
        <router-view></router-view>
    </div>
  `,
  data() {
    return {};
  },
  components: {
    navbar: NavbarTemplate
  }
};
