import Vue from "vue";
import VueRouter from "vue-router";
import Pic from "@/views/Pic.vue";
import Ascii from "@/views/Ascii.vue";
import QRCode from "@/views/QRCode.vue";
import Expert from "@/views/Expert.vue";
import Live2D from "@/views/Live2D.vue";
import Gmail from "@/views/Gmail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Pic",
    component: Pic
  },
  {
    path: "/Ascii",
    name: "Ascii",
    component: Ascii
  },
  {
    path: "/QRCode",
    name: "QRCode",
    component: QRCode
  },
  {
    path: "/Expert",
    name: "Expert",
    component: Expert
  },
  {
    path: "/Live2D",
    name: "Live2D",
    component: Live2D
  },
  {
    path: "/Gmail",
    name: "Gmail",
    component: Gmail
  }
];

const router = new VueRouter({
  routes
});

export default router;
