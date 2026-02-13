<script lang="ts" setup>
</script>

<template>
  <nav class="tab_bar">
    <ul>
      <li>
        <NuxtLink to="#nextbus">次の出発時間</NuxtLink>
      </li>
      <li>
        <NuxtLink to="#schedule">今日の運行ダイヤ</NuxtLink>
      </li>
      <li>
        <NuxtLink to="#timetable-ait">[時刻表]八草→大学</NuxtLink>
      </li>
      <li>
        <NuxtLink to="#timetable-yakusa">[時刻表]大学→八草</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.tab_bar {
  padding: 1rem;
  background-color: rgb(247, 247, 247);
  position: sticky;
  top: 0;
  border-radius: 5px 5px 0 0;

  position: sticky;
  top: 0;

  @media (max-width: 600px) {
    display: none;
  }

  ul {
    text-align: center;

    li {
      padding: 0 1.25em;
      display: inline-block;
      line-height: 2.25em;

      a {
        padding: 0 1.25em;
        height: 2.25em;
        line-height: 2.25em;
        color: #636363;
        text-decoration: none;
        font-size: 1rem;
        border-radius: 8px;
        display: inline-block;

        &:hover {
          background-color: rgba(222, 222, 222, 0.25);
        }

        &.active {
          background-color: #ffffff;
        }
      }
    }
  }
}
</style>
