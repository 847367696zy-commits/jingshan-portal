<script setup lang="ts">
import { computed, ref } from 'vue'
import { ENTERTAINMENT_ITEMS } from '../../mock/data'
import { usePortalStore } from '../../store/usePortalStore'

const { openPhoto, openActionModal, showToast } = usePortalStore()
const entTab = ref<'全部' | '农庄' | '采摘' | '亲子' | '康养' | 'KTV/电影'>('全部')

const visibleItems = computed(() =>
  entTab.value === '全部'
    ? ENTERTAINMENT_ITEMS
    : ENTERTAINMENT_ITEMS.filter((i) => i.catKey === entTab.value),
)
</script>

<template>
  <section>
    <div class="module-header">
      <div class="mh-left">
        <div class="mh-num">08</div>
        <div>
          <h1 class="mh-title">“娱”：休闲娱乐服务</h1>
          <div class="mh-desc">
            全面覆盖休闲农庄、生态采摘、亲子游乐、康养休闲、KTV、电影院六大休闲娱乐点位，每类附实景照片、星级评分、真实评论与一键导航
          </div>
        </div>
      </div>
      <div class="mh-tabs">
        <button
          v-for="t in (['全部', '农庄', '采摘', '亲子', '康养', 'KTV/电影'] as const)"
          :key="t"
          class="m-tab"
          :class="{ active: entTab === t }"
          @click="entTab = t"
        >
          {{ t === '全部' ? '全部娱乐(6大类)' : t }}
        </button>
      </div>
    </div>

    <div class="grid-3">
      <div v-for="e in visibleItems" :key="e.id" class="card">
        <div
          class="photo-box"
          style="height: 145px"
          @click="openPhoto({ title: e.name, photo: e.photo, rating: e.rating, subtitle: `${e.cat} ｜ ${e.dist} ｜ ${e.desc}`, reviews: [e.quote] })"
        >
          <img :src="e.photo" :alt="e.name" />
          <span class="badge-tl">{{ e.cat }}</span>
          <span class="badge-bl">{{ e.dist }}</span>
        </div>
        <div class="card-pad">
          <div class="flex-between">
            <strong style="font-size: 15px">{{ e.name }}</strong>
            <span class="rating-pill">★ {{ e.rating }}</span>
          </div>
          <div style="font-size: 11.5px; color: var(--ink-3); margin: 4px 0">{{ e.desc }}</div>
          <div class="review-quote">💬 “{{ e.quote }}”</div>
          <div class="flex-between" style="margin-top: 9px">
            <span class="price" style="font-size: 16px">{{ e.price }}</span>
            <div class="flex-row">
              <button class="btn-ghost" @click="showToast(`已预约「${e.name}」，凭京山网球电子票根到店享礼遇`)">📞 预约</button>
              <button
                class="btn-primary"
                @click="openActionModal({ type: 'nav', placeName: e.name, distance: e.dist, driveMin: '约 10 分钟', tip: '路况畅通，场馆周边均提供免费或优惠停车位' })"
              >
                🧭 导航
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
