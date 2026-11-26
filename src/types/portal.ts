export type ModuleId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
export type RadiusOption = '500m' | '1公里' | '2公里'
export type VisitorOrigin =
  | '武汉市（省内游客）'
  | '京山本地市民'
  | '荆门市（周边游客）'
  | '深圳市（省外游客）'

export interface AbilityDimensions {
  serve: number
  baseline: number
  volley: number
  footwork: number
  stamina: number
}

export interface LiveMatch {
  id: string
  venue: string
  courtNo: string
  status: '激战中' | '进行中' | '已完赛'
  playerA: string
  playerB: string
  setsA: string[]
  setsB: string[]
}

export interface CourtSlot {
  time: string
  price: number
  memberPrice: number
  remaining: number
  booked?: boolean
}

export interface CourtVenue {
  id: string
  name: string
  region: '温泉街道' | '新市街道' | '永兴街道'
  surfaces: ('硬地' | '红土' | '室内风雨')[]
  photo: string
  galleryCount: number
  liveViewers: number
  rating: number
  reviewCount: number
  openHours: string
  priceDesc: string
  tags: string[]
  parkingName: string
  parkingRemain: number
  chargerName: string
  chargerRemain: number
  quote: string
  slots: CourtSlot[]
}

export interface PortalOrder {
  id: string
  category: '场地' | '住宿' | '门票' | '课程' | '商品'
  title: string
  subtitle: string
  time: string
  amount: number
  status: '待核销' | '已确认' | '待使用' | '待上课' | '已取消'
  cancellable?: boolean
}

export interface FeedbackPost {
  id: string
  author: string
  origin: string
  rating: number
  title: string
  photo: string
  likes: number
  liked?: boolean
  category: string
}

export interface ComplaintTicket {
  id: string
  category: string
  target: string
  content: string
  status: '已分办至对应部门' | '已办结 · 反馈满意'
  dept: string
  createdAt: string
}

export interface CouponItem {
  id: string
  title: string
  desc: string
  badge: string
  status: '有效中' | '已核销'
}

export interface LightboxPayload {
  title: string
  photo: string
  rating: number
  subtitle: string
  reviews: string[]
}

export interface BookingDraft {
  venueId: string
  venueName: string
  slotTime: string
  price: number
  memberPrice: number
  parkingName: string
  chargerName: string
}

export interface MenuDish {
  name: string
  price: number
  stubPrice: number
  tag?: string
}

export type ActionModalPayload =
  | { type: 'video'; title: string; duration: string }
  | { type: 'livecam'; venueName: string; photo: string; viewers: number }
  | { type: 'menu'; shopName: string; dishes: MenuDish[]; dist: string }
  | { type: 'nav'; placeName: string; distance: string; driveMin: string; tip: string }
  | { type: 'stub'; code: string }
  | { type: 'audio'; spotName: string; duration: string; script: string; photo: string }
  | { type: 'inquiry'; title: string; subtitle: string; submitLabel: string }
  | { type: 'miniprogram'; appName: string; desc: string }
