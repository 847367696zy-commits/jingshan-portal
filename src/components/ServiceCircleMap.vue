<script setup lang="ts">
import { computed } from 'vue'
import type { RadiusOption } from '../types/portal'

const props = defineProps<{
  mode: 'courts' | 'traffic' | 'amenities'
  radius?: RadiusOption
}>()

const radiusPx = computed(() => {
  if (props.radius === '500m') return 86
  if (props.radius === '2公里') return 162
  return 128
})
</script>

<template>
  <svg width="100%" height="360" viewBox="0 0 520 360" preserveAspectRatio="xMidYMid slice">
    <rect width="520" height="360" fill="#ECF3F0" />
    <path d="M0 0 H190 C175 65 130 95 90 115 L0 130 Z" fill="#D5EBDD" />
    <path d="M350 0 H520 V155 C445 148 395 115 350 65 Z" fill="#D2EAD9" />
    <path
      d="M-10 305 C110 270 220 295 330 250 C410 218 465 225 530 188"
      fill="none"
      stroke="#B7E0F6"
      stroke-width="22"
      stroke-linecap="round"
    />
    <path d="M0 135 L520 112" fill="none" stroke="#FFFFFF" stroke-width="8" />
    <path d="M262 0 L254 360" fill="none" stroke="#FFFFFF" stroke-width="10" />
    <path d="M0 215 Q245 188 520 232" fill="none" stroke="#FFFFFF" stroke-width="8" />

    <template v-if="mode === 'traffic'">
      <path d="M180 124 L348 117" fill="none" stroke="#DF2E38" stroke-width="7" stroke-linecap="round" />
      <path d="M260 40 L258 215" fill="none" stroke="#F58220" stroke-width="6" stroke-dasharray="10 6" />
      <rect x="195" y="92" width="144" height="20" rx="10" fill="#DF2E38" />
      <text x="267" y="106" text-anchor="middle" font-size="10" fill="#fff" font-weight="800">
        ⛔ 温泉大道段 临时封闭
      </text>
      <rect x="270" y="54" width="128" height="19" rx="9.5" fill="#E87112" />
      <text x="334" y="67" text-anchor="middle" font-size="9.5" fill="#fff" font-weight="800">
        ⚠️ 京山大道 限行禁停
      </text>
    </template>
    <template v-else>
      <circle
        cx="260"
        cy="176"
        :r="radiusPx"
        fill="rgba(13,122,88,0.11)"
        stroke="#0D7A58"
        stroke-width="1.6"
        stroke-dasharray="6 5"
      />
      <rect x="338" y="68" width="76" height="20" rx="10" fill="#0D7A58" />
      <text x="376" y="82" text-anchor="middle" font-size="10.5" fill="#fff" font-weight="800">
        {{ radius ?? '1公里' }}服务圈
      </text>
    </template>

    <g transform="translate(135,108)">
      <rect x="-46" y="-20" width="92" height="20" rx="10" fill="#fff" stroke="#1C73E8" stroke-width="1.3" />
      <text x="0" y="-6" text-anchor="middle" font-size="10" fill="#1857B8" font-weight="700">🏨 文峰花园酒店</text>
      <circle cx="0" cy="5" r="4.5" fill="#1C73E8" stroke="#fff" stroke-width="2" />
    </g>
    <g transform="translate(396,176)">
      <rect x="-52" y="-20" width="104" height="20" rx="10" fill="#fff" stroke="#0EA5A4" stroke-width="1.3" />
      <text x="0" y="-6" text-anchor="middle" font-size="10" fill="#0B6D6E" font-weight="700">
        {{ mode === 'amenities' ? '🚻 公厕/母婴室' : '🍜 桥米公馆(联盟)' }}
      </text>
      <circle cx="0" cy="5" r="4.5" fill="#0EA5A4" stroke="#fff" stroke-width="2" />
    </g>
    <g transform="translate(132,232)">
      <rect x="-56" y="-20" width="112" height="20" rx="10" fill="#fff" stroke="#0E9F6E" stroke-width="1.3" />
      <text x="0" y="-6" text-anchor="middle" font-size="10" fill="#096B4A" font-weight="700">🅿️ P1车位/⚡充电桩</text>
      <circle cx="0" cy="5" r="4.5" fill="#0E9F6E" stroke="#fff" stroke-width="2" />
    </g>
    <g transform="translate(376,244)">
      <rect x="-52" y="-20" width="104" height="20" rx="10" fill="#fff" stroke="#DF2E38" stroke-width="1.3" />
      <text x="0" y="-6" text-anchor="middle" font-size="10" fill="#B61E28" font-weight="700">🏥 运动康复/医疗点</text>
      <circle cx="0" cy="5" r="4.5" fill="#DF2E38" stroke="#fff" stroke-width="2" />
    </g>
    <g v-if="mode === 'amenities'" transform="translate(260,278)">
      <rect x="-40" y="-19" width="80" height="19" rx="9.5" fill="#fff" stroke="#D6961F" stroke-width="1.3" />
      <text x="0" y="-6" text-anchor="middle" font-size="10" fill="#8C5D05" font-weight="700">🏧 ATM机(4)</text>
    </g>

    <g transform="translate(260,176)">
      <circle cx="0" cy="0" r="22" fill="rgba(13,122,88,0.22)" />
      <circle cx="0" cy="0" r="14" fill="#0D7A58" stroke="#fff" stroke-width="2.6" />
      <circle cx="0" cy="0" r="7.5" fill="none" stroke="#C4F63D" stroke-width="2" />
      <rect x="-64" y="-38" width="128" height="21" rx="10.5" fill="#0B251D" />
      <text x="0" y="-24" text-anchor="middle" font-size="10.5" fill="#C4F63D" font-weight="800">
        🎾 京山国际网球中心
      </text>
    </g>
  </svg>
</template>
