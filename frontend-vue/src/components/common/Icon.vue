<template functional>
  <div v-bind="data.attrs" :class="[data.class, data.staticClass]" :style="data.staticStyle">
    <!--FALLBACK-->
    <svg
      v-if="!props.name"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      :width="props.size ? props.size : 24"
      :height="props.size ? props.size : 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <svg
      v-else-if="props.name === 'comet-logo'"
      width="100%"
      height="100%"
      viewBox="0 0 211.26 33.84"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <defs>
        <linearGradient
          id="linearGradient892"
          x1="34.153"
          x2="120.24"
          y1="16.972"
          y2="16.972"
          gradientTransform="matrix(.83617 0 0 1 4.6899 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2b0000" offset="0" />
          <stop stop-color="#2b0000" stop-opacity="0" offset="1" />
        </linearGradient>
      </defs>
      <g>
        <path
          d="m29.371 26.625q-1.0053 0.928-2.7453 1.8947-1.74 0.96667-3.9827 1.6627-2.2427 0.65733-4.7947 0.65733-3.132 0-5.8387-0.96667-2.7067-1.0053-4.756-2.8227-2.0107-1.8173-3.132-4.3693-1.1213-2.5907-1.1213-5.7613 0-2.9773 1.16-5.4907 1.1987-2.5133 3.2867-4.3693 2.088-1.856 4.7947-2.8613 2.7067-1.044 5.7227-1.044 2.4747 0 4.756 0.696 2.2813 0.65733 4.06 1.7013 1.8173 1.044 2.9 2.1653l-2.5907 3.364q-1.8947-1.6627-4.2147-2.7067-2.32-1.0827-5.22-1.0827-1.972 0-3.828 0.65733-1.856 0.65733-3.364 1.9333-1.4693 1.2373-2.3587 3.016-0.85067 1.7787-0.85067 4.0213 0 3.248 1.5467 5.452 1.5467 2.1653 4.06 3.2867 2.552 1.0827 5.4133 1.0827 2.088 0 3.7507-0.54133 1.6627-0.58 2.9773-1.392 1.3147-0.812 2.3587-1.624z"
        />
        <g>
          <path
            d="m82.893 3.3867 10.865 14.423 10.865-14.423h4.0213v27.067h-4.176v-11.368q0-2.5133 0.0773-4.756 0.116-2.2427 0.348-4.4853l-9.8986 12.837h-2.552l-9.8987-12.799q0.27067 2.204 0.348 4.4467 0.07733 2.2427 0.07733 4.756v11.368h-4.176v-27.067z"
          />
          <path
            d="m120.94 3.3867h20.957v4.0213h-16.781v7.1533h14.655v4.0213h-14.655v7.8493h16.781v4.0213h-20.957z"
          />
          <path
            d="m159.83 30.453v-23.045h-9.512v-4.0213h23.471v4.0213h-9.7827v23.045z"
          />
          <path
            d="m179.73 30.453 11.445-13.881-11.252-13.185h5.568l8.8547 10.711 8.1973-10.711h5.336l-11.097 13.611 11.484 13.456h-5.568l-9.0093-10.865-8.6613 10.865z"
          />
        </g>
      </g>
      <!--       <path d="m57.15 4.7395-20.854 23.867 30.383-20.343 5.67e-4 1.81e-4 -30.384 20.343 34.031-15.59-34.031 15.59 35.064-7.7593-35.064 7.7593 31.221 0.0015c2.0807-2.2603 3.8505-5.1879 4.3092-7.9787 0.43433-2.6426 0.11215-5.3589-1.0234-7.8378-0.07883-0.17201 0.07686 0.17811-0.0088 0.01064-0.84261-1.6494-2.2466-3.5988-3.6485-4.7566-2.6738-2.2082-6.2067-3.4285-9.9959-3.3057z" fill-rule="evenodd" />
 -->

      <!--       <path d="m67.13 5.0863-31.694-0.00152 35.31 9.4958 2.36e-4 5.47e-4 -35.31-9.4965 34.131 15.37-34.131-15.37 28.914 21.301-28.914-21.301 20.541 23.513c3.0711 0.07975 6.4402-0.5137 8.8437-2.0045 2.2758-1.4116 4.1094-3.4414 5.2291-5.9275 0.07767-0.17254-0.08355 0.17507-0.0138 3.73e-4 0.68773-1.7198 1.232-4.0596 1.1815-5.8772-0.09633-3.4665-1.5018-6.9298-4.0874-9.7026z" fill-rule="evenodd" />
 -->

      <path d="m41.526 5.3877 31.694-0.00152-35.31 9.4958-2.36e-4 5.47e-4 35.31-9.4965-34.131 15.37 34.131-15.37-28.914 21.301 28.914-21.301-20.541 23.513c-3.0711 0.07975-6.4402-0.5137-8.8437-2.0045-2.2758-1.4116-4.1094-3.4414-5.2291-5.9275-0.07767-0.17254 0.08355 0.17507 0.0138 3.73e-4 -0.68773-1.7198-1.232-4.0596-1.1815-5.8772 0.09633-3.4665 1.5018-6.9298 4.0874-9.7026z" fill-rule="evenodd" />

      <!-- <path
        d="m33.248 16.972c-3.8e-5 6.7386 4.3584 12.329 9.9792 12.801l91.773-12.801-91.773-12.801c-5.6209 0.47143-9.9793 6.0621-9.9792 12.801z"
        fill="url(#linearGradient892)"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.46"
      /> -->

    </svg>

    <svg
      v-else-if="props.name === 'twitter'"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
    </svg>

    <svg
      v-else-if="props.name === 'spinner'"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
      class="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <svg
      v-else-if="props.name === 'search'"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
    </svg>

    <svg
      v-else-if="props.name === 'chevron-left'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      :width="props.size ? props.size : 24"
      :height="props.size ? props.size : 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>

    <svg
      v-else-if="props.name === 'chevron-right'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      :width="props.size ? props.size : 24"
      :height="props.size ? props.size : 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />
    </svg>

    <svg
      v-else-if="props.name === 'text'"
      :width="props.size ? props.size : 24"
      :height="props.size ? props.size : 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>

    <svg
      v-else-if="props.name === 'link'"
      :width="props.size ? props.size : 24"
      :height="props.size ? props.size : 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>

    <svg
      v-else-if="props.name === 'login'"
      :width="props.size ? props.size : 24"
      :height="props.size ? props.size : 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
      />
    </svg>

    <!--20x20-->
    <svg
      v-else-if="props.name === 'heart'"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-else-if="props.name === 'dots'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-else-if="props.name === 'dots-horizontal'"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
      />
    </svg>
    <svg
      v-else-if="props.name === 'bookmark'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
    >
      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
    </svg>
    <svg
      v-else-if="props.name === 'comment'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
    >
      <path
        fill-rule="evenodd"
        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
        clip-rule="evenodd"
      />
    </svg>

    <svg
      v-else-if="props.name === 'rocket'"
      :width="props.size ? props.size : 18"
      :height="props.size ? props.size : 18"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m11.655 0.51312c-3.3722 3.2534-5.4186 8.7632-5.1237 13.841-2.2422 2.3285-3.5306 5.4907-3.5306 8.7674-0.00141 0.1895 0.10536 0.36416 0.27436 0.44972 0.17041 0.08556 0.37335 0.06788 0.52538-0.04596l3.1155-2.3349 0.040305 0.71347c0.014849 0.26516 0.23405 0.47164 0.49992 0.47164h9.0892c0.13718 0 0.26234-0.05586 0.35355-0.14708 0.08415-0.08415 0.13859-0.19799 0.14566-0.32527l0.04031-0.71347 3.1155 2.3349c0.15203 0.11384 0.35426 0.10677 0.52326 0.02263 0.04313-0.02192 0.08202-0.05091 0.11667-0.08556 0.10041-0.10041 0.1591-0.24678 0.15981-0.3875 0-3.2315-1.2883-6.3937-3.5306-8.7222 0.29274-5.0855-1.7381-10.608-5.1237-13.839-0.19304-0.18314-0.4971-0.18314-0.69084 7.071e-4zm2.8454 9.3621c0 0.68872-0.28001 1.3138-0.73327 1.7671-0.45326 0.45326-1.0783 0.73327-1.7671 0.73327-1.3782-7.07e-4 -2.4996-1.1222-2.5003-2.5003 0-1.3789 1.1215-2.5003 2.5003-2.5003 1.3789 0 2.501 1.1222 2.5003 2.5003z" />
    </svg>

    <svg
      v-else-if="props.name === 'report'"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clip-rule="evenodd"
      />
    </svg>

    <svg
      v-else-if="props.name === 'crosspost'"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"
      />
    </svg>

    <svg
      v-else-if="props.name === 'eye-off'"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
        clip-rule="evenodd"
      />
      <path
        d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
      />
    </svg>

    <svg
      v-else-if="props.name === 'globe'"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
    </svg>

    <svg
      v-else-if="props.name === 'home'"
      :width="props.size ? props.size : 20"
      :height="props.size ? props.size : 20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>

    <!--FALLBACK-->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      :width="props.size ? props.size : 24"
      :height="props.size ? props.size : 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    size: {
      type: [Number, String],
      default: null
    },
    name: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped></style>
