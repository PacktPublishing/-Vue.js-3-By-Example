<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Tips Calculator</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <div id="container">
        <form>
          <ion-list>
            <ion-item>
              <ion-label :color="!amountValid ? 'danger' : undefined">
                Subtotal (Local Currency)
              </ion-label>
              <ion-input
                class="ion-text-right"
                type="number"
                v-model="subtotal"
                required
                placeholder="Subtotal"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label> Country (Local Currency) </ion-label>
              <ion-select
                v-model="country"
                ok-text="Okay"
                cancel-text="Dismiss"
              >
                <ion-select-option
                  :value="c.name"
                  v-for="c of countries"
                  :key="c.name"
                >
                  {{ c.name }}
                </ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label>Tipping Rate</ion-label>
              <ion-label class="ion-text-right"> {{ tippingRate }}% </ion-label>
            </ion-item>

            <ion-item>
              <ion-button size="default" @click="calculateTip">
                Calculate Tip
              </ion-button>
            </ion-item>
          </ion-list>

          <ion-list>
            <ion-item>
              <ion-label>Tip (Local Currency)</ion-label>
              <ion-label class="ion-text-right"> {{ result.tip }} </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>Total (Local Currency)</ion-label>
              <ion-label class="ion-text-right"> {{ result.total }} </ion-label>
            </ion-item>
          </ion-list>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonLabel,
  IonButton,
  IonList,
  IonItem,
} from "@ionic/vue";
import { computed, reactive, ref, watch } from "vue";
import { countries as countriesArray } from "../constants";
import { useStore } from "vuex";
import { TipCalculation } from "@/interfaces";
import { v4 as uuidv4 } from "uuid";
import { useRoute } from "vue-router";

export default {
  name: "TipsCalculator",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonLabel,
    IonButton,
    IonList,
    IonItem,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const subtotal = ref(0);
    const countries = reactive(countriesArray);
    const country = ref("Afghanistan");
    const tippingRate = computed(() => {
      if (["United States"].includes(country.value)) {
        return 20;
      } else if (
        ["Canada", "Jordan", "Morocco", "South Africa"].includes(country.value)
      ) {
        return 15;
      } else if (["Germany", "Ireland", "Portugal"].includes(country.value)) {
        return 5;
      }
      return 0;
    });
    const amountValid = computed(() => {
      return +subtotal.value >= 0;
    });

    const result = reactive({
      tip: 0,
      total: 0,
    });

    const addToHistory = (entry: TipCalculation) =>
      store.commit("addToHistory", entry);

    const calculateTip = () => {
      result.tip = 0;
      result.total = 0;
      if (!amountValid.value) {
        return;
      }
      addToHistory({
        id: uuidv4(),
        subtotal: subtotal.value,
        country: country.value,
      });
      result.tip = tippingRate.value * 0.01 * subtotal.value;
      result.total = subtotal.value * (1 + tippingRate.value * 0.01);
    };

    watch(
      () => route.query,
      (query) => {
        const { id: queryId } = query;
        const { history } = store.state;
        const entry = history.find(({ id }: TipCalculation) => id === queryId);
        if (!entry) {
          return;
        }
        const {
          subtotal: querySubtotal,
          country: queryCountry,
        }: TipCalculation = entry;
        subtotal.value = querySubtotal;
        country.value = queryCountry;
      },
      { immediate: true }
    );

    return {
      subtotal,
      country,
      countries,
      tippingRate,
      amountValid,
      result,
      calculateTip,
    };
  },
};
</script>
