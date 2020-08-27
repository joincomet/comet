<template>
  <div :style="`height: ${size}px; width: ${size}px`">
    <input
      :id="`toggle-heart-${item.id}`"
      v-model="item.isEndorsed"
      type="checkbox"
    />
    <label
      :style="`max-height: ${size}px !important; max-width: ${size}px !important; display: inline-flex`"
      :for="`toggle-heart-${item.id}`"
    >
      <v-icon :size="size" :class="item.isEndorsed ? '' : 'text--secondary'">{{
        $vuetify.icons.values.mdiRocket
      }}</v-icon>
    </label>
  </div>
</template>

<script>
export default {
  name: 'AnimatedRocket',
  props: {
    item: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 20
    }
  }
}
</script>

<style scoped lang="scss">
///////////////////////////////////////////////////////////
// Plain SASS Trigonometry Algorithm in Taylor Expansion //
//                                                       //
// Based on                                              //
//      http://japborst.net/posts/sass-sines-and-cosines //
///////////////////////////////////////////////////////////

$pi: 3.14159265359;
$_precision: 10;

@function pow($base, $exp) {
  $value: $base;
  @if $exp > 1 {
    @for $i from 2 through $exp {
      $value: $value * $base;
    }
  }
  @if $exp < 1 {
    @for $i from 0 through -$exp {
      $value: $value / $base;
    }
  }
  @return $value;
}

@function fact($num) {
  $fact: 1;
  @if $num > 0 {
    @for $i from 1 through $num {
      $fact: $fact * $i;
    }
  }
  @return $fact;
}

@function _to_unitless_rad($angle) {
  @if unit($angle) == 'deg' {
    $angle: $angle / 180deg * $pi;
  }
  @if unit($angle) == 'rad' {
    $angle: $angle / 1rad;
  }
  @return $angle;
}

@function sin($angle) {
  $a: _to_unitless_rad($angle);
  $sin: $a;
  @for $n from 1 through $_precision {
    $sin: $sin + (pow(-1, $n) / fact(2 * $n + 1)) * pow($a, (2 * $n + 1));
  }
  @return $sin;
}

@function cos($angle) {
  $a: _to_unitless_rad($angle);
  $cos: 1;
  @for $n from 1 through $_precision {
    $cos: $cos + (pow(-1, $n) / fact(2 * $n)) * pow($a, 2 * $n);
  }
  @return $cos;
}

@function tan($angle) {
  @return sin($angle) / cos($angle);
}

// @import compass;

$bubble-d: 26px; // bubble diameter
$bubble-r: 0.5 * $bubble-d; // bubble-radius
$particle-d: 4px;
$particle-r: 0.5 * $particle-d;

@mixin particles($k) {
  z-index: 500;
  $shadow-list: ();
  $n-groups: 5;
  $group-base-angle: 360deg / $n-groups;
  $group-distr-r: (1 + $k * 0.25) * $bubble-r;
  $n-particles: 1;
  $particle-base-angle: 360deg / $n-particles;
  $particle-off-angle: 60deg; // offset angle from radius
  $spread-r: -$k * 1.1 * $particle-r;

  @for $i from 0 to $n-groups {
    $group-curr-angle: $i * $group-base-angle - 90deg;
    $xg: $group-distr-r * cos($group-curr-angle);
    $yg: $group-distr-r * sin($group-curr-angle);

    @for $j from 0 to $n-particles {
      $particle-curr-angle: $group-curr-angle +
        $particle-off-angle +
        $j *
        $particle-base-angle;
      $xs: $xg + $particle-d * cos($particle-curr-angle);
      $ys: $yg + $particle-d * sin($particle-curr-angle);

      $shadow-list: $shadow-list, $xs $ys 0 $spread-r var(--theme-color);
    }
  }

  box-shadow: $shadow-list;
}

@mixin bubble($ext) {
  transform: scale3d(1, 1, 1);
  border-color: var(--theme-color);
  border-width: $ext;
  z-index: 500;
}

input {
  position: absolute;
  left: -100vw;

  &:checked + label {
    .v-icon {
      color: var(--theme-color);
      will-change: transform;
      animation: heart 0.625s cubic-bezier(0.17, 0.89, 0.32, 1);
    }
    will-change: transform;
    animation: bubble 0.625s cubic-bezier(0.17, 0.89, 0.32, 1);

    &:before,
    &:after {
      animation: inherit;
      animation-timing-function: ease-out;
    }

    &:before {
      will-change: transform, border-width, border-color;
      animation-name: bubble;
    }

    &:after {
      will-change: opacity, box-shadow;
      animation-name: particles;
    }
  }
}

label {
  align-self: center;
  position: relative;
  font-size: 1.5rem;
  user-select: none;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    z-index: 499;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    content: '';
  }

  &:before {
    box-sizing: border-box;
    margin: -$bubble-r;
    border: solid $bubble-r var(--v-primary-base);
    width: $bubble-d;
    height: $bubble-d;
    transform: scale3d(0, 0, 0);
  }

  &:after {
    margin: -$particle-r;
    width: $particle-d;
    height: $particle-d;
    @include particles(1);
  }
}

@keyframes heart {
  0%,
  17.5% {
    transform: scale3d(0, 0, 0);
  }
}

@keyframes bubble {
  15% {
    @include bubble($bubble-r);
  }
  30%,
  100% {
    @include bubble(0);
  }
}

@keyframes particles {
  0%,
  20% {
    opacity: 0;
  }
  25% {
    opacity: 1;
    @include particles(0);
  }
}
</style>
