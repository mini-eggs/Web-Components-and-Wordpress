import Navigo from "navigo";

const router = new Navigo("/", true, "#/");

router.on({
  home: function() {
    import("./components/header");
    document.body.innerHTML = `
      <app-header></app-header>
    `;
  },
  "*": function() {
    router.navigate("home");
  }
});

router.resolve();

export default router;
