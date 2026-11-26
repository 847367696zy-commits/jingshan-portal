<script setup lang="ts">
import { computed, ref } from 'vue'
import { RESTAURANT_MENUS } from '../../mock/data'
import { usePortalStore } from '../../store/usePortalStore'

const { state, openPhoto, openActionModal } = usePortalStore()
const foodTab = ref<'全部' | '联盟85折' | '农家菜' | '夜市' | '团餐'>('全部')

const restaurants = [
  {
    name: '桥米公馆 · 京山非遗特色鄂菜',
    cat: '联盟85折',
    photo: '/images/cuisine.jpg',
    badge: '🏅 网球联盟商家 · 票根85折',
    dist: '距国际网球中心 600m',
    rating: 4.9,
    reviews: 612,
    menu: '国宝桥米锅巴 ¥48 ｜ 洪湖排骨藕汤 ¥68 ｜ 惠亭湖刁子鱼 ¥56',
    quote: '打完球出示订场票根直接减了¥30，桥米锅巴香到光盘！',
    avg: 78,
  },
  {
    name: '绿林山水农家土菜馆',
    cat: '农家菜',
    photo: '/images/scenic.jpg',
    badge: '🏅 网球联盟商家 · 票根满100减25',
    dist: '绿林山景区入口 200m',
    rating: 4.8,
    reviews: 384,
    menu: '山泉土鸡汤 ¥98 ｜ 京山香菇滑鸡 ¥52 ｜ 农家腊肉炒竹笋 ¥46',
    quote: '现杀土鸡配本地桥米饭，明码标价童叟无欺，强烈推荐！',
    avg: 65,
  },
  {
    name: '文峰河畔老字号碳火烧烤 & 轻食街',
    cat: '夜市',
    photo: '/images/night_market.jpg',
    badge: '🌙 夜经济联盟 · 票根赠饮品',
    dist: '距文峰公园球场 300m',
    rating: 4.9,
    reviews: 520,
    menu: '秘制小龙虾 ¥88 ｜ 京山米茶 ¥8 ｜ 运动低脂鸡胸沙拉 ¥36',
    quote: '打完夜场球走3分钟就到，球友聚餐氛围超棒！',
    avg: 58,
  },
]

const visibleShops = computed(() =>
  foodTab.value === '全部' || foodTab.value === '团餐'
    ? restaurants
    : restaurants.filter((r) => r.cat === foodTab.value),
)
</script>

