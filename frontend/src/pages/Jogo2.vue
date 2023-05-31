<template>
  <div class="row bg-pink" style="height: 95vh">
    <div class="bg-green col-9">
      map
    </div>

    <!-- <div class="bg-orange col">
      <div>
        <div v-for="n in 100" :key="n" class="q-py-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing
          elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </div>
      </div>
    </div> -->

    <!-- <div class="bg-blue col"> -->
      <q-scroll-area class="bg-blue col" style="width: 100%;">
        <div v-for="n in 100" :key="n" class="q-py-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing
          elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </div>
      </q-scroll-area>
    <!-- </div> -->
  </div>
</template>

<style>
body {
  overflow: hidden !important
}
</style>

<script>

</script>
