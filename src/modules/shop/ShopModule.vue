<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePortalStore } from '../../store/usePortalStore'

const { openPhoto, openActionModal, createQuickOrder } = usePortalStore()
const shopTab = ref<'全部' | '农特' | '装备' | '文创'>('全部')

const products = [
  { cat: '农特', name: '国宝京山有机桥米礼盒 (5kg)', badge: '🌾 地理标志农特', sub: '已售 3,420 盒', rating: 4.9, desc: '明代贡米原产地直发 · 球友伴手礼Top1', quote: '在京山吃过桥米饭太香了，直接商城寄了4盒回家！', price: 88, memberPrice: 79 },
  { cat: '装备', name: '李宁碳纤维全能网球拍 & 赛事用球', badge: '🎾 李宁京山基地直供', sub: '联盟商家9折', rating: 4.9, desc: '京山网球数字产业园研发 · 场馆门店可试打', quote: '中青赛同款用球，凭会员积分直接抵扣了¥50！', price: 499, memberPrice: 449 },
  { cat: '农特', name: '京山野生葛粉 & 绿林花菇礼盒', badge: '🌿 生态农特礼盒', sub: '快递包邮', rating: 4.8, desc: '运动后清润代餐 · 无添加手工古法制作', quote: '送长辈很体面，包装精致发货极快。', price: 69, memberPrice: 62 },
  { cat: '文创', name: '中国网球之城 · 非遗扎染手帕 & 徽章', badge: '🎨 非遗网球文创', sub: '京山限定纪念', rating: 4.9, desc: '含萌萌手工文创、网球小熊挂件、定制速干T恤', quote: '扎染吸汗巾既实用又有京山特色，球友都问链接！', price: 49, memberPrice: 44 },
]

const visibleProducts = computed(() =>
  shopTab.value === '全部' ? products : products.filter((p) => p.cat === shopTab.value),
)
</script>

<template>
  <section>
    <div class="module-header">
      <div class="mh-left">
        <div class="mh-num">07</div>
        <div>
          <h1 class="mh-title">“购”：特色商品服务</h1>
          <div class="mh-desc">
            京山农特产品、网球文创周边及纪念品店铺实景展示、星级评价、积分抵现与线上官方商城一键跳转入口
          </div>
        </div>
      </div>
      <div class="mh-tabs">
        <button
          v-for="t in (['全部', '农特', '装备', '文创'] as const)"
          :key="t"
          class="m-tab"
          :class="{ active: shopTab === t }"
          @click="shopTab = t"
        >
          {{ t === '全部' ? '全部好物' : t === '农特' ? '京山农特产品' : t === '装备' ? '李宁网球装备' : '网球文创纪念品' }}
        </button>
      </div>
    </div>

    <div class="ticket-stub-banner mb-16">
      <div>
        <div style="font-size: 15.5px; font-weight: 900">🛍️ 京山好物官方线上商城 · 产地直发全国包邮</div>
        <div style="font-size: 12px; color: rgba(255, 255, 255, 0.82); margin-top: 2px">
          支持「京山网球」会员积分抵现（100分=¥10）+ 打球电子票根满150减30 · 线下32家金网特产门店同价可提
        </div>
      </div>
      <button class="btn-orange" @click="openActionModal({ type: 'miniprogram', appName: '京山好物官方商城小程序', desc: '已同步您的 Lv.3 会员折扣与积分，支持全国快递直发' })">
        🛒 一键跳转线上官方商城 →
      </button>
    </div>

    <div class="grid-4 mb-16">
      <div v-for="item in visibleProducts" :key="item.name" class="card">
        <div
          class="photo-box"
          style="height: 165px"
          @click="openPhoto({ title: item.name, photo: '/images/goods.jpg', rating: item.rating, subtitle: item.desc, reviews: [item.quote] })"
        >
          <img src="/images/goods.jpg" :alt="item.name" />
          <span class="badge-tl">{{ item.badge }}</span>
          <span class="badge-bl">{{ item.sub }}</span>
        </div>
        <div class="card-pad">
          <div class="flex-between">
            <strong style="font-size: 14.5px">{{ item.name }}</strong>
            <span class="rating-pill">★ {{ item.rating }}</span>
          </div>
          <div style="font-size: 11px; color: var(--ink-3); margin: 4px 0">{{ item.desc }}</div>
          <div class="review-quote">💬 评：“{{ item.quote }}”</div>
          <div class="flex-between" style="margin-top: 9px">
            <span class="price">¥{{ item.memberPrice }}<small>原价¥{{ item.price }}</small></span>
            <button class="btn-primary" @click="createQuickOrder('商品', item.name, '京山好物官方直发 · 全国包邮', item.memberPrice, 40)">
              立即下单
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-pad flex-between">
      <div>
        <strong style="font-size: 14.5px">🏪 线下纪念品与特产认证店铺展示（支持到店体验 + 快递代寄）</strong>
        <div style="font-size: 12px; color: var(--ink-3); margin-top: 3px">
          ① 国际网球中心文创旗舰店（距场馆0m · ★4.9） ｜ ② 文峰广场京山桥米体验馆（距球场400m · ★4.8） ｜ ③ 非遗扎染工坊店（★4.9）
        </div>
      </div>
      <button class="btn-ghost" @click="openActionModal({ type: 'nav', placeName: '国际网球中心文创旗舰店', distance: '150 m', driveMin: '步行约 2 分钟', tip: '门店与线上商城同价，支持凭票根满150减30并顺丰代寄回家' })">
        🗺️ 查看门店导航
      </button>
    </div>
  </section>
</template>
