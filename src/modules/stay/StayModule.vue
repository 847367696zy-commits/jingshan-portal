<script setup lang="ts">
import { ref } from 'vue'
import { usePortalStore } from '../../store/usePortalStore'

const { state, openPhoto, openActionModal, createQuickOrder, claimHomeSubsidy } = usePortalStore()
const stayTab = ref<'全部' | '公寓' | '赛事优惠' | '民宿'>('全部')
const aptLeaseMode = ref<'short' | 'long'>('short')
</script>

<template>
  <section>
    <div class="module-header">
      <div class="mh-left">
        <div class="mh-num">05</div>
        <div>
          <h1 class="mh-title">“住”：住宿服务</h1>
          <div class="mh-desc">
            京网推荐住宿（酒店、精品民宿、短/长租网球公寓全覆盖），支持房型价格透明查询与一键预订、赛事合作优惠住宿专区，以及房管局赛事购房减5万元活动
          </div>
        </div>
      </div>
      <div class="mh-tabs">
        <button class="m-tab" :class="{ active: stayTab === '全部' }" @click="stayTab = '全部'">全部住宿</button>
        <button class="m-tab" :class="{ active: stayTab === '公寓' }" @click="stayTab = '公寓'">短/长租网球公寓</button>
        <button class="m-tab" :class="{ active: stayTab === '赛事优惠' }" @click="stayTab = '赛事优惠'">赛事合作优惠专区</button>
        <button class="m-tab" :class="{ active: stayTab === '民宿' }" @click="stayTab = '民宿'">温泉精品民宿</button>
      </div>
    </div>

    <!-- 房管局网球公开赛购房减5万元 -->
    <div class="promo-banner mb-16">
      <div class="flex-row" style="gap: 12px">
        <div
          style="width: 44px; height: 44px; border-radius: 12px; background: #ff5d2a; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0"
        >
          🏠
        </div>
        <div>
          <div style="font-size: 15.5px; font-weight: 900; color: #542600">
            京山市房管局重磅活动：2026京山网球公开赛期间购房直减 ¥50,000！
          </div>
          <div style="font-size: 12px; color: #824e17">
            凭「京山网球」参赛/观赛/订场实名记录，购买核心区「温泉世家」「网球新城」等品质住宅立享 5 万元专属购房补贴（可预约看房专车）
          </div>
        </div>
      </div>
      <div class="flex-row">
        <button
          class="btn-ghost"
          @click="openActionModal({ type: 'inquiry', title: '预约房管局赛事安居看房专车', subtitle: '温泉世家 / 网球新城品质现房 · 凭网球赛事/订场凭证立减 ¥50,000', submitLabel: '预约免费看房专车' })"
        >
          预约看房专车
        </button>
        <button class="btn-orange" @click="claimHomeSubsidy">
          {{ state.claimedHomeSubsidy ? '✅ 已领取5万元补贴凭证' : '领取5万元购房补贴券 →' }}
        </button>
      </div>
    </div>

    <div class="grid-3 mb-16">
      <!-- 短/长租网球公寓（支持租期实时切换） -->
      <div v-if="stayTab === '全部' || stayTab === '公寓'" class="card" style="border: 2px solid var(--primary)">
        <div
          class="photo-box"
          style="height: 175px"
          @click="openPhoto({ title: '京山国际网球公寓（支持日/周/月长短租）', photo: '/images/hotel.jpg', rating: 4.9, subtitle: '百套网球公寓 · 拎包入住 · 距训练基地 300m', reviews: ['“带娃集训住了一个月，自己做饭还能每日免费打球1小时，太值了！”'] })"
        >
          <img src="/images/hotel.jpg" alt="京山国际网球公寓" />
          <span class="badge-tl" style="background: var(--primary)">🏢 特色专区 · 短/长租网球公寓</span>
          <span class="badge-bl">百套网球公寓 · 拎包入住</span>
        </div>
        <div class="card-pad">
          <div class="flex-between">
            <strong style="font-size: 15.5px">京山国际网球公寓</strong>
            <span class="rating-pill">★ 4.9 (246评)</span>
          </div>
          <div class="flex-row" style="margin: 6px 0">
            <button class="m-tab" :class="{ active: aptLeaseMode === 'short' }" style="padding: 3px 10px; font-size: 11px" @click="aptLeaseMode = 'short'">
              短租（日/周租）
            </button>
            <button class="m-tab" :class="{ active: aptLeaseMode === 'long' }" style="padding: 3px 10px; font-size: 11px" @click="aptLeaseMode = 'long'">
              长租（月/季租 · 赠球场）
            </button>
          </div>
          <div style="background: #edf8f3; border-radius: 9px; padding: 8px 10px; font-size: 11.5px; margin: 6px 0; color: #0e4f39">
            <template v-if="aptLeaseMode === 'short'">
              • <strong>短租体验（1–14天）：</strong>一室一厅厨卫全配 ¥168/天，7天周租仅 ¥1,080<br />
              • 距训练基地 300m，适合参赛家庭与周末球友
            </template>
            <template v-else>
              • <strong>长租旅居（月租/季租）：</strong>¥1,680/月（含物业宽带）<br />
              • <strong>专属礼遇：</strong>赠送每日 1 小时免费网球订场权益！
            </template>
          </div>
          <div class="review-quote">💬 陪读家长评：“带娃集训住了一个月，自己做饭还能免费打球太值了！”</div>
          <div class="flex-between" style="margin-top: 10px">
            <span class="price">
              {{ aptLeaseMode === 'short' ? '¥168' : '¥1,680' }}
              <small>{{ aptLeaseMode === 'short' ? '/天' : '/月 · 赠免费场' }}</small>
            </span>
            <button
              class="btn-primary"
              @click="
                createQuickOrder(
                  '住宿',
                  aptLeaseMode === 'short' ? '京山国际网球公寓（短租体验）' : '京山国际网球公寓（月租长租）',
                  aptLeaseMode === 'short' ? '厨卫全配 · 拎包入住' : '赠每日1小时免费球场权益',
                  aptLeaseMode === 'short' ? 168 : 1680,
                  100,
                )
              "
            >
              立即预订{{ aptLeaseMode === 'short' ? '短租' : '长租' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 赛事合作优惠酒店 -->
      <div v-if="stayTab === '全部' || stayTab === '赛事优惠'" class="card">
        <div class="photo-box" style="height: 175px">
          <img src="/images/hotel.jpg" alt="文峰花园酒店" />
          <span class="badge-tl">🏆 赛事合作优惠专区 · 票根85折</span>
          <span class="badge-bl">网球联盟酒店 · 距赛场0.8km</span>
        </div>
        <div class="card-pad">
          <div class="flex-between">
            <strong style="font-size: 15.5px">文峰花园酒店（五星主题合作）</strong>
            <span class="rating-pill">★ 4.9 (815评)</span>
          </div>
          <div style="font-size: 11.5px; color: var(--ink-3); margin: 3px 0">📍 含赛场免费摆渡车、球拍烘干寄存、延迟退房至14:00</div>
          <div style="background: #f5f8fa; border-radius: 9px; padding: 8px 10px; font-size: 11.5px; margin: 7px 0">
            • <strong>观景大床房（38㎡含双早）：</strong>赛事价 ¥318 <s style="color: #999">¥378</s>（剩6间）<br />
            • <strong>运动员双床房（42㎡含双早）：</strong>赛事价 ¥348（剩4间）
          </div>
          <div class="review-quote">💬 评：“出示打球电子票根自动打85折，房间安静早餐丰富。”</div>
          <div class="flex-between" style="margin-top: 10px">
            <span class="price">¥318<small>/晚起 · 积+60分</small></span>
            <button
              class="btn-orange"
              @click="createQuickOrder('住宿', '文峰花园酒店 · 观景大床房 (1晚)', `已核销票根 ${state.ticketStubCode} 享85折`, 318, 60)"
            >
              一键预订
            </button>
          </div>
        </div>
      </div>

      <!-- 温泉民宿 -->
      <div v-if="stayTab === '全部' || stayTab === '民宿'" class="card">
        <div class="photo-box" style="height: 175px">
          <img src="/images/hotspring.jpg" alt="温泉运动民宿" />
          <span class="badge-tl">♨️ 联盟精品民宿 · 票根立减¥60</span>
          <span class="badge-bl">温泉度假区 · 私汤入户</span>
        </div>
        <div class="card-pad">
          <div class="flex-between">
            <strong style="font-size: 15.5px">京源温泉运动私汤民宿</strong>
            <span class="rating-pill">★ 4.9 (418评)</span>
          </div>
          <div style="font-size: 11.5px; color: var(--ink-3); margin: 3px 0">📍 温泉新区 · 打完球泡天然矿泉舒缓肌肉 · 含充电车位</div>
          <div style="background: #f5f8fa; border-radius: 9px; padding: 8px 10px; font-size: 11.5px; margin: 7px 0">
            • <strong>庭院私汤大床房（48㎡）：</strong>¥468/晚（含双人温泉票）<br />
            • <strong>两居亲子度假套房（72㎡）：</strong>¥698/晚（适合家庭参赛）
          </div>
          <div class="review-quote">💬 评：“带家人来玩两天，民宿环境绝美，泡完汤打球浑身轻松！”</div>
          <div class="flex-between" style="margin-top: 10px">
            <span class="price">¥468<small>/晚起</small></span>
            <button
              class="btn-primary"
              @click="createQuickOrder('住宿', '京源温泉运动私汤民宿 (1晚)', '含双人天然温泉票与充电车位', 468, 60)"
            >
              一键预订
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-pad">
      <strong style="font-size: 14.5px; display: block; margin-bottom: 8px">
        📋 更多赛事合作优惠住宿 & 网球联盟酒店（持订场/参赛电子票根直享优惠）
      </strong>
      <table class="clean-table">
        <thead>
          <tr><th>住宿名称</th><th>类型</th><th>距国际网球中心</th><th>主推房型</th><th>日常价 / 赛事票根价</th><th>评分</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>网球运动酒店</strong></td>
            <td><span class="tag blue">联盟酒店</span></td>
            <td>0.5 km（步行6分钟）</td>
            <td>运动双床房（含早）</td>
            <td><s>¥328</s> → <strong style="color: var(--accent)">¥278/晚</strong></td>
            <td>★ 4.8</td>
            <td><button class="btn-primary" style="padding: 4px 10px" @click="createQuickOrder('住宿', '网球运动酒店 · 运动双床房', '赛事票根专享价', 278, 60)">一键预订</button></td>
          </tr>
          <tr>
            <td><strong>湖畔精品酒店</strong></td>
            <td><span class="tag blue">联盟酒店</span></td>
            <td>1.4 km（摆渡5分钟）</td>
            <td>湖景行政大床房</td>
            <td><s>¥418</s> → <strong style="color: var(--accent)">¥355/晚</strong></td>
            <td>★ 4.9</td>
            <td><button class="btn-primary" style="padding: 4px 10px" @click="createQuickOrder('住宿', '湖畔精品酒店 · 湖景大床房', '赛事票根专享价', 355, 60)">一键预订</button></td>
          </tr>
          <tr>
            <td><strong>温泉新区青年球友公寓</strong></td>
            <td><span class="tag green">短/长租公寓</span></td>
            <td>0.6 km</td>
            <td>Loft复式单间</td>
            <td>日租¥138 / <strong style="color: var(--primary)">月租¥1,380</strong></td>
            <td>★ 4.8</td>
            <td><button class="btn-primary" style="padding: 4px 10px" @click="createQuickOrder('住宿', '温泉新区青年球友公寓（长租1月）', 'Loft复式单间 · 拎包入住', 1380, 100)">看房/预订</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
