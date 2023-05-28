<template>
  <div class="row bg-pink" style="height: 100vh">
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

    <div class="bg-blue col">
      <q-scroll-area class="" style="height: 100vh; max-width: 300px;">
        <div v-for="n in 100" :key="n" class="q-py-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing
          elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>

</script>
