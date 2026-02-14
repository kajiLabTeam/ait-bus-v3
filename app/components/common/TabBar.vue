<script lang="ts" setup>
</script>

<template>
  <nav class="tab_bar">
    <ul>
      <li>
        <a href="#nextbus">次の出発時間</a>
      </li>
      <li>
        <a href="#date-select">日付検索</a>
      </li>
      <li>
        <a href="#schedule">運行ダイヤ</a>
      </li>
      <li>
        <a href="#timetables">時刻表</a>
      </li>
      <li>
        <a href="#install">アプリ</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.tab_bar {
  padding: 1rem;
  background-color: rgb(247, 247, 247);
  border-radius: 5px 5px 0 0;
  position: sticky;
  top: 0;
  z-index: 1;

  @include mobile {
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
