<template>
  <div ref="tsRoot">
    <divHeader ref="tsHeader" v-if="$store.state.headers"></divHeader>
    <nuxt ref="tsNuxt" />
    <divFooter v-if="$store.state.footers"></divFooter>
  </div>
</template>
<script>
import divHeader from "~/components/headers.vue";
import divFooter from "~/components/footers.vue";
export default {
  components: {
    divHeader,
    divFooter,
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
