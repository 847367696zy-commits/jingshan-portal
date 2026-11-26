<script setup lang="ts">
import { usePortalStore } from '../store/usePortalStore'

const { state } = usePortalStore()
</script>

<template>
  <div v-if="state.lightbox" class="modal-backdrop" @click.self="state.lightbox = null">
    <div class="modal-box" style="width: 660px">
      <div class="photo-box" style="height: 340px">
        <img :src="state.lightbox.photo" :alt="state.lightbox.title" />
        <span class="badge-tl">📸 设施实景大图</span>
        <span class="badge-bl">★ {{ state.lightbox.rating.toFixed(1) }} 分</span>
      </div>
      <div class="card-pad">
        <div class="flex-between" style="margin-bottom: 6px">
          <strong style="font-size: 17px">{{ state.lightbox.title }}</strong>
          <button class="btn-ghost" @click="state.lightbox = null">✕ 关闭</button>
        </div>
        <div style="font-size: 12px; color: var(--ink-3); margin-bottom: 10px">{{ state.lightbox.subtitle }}</div>
        <div v-for="(rev, idx) in state.lightbox.reviews" :key="idx" class="review-quote">💬 {{ rev }}</div>
      </div>
    </div>
  </div>
</template>
