<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePortalStore } from '../../store/usePortalStore'

const { state, switchModule, openPhoto, openActionModal } = usePortalStore()
const activeTheme = ref<'全部' | '网球+文旅' | '网球+研学' | '网球+康养'>('全部')

const themes = [
  {
    key: '网球+文旅',
    badge: '🌿 主题一：网球 + 文旅',
    sub: '★ 4.9 · 延伸荆门/全省线路',
    photo: '/images/scenic.jpg',
    title: '京山打球 → 绿林山/空山洞 + 明显陵延伸线',
    desc: '热门打卡：莲山湖网红球场、美人谷、文峰河畔夜市 · 含语音导览',
    price: '¥498',
    extra: '/人起 · 会员9折',
    btn: '查看文旅线路',
    target: 3 as const,
  },
  {
    key: '网球+研学',
    badge: '🎓 主题二：网球 + 研学',
    sub: '★ 4.9 · 湖北省网球学校直营',
    photo: '/images/coach_2.jpg',
    title: '湖北省网球学校 7 天冬夏令营 & 等级评测',
    desc: '训后可在指定机构参加五维能力晋升测试 · 含食宿与赛事体验',
    price: '¥2,480',
    extra: '/期 · 积+200分',
    btn: '报名与咨询',
    target: 9 as const,
  },
  {
    key: '网球+康养',
    badge: '♨️ 主题三：网球 + 康养',
    sub: '★ 4.9 · 官方旗舰热销1,240份',
    photo: '/images/hotspring.jpg',
    title: '京山四天三晚尊享：打网球 + 泡温泉 + 运动康复',
    desc: '含6小时红土/硬地场 + 温泉主题酒店 + 专业理疗恢复 + 桥米宴',
    price: '¥2,999',
    extra: '/人起 · 票根立减',
    btn: '立即预订',
    target: 3 as const,
    orange: true,
  },
]

const visibleThemes = computed(() =>
  activeTheme.value === '全部' ? themes : themes.filter((t) => t.key === activeTheme.value),
)
</script>

