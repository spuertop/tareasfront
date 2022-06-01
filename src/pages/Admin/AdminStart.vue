<template>
  <q-page-container class="">
    <h4 class="q-ma-md row justify-center items-center">
      Control panel Tareas
    </h4>
    <div class="q-pa-md row justify-center">
      <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-md col-xs-10 col-sm-6 col-md-4"
        :no-error-focus="false"
      >
        <q-input
          v-model="dataForm.id"
          hint="Usuario"
          autofocus
          lazy-rules
          :disable="loading"
          :rules="[(val) => (val && val.length > 0) || 'No puede estar vacio']"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          v-model="dataForm.pass"
          hint="Contraseña"
          :type="isPwd ? 'password' : 'text'"
          :disable="loading"
          lazy-rules
          :rules="[(val) => (val && val.length >= 4) || 'Mínimo 4 caracteres']"
        >
          <template v-slot:prepend>
            <q-icon name="key" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div>
          <q-btn
            label="Entrar"
            type="submit"
            color="primary"
            :disable="loading"
            :loading="loading"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page-container>
</template>

<script>
import { useQuasar } from "quasar";
import { reactive, ref } from "vue";
import { useLoginStore } from "src/stores/login-store";

export default {
  setup() {
    const loginStore = useLoginStore();
    const $q = useQuasar();
    const loading = ref(false);
    const isPwd = ref(true);
    const initialForm = {
      id: "",
      pass: "",
    };

    const onReset = () => {
      Object.assign(dataForm, initialForm);
      setTimeout(() => {
        loading.value = false;
      }, 250);
    };
    async function onSubmit() {
      loading.value = true;
      const res = await loginStore.loginUser(dataForm);
      if (res.status === 200) {
        $q.notify({
          type: "positive",
          message: "Logged in",
        });
        onReset();
      } else {
        $q.notify({
          type: "negative",
          message: res,
          actions: [{ icon: "close", color: "white" }],
        });
      }
      loading.value = false;
    }
    const dataForm = reactive({ ...initialForm });

    return {
      loading,
      isPwd,
      dataForm,
      onReset,
      onSubmit,
    };
  },
};
</script>