<template>
  <section>
    <div class="module-header">
      <div class="mh-left">
        <div class="mh-num">04</div>
        <div>
          <h1 class="mh-title">“吃”：美食服务</h1>
          <div class="mh-desc">
            京网推荐美食（特色餐饮、农家菜、本地特色店铺的位置导航、完整菜单与真实评价）、网球联盟票根核销、以及团餐与赛事接待定点餐饮推荐
          </div>
        </div>
      </div>
      <div class="mh-tabs">
        <button
          v-for="t in (['全部', '联盟85折', '农家菜', '夜市', '团餐'] as const)"
          :key="t"
          class="m-tab"
          :class="{ active: foodTab === t }"
          @click="foodTab = t"
        >
          {{ t === '全部' ? '全部推荐美食' : t === '团餐' ? '赛事团餐定点' : t }}
        </button>
      </div>
    </div>

    <div class="ticket-stub-banner mb-16">
      <div>
        <div style="font-size: 15px; font-weight: 900">🎫 票根经济 · 打球凭证直享「京山网球联盟商家」餐饮特惠</div>
        <div style="font-size: 12px; color: rgba(255, 255, 255, 0.82); margin-top: 2px">
          您的今日订场票根 <strong style="color: var(--lime)">{{ state.ticketStubCode }}</strong> 已激活：仅限全市
          <strong>79 家认证网球联盟商家</strong>（含26家餐饮）核销立减与85折！
        </div>
      </div>
      <button class="btn-orange" @click="openActionModal({ type: 'stub', code: state.ticketStubCode })">
        出示我的电子票根码
      </button>
    </div>

    <div v-if="foodTab !== '团餐'" class="grid-3 mb-16">
      <div v-for="shop in visibleShops" :key="shop.name" class="card">
        <div
          class="photo-box"
          style="height: 165px"
          @click="openPhoto({ title: shop.name, photo: shop.photo, rating: shop.rating, subtitle: `${shop.dist} ｜ ${shop.menu}`, reviews: [shop.quote] })"
        >
          <img :src="shop.photo" :alt="shop.name" />
          <span class="badge-tl">{{ shop.badge }}</span>
          <span class="badge-bl">{{ shop.dist }}</span>
        </div>
        <div class="card-pad">
          <div class="flex-between">
            <strong style="font-size: 15.5px">{{ shop.name }}</strong>
            <span class="rating-pill">★ {{ shop.rating }} ({{ shop.reviews }}评)</span>
          </div>
          <div style="font-size: 11.5px; color: var(--ink-2); background: #f4faf7; padding: 7px 9px; border-radius: 8px; margin: 8px 0">
            <strong>📖 招牌菜单：</strong>{{ shop.menu }}
          </div>
          <div class="review-quote">💬 评：“{{ shop.quote }}”</div>
          <div class="flex-between" style="margin-top: 10px">
            <span class="price" style="font-size: 17px">¥{{ shop.avg }}<small>/人均 · 核销+60分</small></span>
            <div class="flex-row">
              <button
                class="btn-ghost"
                @click="openActionModal({ type: 'menu', shopName: shop.name, dist: shop.dist, dishes: RESTAURANT_MENUS[shop.name] ?? [] })"
              >
                📖 完整菜单
              </button>
              <button
                class="btn-primary"
                @click="openActionModal({ type: 'nav', placeName: shop.name, distance: shop.dist, driveMin: '步行约 6 分钟', tip: '凭订场电子票根进店扫码即可直接享85折优惠' })"
              >
                🧭 导航
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-pad" style="background: #fffbf2; border-color: #f2d59b">
      <div class="flex-between" style="margin-bottom: 10px">
        <div>
          <strong style="font-size: 16px; color: #6e4300">🍱 团餐及赛事接待定点餐饮推荐（市场监管A级食安保障）</strong>
          <div style="font-size: 12px; color: #8d6524">
            面向参赛代表队、网球研学团、企业团建 · 支持定制运动员低脂高蛋白营养餐与大巴停靠
          </div>
        </div>
        <button
          class="btn-orange"
          @click="openActionModal({ type: 'inquiry', title: '赛事团餐 / 研学团队用餐预订', subtitle: '支持 10–400 人定制菜单与运动员营养自助餐，食安 A 级保障', submitLabel: '提交团餐预订需求' })"
        >
          一键提交团餐需求
        </button>
      </div>
      <div class="grid-3">
        <div style="background: #fff; border: 1px solid #f1dfb9; border-radius: 11px; padding: 10px 12px; font-size: 12px">
          <strong>文峰迎宾馆赛事宴会厅</strong> <span class="rating-pill">★ 4.9</span><br />
          可同时接待 320 人 · 运动员营养自助 ¥60/人起 · 距赛场0.8km
        </div>
        <div style="background: #fff; border: 1px solid #f1dfb9; border-radius: 11px; padding: 10px 12px; font-size: 12px">
          <strong>京源网球中心餐厅（定点）</strong> <span class="rating-pill">★ 4.8</span><br />
          可接待 200 人 · 赛间简餐/团餐 ¥45/人起 · 场馆内步行2分钟
        </div>
        <div style="background: #fff; border: 1px solid #f1dfb9; border-radius: 11px; padding: 10px 12px; font-size: 12px">
          <strong>温泉度假区生态宴会中心</strong> <span class="rating-pill">★ 4.9</span><br />
          可接待 400 人 · 鄂菜庆功宴 ¥880/桌起 · 免费大巴泊位
        </div>
      </div>
    </div>
  </section>
</template>
