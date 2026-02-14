<script lang="ts" setup>
import chromePc from '~/assets/images/chrome-pc.png';
import chromeMobile from '~/assets/images/chrome-mobile.png';
import safariPc from '~/assets/images/safari-pc.png';
import safariMobile from '~/assets/images/safari-mobile.png';

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e as BeforeInstallPromptEvent;
  });
});

async function onInstallClick() {
  deferredPrompt.value?.prompt();
}
</script>

<template>
  <LayoutsSection
    id="install"
    title="アプリのインストール"
    class="section"
  >
    <div class="container">
      <p>アプリとしてインストールすることで、より快適に利用できます。</p>
      <ul>
        <li>ホーム画面からワンタップでアクセス可能</li>
        <li>オフラインでも利用可能</li>
      </ul>
    </div>

    <div class="container">
      <h3>インストール方法</h3>

      <details>
        <summary>Chrome (PC)</summary>
        <div class="content">
          <p>
            アドレスバー右端の「インストールボタン(<CommonIconsDownloadComputer />)」をクリックしてください。
          </p>
          <img
            :src="chromePc"
            alt="Chrome(PC)でのインストール方法"
          >
        </div>
      </details>

      <details>
        <summary>Chrome (スマホ)</summary>
        <div class="content">
          <p>
            アドレスバー右側の「メニューボタン(<CommonIconsMenu />)」をタップし、「<CommonIconsInstall /> ホーム画面に追加」を選択してください。
          </p>
          <img
            :src="chromeMobile"
            alt="Chrome(スマホ)でのインストール方法"
          >
        </div>
      </details>

      <details>
        <summary>Safari (PC)</summary>
        <div class="content">
          <p>
            アドレスバー右側の「共有ボタン(<CommonIconsShare />)」をクリックし、「Dockに追加」を選択してください。
          </p>
          <img
            :src="safariPc"
            alt="Safari(PC)でのインストール方法"
          >
        </div>
      </details>

      <details>
        <summary>Safari (iPhone)</summary>
        <div class="content">
          <p>
            アドレスバー下部の「共有ボタン(<CommonIconsShare />)」をタップし、「ホーム画面に追加」を選択してください。
          </p>
          <img
            :src="safariMobile"
            alt="Safari(iPhone)でのインストール方法"
          >
        </div>
      </details>
    </div>

    <div
      v-if="deferredPrompt"
      class="container"
    >
      <button
        class="install_button"
        @click="onInstallClick"
      >
        アプリをインストール
      </button>
      <p>このボタンからも簡単にインストールできます。</p>
    </div>
  </LayoutsSection>
</template>

<style lang="scss" scoped>
@media (display-mode: standalone) {
  .section {
    display: none;
  }
}

.container {
  padding: 1rem;

  ul {
    display: inline-block;
    text-align: left;
    padding-left: 1rem;
  }

  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    margin-top: 1rem;
  }

  svg {
    stroke: $color-text;
    fill: $color-text;
    width: 1rem;
    vertical-align: middle;
  }

  details {
    margin-inline: auto;
    width: 100%;
    max-width: 600px;

    summary {
      margin-inline: auto;
      width: 150px;
      text-align: left;
    }

    .content {
      padding: 0 0 2rem;
    }
  }

}

.install_button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
}
</style>