<template>
  <section>
    <div class="module-header">
      <div class="mh-left">
        <div class="mh-num">01</div>
        <div>
          <h1 class="mh-title">首页总览与网球主题专区</h1>
          <div class="mh-desc">
            京山网球城市名片、宣传片、城市导览、三大精品网旅主题（文旅/研学/康养）、近期赛事预告、活动弹窗与快捷订场入口
          </div>
        </div>
      </div>
      <div class="mh-tabs">
        <button
          v-for="tab in (['全部', '网球+文旅', '网球+研学', '网球+康养'] as const)"
          :key="tab"
          class="m-tab"
          :class="{ active: activeTheme === tab }"
          @click="activeTheme = tab"
        >
          {{ tab === '全部' ? '全部主题' : tab }}
        </button>
        <button class="m-tab" @click="switchModule(2)">近期赛事预告 →</button>
      </div>
    </div>

    <div class="grid-split mb-18">
      <div class="card">
        <div
          class="photo-box"
          style="height: 256px"
          @click="openActionModal({ type: 'video', title: '《中国网球之城 · 生态京山》官方城市宣传片', duration: '02:15' })"
        >
          <img src="/images/hero.jpg" alt="京山网球城市名片宣传片" />
          <div class="badge-tl"><span class="live-dot" />官方宣传片 · 02:15 高清实景</div>
          <div
            style="
              position: absolute;
              inset: 0;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              padding: 20px 22px;
              background: linear-gradient(180deg, transparent 20%, rgba(8, 30, 22, 0.92) 100%);
              color: #fff;
            "
          >
            <div class="flex-row" style="margin-bottom: 8px">
              <span class="tag" style="background: var(--lime); color: #0b251d">中国网球之城 · 城市名片</span>
              <span class="tag" style="background: rgba(255, 255, 255, 0.2); color: #fff">全市 356 片标准场 · 万人5.67片</span>
              <span class="tag" style="background: rgba(255, 255, 255, 0.2); color: #fff">📍 已识别来源地：{{ state.origin }}</span>
            </div>
            <div style="font-size: 21px; font-weight: 900; margin-bottom: 6px">以球塑城、以赛兴业：欢迎来到生态京山</div>
            <div class="flex-between">
              <span style="font-size: 12.5px; color: rgba(255, 255, 255, 0.86)">
                一站打通吃住行游购娱训打 · 打球电子票根直享全市 79 家网球联盟商家优惠
              </span>
              <div class="flex-row">
                <button
                  class="btn-orange"
                  style="border-radius: 99px"
                  @click.stop="openActionModal({ type: 'video', title: '《中国网球之城 · 生态京山》官方城市宣传片', duration: '02:15' })"
                >
                  ▶ 播放城市宣传片
                </button>
                <button
                  class="btn-ghost"
                  style="border-radius: 99px"
                  @click.stop="openActionModal({ type: 'audio', spotName: '京山网球城市全景导览', duration: '全城2日游推荐', photo: '/images/hero.jpg', script: '欢迎来到中国网球之城——湖北京山。全市拥有356片标准网球场，每万人拥有5.67片，您可以以京山国际网球中心为起点，串联天沐温泉、绿林山、空山洞、文峰夜市与桥米美食，开启挥拍山水间的惬意旅程。' })"
                >
                  🗺️ 城市导览
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card-pad flex-between" style="background: #fafdfc">
          <div class="flex-row">
            <span class="tag green">🎾 快捷订场入口</span>
            <span style="font-size: 12.5px; font-weight: 700">
              今日全市空闲可约 <strong style="color: var(--primary)">84 片</strong> · 同步预约车位与充电桩
            </span>
          </div>
          <div class="flex-row">
            <button class="btn-primary" @click="switchModule(2)">立即去订场 →</button>
            <button class="btn-ghost" @click="switchModule(13)">查看我的 {{ state.abilityLevel }} 能力卡</button>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px">
        <div v-if="state.showActivityPopup" class="popup-preview">
          <div class="flex-between" style="margin-bottom: 8px">
            <span class="tag orange">🎉 热门活动弹窗 · 2026京山网球公开赛重磅福利</span>
            <button style="border: none; background: transparent; font-size: 11px; color: var(--ink-3)" @click="state.showActivityPopup = false">
              ✕ 关闭弹窗
            </button>
          </div>
          <div style="font-size: 16.5px; font-weight: 900; color: #472500; margin-bottom: 5px">
            🏠 市房管局赛事特惠：网球公开赛期间购房直减 ¥50,000！
          </div>
          <div style="font-size: 12px; color: #7a4e16; margin-bottom: 10px">
            温泉世家、网球新城等核心区品质楼盘参与，凭京山网球参赛/观赛凭证即享 5 万元购房补贴（往届已热销 60+ 套）；同步支持短/长租网球公寓！
          </div>
          <div class="flex-between">
            <div class="flex-row"><span class="tag gold">房管局官方认证</span><span class="tag green">含网球公寓长短租</span></div>
            <button class="btn-orange" @click="switchModule(5)">查看购房减5万与公寓 →</button>
          </div>
        </div>
        <div v-else class="card card-pad flex-between" style="background: #fff9ef">
          <span style="font-size: 12.5px; font-weight: 700; color: #7a4e16">🎁 活动弹窗已收起（购房减5万元 / 赛事消费券）</span>
          <button class="btn-ghost" @click="state.showActivityPopup = true">重新展开弹窗</button>
        </div>

        <div class="card card-pad">
          <div class="flex-between" style="margin-bottom: 10px">
            <strong style="font-size: 15px">🏆 近期赛事预告 & 热门活动报名</strong>
            <span style="font-size: 12px; color: var(--primary); font-weight: 700; cursor: pointer" @click="switchModule(2)">
              看网球记实时比分 →
            </span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <div class="flex-between" style="background: #f5faf8; padding: 9px 11px; border-radius: 10px">
              <div>
                <div style="font-size: 13px; font-weight: 800">2026中国青少年网球巡回赛总决赛 <span class="tag red">进行中</span></div>
                <div style="font-size: 11px; color: var(--ink-3)">11/24–12/3 · 国际网球中心 · 观赛116.3万 · 实时比分同步</div>
              </div>
              <button class="btn-primary" @click="switchModule(2)">查赛况/交通</button>
            </div>
            <div class="flex-between" style="background: #fff8f4; padding: 9px 11px; border-radius: 10px">
              <div>
                <div style="font-size: 13px; font-weight: 800">京山网球周末分级赛（匹配 {{ state.abilityLevel }} 组） <span class="tag orange">余12位</span></div>
                <div style="font-size: 11px; color: var(--ink-3)">11/29 文峰公园 · 完赛积+120分 · 赠联盟商家票根折扣券</div>
              </div>
              <button class="btn-orange" @click="switchModule(2)">一键报名</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-3">
      <div v-for="t in visibleThemes" :key="t.key" class="card">
        <div
          class="photo-box"
          style="height: 165px"
          @click="
            openPhoto({
              title: t.title,
              photo: t.photo,
              rating: 4.9,
              subtitle: t.desc,
              reviews: ['“线路安排非常合理，打球、游玩和住宿体验全部在线！”'],
            })
          "
        >
          <img :src="t.photo" :alt="t.title" />
          <span class="badge-tl">{{ t.badge }}</span>
          <span class="badge-bl">{{ t.sub }}</span>
        </div>
        <div class="card-pad">
          <div style="font-size: 15.5px; font-weight: 800; margin-bottom: 4px">{{ t.title }}</div>
          <div style="font-size: 12px; color: var(--ink-3); margin-bottom: 10px">{{ t.desc }}</div>
          <div class="flex-between">
            <span class="price">{{ t.price }}<small>{{ t.extra }}</small></span>
            <button :class="t.orange ? 'btn-orange' : 'btn-primary'" @click="switchModule(t.target)">{{ t.btn }}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
