import { useState, type ReactNode } from "react";

const NEWS_IMAGE =
  "https://images.unsplash.com/photo-1623546802249-89cf2bba0d38?auto=format&fit=crop&w=900&q=80";
const RAIN_IMAGE =
  "https://images.unsplash.com/photo-1696671648700-07cf7f5a0d87?auto=format&fit=crop&w=600&q=80";

function Icon({ children, filled = false }: { children: ReactNode; filled?: boolean }) {
  return <span className={`material-symbols-rounded ${filled ? "filled" : ""}`}>{children}</span>;
}

function MButton({
  children,
  variant = "primary",
  icon,
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "outline" | "text" | "danger";
  icon?: string;
  onClick?: () => void;
}) {
  return (
    <button className={`m-button ${variant}`} onClick={onClick}>
      {icon && <Icon>{icon}</Icon>}
      {children}
    </button>
  );
}

function IconButton({ icon, onClick, label }: { icon: string; onClick?: () => void; label?: string }) {
  return (
    <button className="icon-button" onClick={onClick} aria-label={label ?? icon}>
      <Icon>{icon}</Icon>
    </button>
  );
}

function Field({
  label,
  value,
  error,
  icon,
  trailing,
}: {
  label: string;
  value?: string;
  error?: string;
  icon?: string;
  trailing?: string;
}) {
  return (
    <div className={`field ${error ? "field-error" : ""}`}>
      <span className="field-label">{label}</span>
      <div className="field-content">
        {icon && <Icon>{icon}</Icon>}
        <span>{value || " "}</span>
        {trailing && <IconButton icon={trailing} />}
      </div>
      {error && <small>{error}</small>}
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function TopBar({
  title,
  back = false,
  transparent = false,
  actions = [],
  onMenu,
}: {
  title: ReactNode;
  back?: boolean;
  transparent?: boolean;
  actions?: string[];
  onMenu?: () => void;
}) {
  return (
    <div className={`topbar ${transparent ? "transparent" : ""}`}>
      <IconButton icon={back ? "arrow_back" : "menu"} onClick={onMenu} />
      <div className="topbar-title">{title}</div>
      <div className="topbar-actions">
        {actions.map((action) => (
          <IconButton key={action} icon={action} onClick={action === "more_vert" ? onMenu : undefined} />
        ))}
      </div>
    </div>
  );
}

const navItems = [
  ["partly_cloudy_day", "Thời tiết"],
  ["location_city", "Thành phố"],
  ["newspaper", "Tin tức"],
  ["person", "Hồ sơ"],
];

function BottomNav({ active = 0 }: { active?: number }) {
  return (
    <div className="bottom-nav">
      {navItems.map(([icon, label], index) => (
        <button
          className={`nav-item ${active === index ? "active" : ""}`}
          key={label}
          onClick={() => document.getElementById(["home", "cities", "news", "profile"][index])?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="nav-pill"><Icon filled={active === index}>{icon}</Icon></span>
          <small>{label}</small>
        </button>
      ))}
    </div>
  );
}

function Phone({
  number,
  title,
  id,
  children,
  dark = false,
  weather = false,
  className = "",
}: {
  number: string;
  title: string;
  id: string;
  children: ReactNode;
  dark?: boolean;
  weather?: boolean;
  className?: string;
}) {
  return (
    <article className="screen-item" id={id}>
      <div className="screen-label"><span>{number}</span><b>{title}</b></div>
      <div className={`phone ${dark ? "dark" : ""} ${weather ? "weather" : ""} ${className}`}>
        <div className="statusbar"><span>09:41</span><span className="status-icons"><Icon>signal_cellular_alt</Icon><Icon>wifi</Icon><Icon>battery_full</Icon></span></div>
        <div className="phone-content">{children}</div>
      </div>
    </article>
  );
}

const hourly = [
  ["Bây giờ", "partly_cloudy_day", "28°", "10%"],
  ["10:00", "sunny", "29°", "5%"],
  ["11:00", "sunny", "30°", "5%"],
  ["12:00", "partly_cloudy_day", "31°", "15%"],
  ["13:00", "rainy", "29°", "45%"],
  ["14:00", "rainy", "28°", "55%"],
];

const days = [
  ["Hôm nay", "partly_cloudy_day", "10%", "24°", "31°"],
  ["Thứ Ba", "rainy", "65%", "23°", "29°"],
  ["Thứ Tư", "thunderstorm", "75%", "22°", "28°"],
  ["Thứ Năm", "cloudy", "20%", "23°", "30°"],
  ["Thứ Sáu", "sunny", "5%", "24°", "32°"],
];

function WeatherHero({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <div className="pull-indicator"><Icon>keyboard_arrow_down</Icon><span>Kéo để cập nhật</span></div>
      <TopBar
        transparent
        title={<><Icon filled>location_on</Icon><span>Hà Nội</span><Icon>expand_more</Icon></>}
        actions={["search", "more_vert"]}
      />
      <div className="weather-hero">
        <div className="weather-orb"><Icon filled>partly_cloudy_day</Icon></div>
        <div className="temperature">28°</div>
        <b>Có mây từng lúc</b>
        <span>Cao 31° · Thấp 24°</span>
        <span className="soft">Cảm giác như 30° · Cập nhật 5 phút trước</span>
      </div>
      <div className="hourly-scroll glass-card">
        {hourly.map(([time, icon, temp, rain]) => (
          <div className="hour" key={time}>
            <small>{time}</small><Icon filled>{icon}</Icon><b>{temp}</b><span>{rain}</span>
          </div>
        ))}
      </div>
      <Card className="forecast-card glass-card">
        <div className="section-heading"><b>Dự báo 7 ngày</b><Icon>calendar_month</Icon></div>
        {days.map(([day, icon, rain, low, high], i) => (
          <div className="day-row" key={day}>
            <span>{day}</span><Icon filled>{icon}</Icon><small>{rain}</small><b>{low}</b>
            <span className="range"><i style={{ left: `${8 + i * 5}%`, width: `${55 - i * 2}%` }} /></span><b>{high}</b>
          </div>
        ))}
      </Card>
      <div className="detail-grid">
        {[
          ["humidity_percentage", "Độ ẩm", "72%", "Điểm sương 23°"],
          ["air", "Gió", "12 km/h", "Đông Nam"],
          ["speed", "Áp suất", "1008 hPa", "Đang giảm"],
          ["wb_sunny", "Chỉ số UV", "6 · Cao", "Bảo vệ da"],
          ["visibility", "Tầm nhìn", "9,7 km", "Rõ"],
          ["cloud", "Mây che phủ", "46%", "Từng lúc"],
        ].map(([icon, label, value, note]) => (
          <Card className="metric glass-card" key={label}>
            <span><Icon>{icon}</Icon>{label}</span><b>{value}</b><small>{note}</small>
          </Card>
        ))}
      </div>
      <Card className="sun-card glass-card">
        <div className="section-heading"><b>Mặt trời</b><span>12 giờ 35 phút</span></div>
        <div className="sun-arc"><i /><Icon filled>sunny</Icon></div>
        <div className="sun-times"><span><small>Mọc</small><b>05:38</b></span><span><small>Lặn</small><b>18:13</b></span></div>
      </Card>
      <Card className="glass-card aqi">
        <div className="section-heading"><span><b>Chất lượng không khí</b><small> · Hà Nội</small></span><b className="aqi-value">68</b></div>
        <h3>Trung bình</h3><p>Nhóm nhạy cảm nên hạn chế hoạt động ngoài trời kéo dài.</p>
        <div className="aqi-scale"><i /></div>
        <div className="scale-labels"><span>Tốt</span><span>Trung bình</span><span>Xấu</span></div>
      </Card>
      <Card className="glass-card chart-card">
        <div className="section-heading"><b>Nhiệt độ 24 giờ</b><span>°C</span></div>
        <svg viewBox="0 0 300 95" role="img" aria-label="Biểu đồ nhiệt độ">
          <defs><linearGradient id={`chart-${dark}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FBBF24" stopOpacity=".45"/><stop offset="1" stopColor="#FBBF24" stopOpacity="0"/></linearGradient></defs>
          <path className="chart-fill" d="M0,70 C35,58 52,22 87,26 S138,52 170,39 S215,13 245,25 S278,52 300,44 L300,95 L0,95Z" fill={`url(#chart-${dark})`} />
          <path d="M0,70 C35,58 52,22 87,26 S138,52 170,39 S215,13 245,25 S278,52 300,44" fill="none" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="chart-labels"><span>09h</span><span>15h</span><span>21h</span><span>03h</span><span>09h</span></div>
      </Card>
      <BottomNav />
    </>
  );
}

function AuthIllustration({ type = "login" }: { type?: "login" | "forgot" }) {
  return (
    <div className={`auth-illustration ${type}`}>
      <div className="sky-logo"><Icon filled>partly_cloudy_day</Icon></div>
      <i className="cloud cloud-one" /><i className="cloud cloud-two" />
    </div>
  );
}

function Splash() {
  return (
    <div className="splash">
      <div className="splash-logo"><Icon filled>partly_cloudy_day</Icon></div>
      <h1>SkyCast</h1><p>Thời tiết trong tầm tay</p>
      <div className="loading-ring" /><small>Đang cập nhật bầu trời...</small>
      <div className="motion-note"><Icon>animation</Icon> Logo phóng to + mờ dần</div>
    </div>
  );
}

function Login() {
  return (
    <div className="auth-screen">
      <AuthIllustration />
      <div className="auth-copy"><small>CHÀO MỪNG TRỞ LẠI</small><h1>Đăng nhập</h1><p>Xem thời tiết nơi bạn quan tâm.</p></div>
      <Field label="Email" value="minh.nguyen@" icon="mail" error="Email không đúng định dạng" />
      <Field label="Mật khẩu" value="•••••" icon="lock" trailing="visibility_off" error="Mật khẩu phải có ít nhất 8 ký tự" />
      <button className="text-link right">Quên mật khẩu?</button>
      <MButton>Đăng nhập</MButton>
      <div className="divider"><span>hoặc</span></div>
      <MButton variant="outline" icon="language">Đăng nhập với Google</MButton>
      <p className="auth-foot">Chưa có tài khoản? <b>Đăng ký</b></p>
    </div>
  );
}

function Register() {
  return (
    <div className="form-screen">
      <TopBar back title="Tạo tài khoản" />
      <div className="form-body">
        <div className="small-logo"><Icon filled>partly_cloudy_day</Icon></div>
        <h1>Bắt đầu cùng SkyCast</h1><p>Nhận dự báo cá nhân hóa mỗi ngày.</p>
        <Field label="Họ và tên" value="Nguyễn Minh Anh" icon="person" />
        <Field label="Email" value="minhanh@gmail.com" icon="mail" />
        <Field label="Mật khẩu" value="••••••••••" icon="lock" trailing="visibility" />
        <div className="strength"><i /><i /><i /><i className="muted" /><span>Mạnh</span></div>
        <Field label="Xác nhận mật khẩu" value="••••••••••" icon="lock" />
        <label className="check-row"><input type="checkbox" defaultChecked /><span>Tôi đồng ý với <b>Điều khoản</b> và <b>Chính sách riêng tư</b></span></label>
        <MButton>Tạo tài khoản</MButton>
        <p className="auth-foot">Đã có tài khoản? <b>Đăng nhập</b></p>
      </div>
    </div>
  );
}

function Forgot() {
  return (
    <div className="form-screen">
      <TopBar back title="" />
      <div className="form-body centered">
        <AuthIllustration type="forgot" />
        <h1>Quên mật khẩu?</h1><p>Nhập email đã đăng ký. Chúng tôi sẽ gửi liên kết đặt lại mật khẩu.</p>
        <Field label="Email" value="minhanh@gmail.com" icon="mail" />
        <MButton>Gửi liên kết đặt lại</MButton>
        <Card className="success-box"><Icon filled>check_circle</Icon><span><b>Đã gửi email!</b><small>Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.</small></span></Card>
        <button className="text-link"><Icon>arrow_back</Icon> Quay lại đăng nhập</button>
      </div>
    </div>
  );
}

function MenuState() {
  return (
    <div className="weather-bg rainy">
      <WeatherHero />
      <div className="scrim" />
      <div className="popup-menu home-menu">
        {[
          ["refresh", "Làm mới"], ["straighten", "Đơn vị", "chevron_right"], ["share", "Chia sẻ thời tiết"],
          ["settings", "Cài đặt"], ["info", "Giới thiệu"],
        ].map(([icon, label, tail]) => <div className="menu-row" key={label}><Icon>{icon}</Icon><span>{label}</span>{tail && <Icon>{tail}</Icon>}</div>)}
      </div>
      <div className="popup-menu submenu">
        <b>Đơn vị đo</b>
        <div className="sub-choice"><span>Nhiệt độ</span><span className="segmented"><i>°C</i><i>°F</i></span></div>
        <div className="sub-choice"><span>Gió</span><span className="segmented"><i>km/h</i><i>m/s</i></span></div>
      </div>
      <div className="component-note">PopupMenu + SubMenu</div>
    </div>
  );
}

function DrawerState() {
  const items = [
    ["partly_cloudy_day", "Thời tiết"], ["location_city", "Thành phố đã lưu"], ["map", "Bản đồ thời tiết"],
    ["newspaper", "Tin tức"], ["settings", "Cài đặt"], ["info", "Giới thiệu"], ["logout", "Đăng xuất"],
  ];
  return (
    <div className="weather-bg sunny drawer-demo">
      <WeatherHero />
      <div className="scrim" />
      <aside className="drawer">
        <div className="drawer-header">
          <div className="avatar">MA</div><b>Minh Anh</b><small>minhanh@gmail.com</small>
          <div className="drawer-weather"><Icon filled>partly_cloudy_day</Icon><span><b>28°</b><small>Hà Nội</small></span></div>
        </div>
        <nav>
          {items.map(([icon, label], i) => (
            <div className={`drawer-item ${i === 0 ? "active" : ""} ${i === 6 ? "logout" : ""}`} key={label}><Icon filled={i === 0}>{icon}</Icon><span>{label}</span></div>
          ))}
        </nav>
        <small className="drawer-version">SkyCast 1.0.0</small>
      </aside>
    </div>
  );
}

const cityData = [
  ["Hà Nội", "09:41", "Có mây", "partly_cloudy_day", "28°", "sunny"],
  ["TP. Hồ Chí Minh", "09:41", "Nắng", "sunny", "33°", "warm"],
  ["Đà Nẵng", "09:41", "Mưa rào", "rainy", "27°", "rain-city"],
  ["Đà Lạt", "09:41", "Nhiều mây", "cloudy", "20°", "cloud-city"],
];

function Cities() {
  return (
    <div className="surface-screen has-nav">
      <TopBar title="Thành phố" actions={["more_vert"]} />
      <div className="content-pad">
        <div className="searchbox"><Icon>search</Icon><span>Tìm thành phố...</span><Icon>mic</Icon></div>
        <Card className="current-location"><Icon filled>my_location</Icon><span><small>Vị trí hiện tại</small><b>Hà Nội</b><em>Có mây · 28°</em></span><Icon>chevron_right</Icon></Card>
        <div className="section-heading"><b>Đã lưu</b><small>4 thành phố</small></div>
        <div className="city-list">
          {cityData.map(([city, time, condition, icon, temp, bg], i) => (
            <Card className={`city-card ${bg}`} key={city}>
              <span><b>{city}</b><small>{time} · {condition}</small></span>
              <Icon filled>{icon}</Icon><strong>{temp}</strong>
              {i === 1 && <div className="context-menu">
                {["Đặt làm mặc định", "Xem chi tiết", "Chia sẻ", "Xóa"].map((x, n) => <span className={n === 3 ? "danger-text" : ""} key={x}>{x}</span>)}
              </div>}
            </Card>
          ))}
        </div>
      </div>
      <button className="fab"><Icon>add</Icon></button>
      <BottomNav active={1} />
    </div>
  );
}

function SearchCity() {
  return (
    <div className="surface-screen">
      <TopBar back title="Tìm thành phố" />
      <div className="content-pad">
        <div className="searchbox active"><Icon>search</Icon><span>Đà</span><Icon>close</Icon></div>
        <p className="eyebrow">GỢI Ý</p>
        <div className="suggestions">
          {[
            ["Đà Nẵng", "Việt Nam"], ["Đà Lạt", "Lâm Đồng, Việt Nam"], ["Đắk Lắk", "Việt Nam"], ["Đại Lý", "Vân Nam, Trung Quốc"],
          ].map(([city, sub]) => <div className="list-row" key={city}><Icon>location_on</Icon><span><b>{city}</b><small>{sub}</small></span><Icon>north_west</Icon></div>)}
        </div>
        <div className="section-heading"><b>Tìm kiếm gần đây</b><button className="text-link">Xóa</button></div>
        <div className="recent-row"><Icon>history</Icon><span>Hội An</span><Icon>close</Icon></div>
        <div className="recent-row"><Icon>history</Icon><span>Sa Pa</span><Icon>close</Icon></div>
        <p className="eyebrow">THÀNH PHỐ PHỔ BIẾN</p>
        <div className="chips">{["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Huế", "Nha Trang"].map(x => <span className="chip" key={x}>{x}</span>)}</div>
        <div className="empty-mini"><Icon>travel_explore</Icon><b>Không tìm thấy?</b><small>Thử tên thành phố hoặc mã bưu chính khác.</small></div>
      </div>
    </div>
  );
}

function DayDetail() {
  return (
    <div className="surface-screen detail-screen">
      <TopBar back title="Chi tiết dự báo" actions={["share"]} />
      <div className="date-tabs">
        {["T2|14", "T3|15", "T4|16", "T5|17", "T6|18", "T7|19", "CN|20"].map((x, i) => {
          const [d, n] = x.split("|"); return <span className={i === 1 ? "active" : ""} key={x}><small>{d}</small><b>{n}</b></span>;
        })}
      </div>
      <div className="day-summary">
        <span><small>THỨ BA, 15 THÁNG 10</small><h1>Mưa rào</h1><p>Khả năng có mưa vào buổi chiều.</p></span>
        <Icon filled>rainy</Icon><strong>29°<small>/23°</small></strong>
      </div>
      <div className="content-pad compact">
        <Card className="chart-card">
          <div className="section-heading"><b>Nhiệt độ</b><span>Cảm giác thực</span></div>
          <svg viewBox="0 0 300 90"><path d="M0 64 C30 52 45 29 77 25 S130 34 160 45 215 57 240 42 275 29 300 36" fill="none" stroke="#2563EB" strokeWidth="3"/><path d="M0 70 C40 65 51 42 85 38 S145 46 181 55 240 59 300 45" fill="none" stroke="#94A3B8" strokeDasharray="5 5" strokeWidth="2"/></svg>
          <div className="chart-labels"><span>06h</span><span>12h</span><span>18h</span><span>00h</span></div>
        </Card>
        <Card>
          <div className="section-heading"><b>Khả năng mưa</b><b className="blue">65%</b></div>
          <div className="rain-bars">{[20,30,55,78,66,42,25,12].map((h,i)=><span key={i}><i style={{height:`${h}%`}}/><small>{6+i*3}h</small></span>)}</div>
        </Card>
        <div className="section-heading"><b>Theo giờ</b><small>24 giờ</small></div>
        <Card className="hour-list">
          {hourly.slice(1,6).map(([time, icon, temp, rain])=><div className="hour-row" key={time}><b>{time}</b><Icon filled>{icon}</Icon><strong>{temp}</strong><span><Icon>water_drop</Icon>{rain}</span><small>12 km/h</small></div>)}
        </Card>
        <div className="two-cards"><Card><Icon>air</Icon><small>Gió</small><b>12 km/h</b><span>Đông Nam</span></Card><Card><Icon>humidity_percentage</Icon><small>Độ ẩm</small><b>78%</b><span>Điểm sương 23°</span></Card></div>
      </div>
    </div>
  );
}

function News() {
  return (
    <div className="surface-screen has-nav">
      <TopBar title="Tin tức" actions={["search", "more_vert"]} />
      <div className="chip-scroll">{["Thời tiết", "Thời sự", "Môi trường", "Khoa học"].map((x,i)=><span className={`chip ${i===0?"selected":""}`} key={x}>{x}</span>)}</div>
      <div className="content-pad news-pad">
        <Card className="featured-news">
          <img src={NEWS_IMAGE} alt="Bầu trời nhiều mây trên thành phố" />
          <div className="news-overlay"><span className="tag">NỔI BẬT</span><h2>Không khí lạnh tăng cường, miền Bắc sắp chuyển mưa rét</h2><small>VnExpress · 25 phút trước</small></div>
        </Card>
        <div className="section-heading"><b>Mới nhất</b><button className="text-link">Xem tất cả</button></div>
        {[
          ["Cảnh báo mưa lớn diện rộng tại miền Trung", "Trung tâm KTTV", RAIN_IMAGE],
          ["Nắng nóng quay lại Nam Bộ trong tuần tới", "Tuổi Trẻ", NEWS_IMAGE],
        ].map(([title,source,img],i)=><Card className="news-card" key={title}><img src={img} alt="" /><span><h3>{title}</h3><small>{source} · {i+1} giờ trước</small></span><Icon>more_vert</Icon>{i===0&&<div className="news-context">{["Mở trong trình duyệt","Chia sẻ","Lưu bài viết","Sao chép liên kết"].map(x=><span key={x}>{x}</span>)}</div>}</Card>)}
        <p className="eyebrow">ĐANG TẢI THÊM</p>
        <Card className="skeleton-card"><i/><span><i/><i/><i/></span></Card>
      </div>
      <BottomNav active={2} />
    </div>
  );
}

function Article() {
  return (
    <div className="surface-screen article-screen">
      <TopBar back title="" actions={["share","bookmark"]} />
      <img className="article-hero" src={NEWS_IMAGE} alt="Thành phố dưới trời nhiều mây" />
      <div className="article-body">
        <span className="tag blue-tag">THỜI TIẾT</span>
        <h1>Không khí lạnh tăng cường, miền Bắc sắp chuyển mưa rét</h1>
        <div className="source-row"><div className="source-logo">VnE</div><span><b>VnExpress</b><small>14/10/2026 · 08:30</small></span></div>
        <p><b>Từ đêm nay, không khí lạnh sẽ ảnh hưởng đến khu vực Đông Bắc Bộ, sau đó mở rộng xuống Bắc Trung Bộ.</b></p>
        <p>Trung tâm Dự báo Khí tượng Thủy văn Quốc gia cho biết, Hà Nội có mưa rào rải rác, nhiệt độ thấp nhất phổ biến 19–21°C.</p>
        <blockquote>Người dân cần chuẩn bị áo ấm và theo dõi các bản tin dự báo mới nhất.</blockquote>
        <p>Trên biển, gió đông bắc mạnh dần lên cấp 6, giật cấp 8; sóng biển cao từ 2–4 mét.</p>
        <MButton variant="outline" icon="open_in_new">Đọc bài gốc</MButton>
      </div>
    </div>
  );
}

function Profile({ onLogout, dark, onDark }: { onLogout:()=>void; dark:boolean; onDark:()=>void }) {
  const rows=[["edit","Chỉnh sửa hồ sơ",""],["lock","Đổi mật khẩu",""],["home_pin","Thành phố mặc định","Hà Nội"],["notifications","Thông báo","Bật"],["dark_mode","Giao diện sáng/tối","switch"],["language","Ngôn ngữ","Tiếng Việt"]];
  return (
    <div className="surface-screen has-nav profile-screen">
      <TopBar title="Hồ sơ" actions={["settings"]} />
      <div className="profile-header">
        <div className="profile-avatar">MA<button><Icon>photo_camera</Icon></button></div><h2>Nguyễn Minh Anh</h2><p>minhanh@gmail.com</p><small>Thành viên từ 10/2026</small>
      </div>
      <div className="stats"><span><b>4</b><small>Thành phố đã lưu</small></span><i/><span><b>12</b><small>Bài viết đã lưu</small></span></div>
      <div className="content-pad profile-list">
        <Card>
          {rows.map(([icon,label,value])=><div className="settings-row" key={label}><span className="icon-tile"><Icon>{icon}</Icon></span><b>{label}</b>{value==="switch"?<button className={`switch ${dark?"on":""}`} onClick={onDark}><i/></button>:<><small>{value}</small><Icon>chevron_right</Icon></>}</div>)}
        </Card>
        <MButton variant="danger" icon="logout" onClick={onLogout}>Đăng xuất</MButton>
      </div>
      <BottomNav active={3} />
    </div>
  );
}

function EditProfile() {
  return (
    <div className="surface-screen">
      <TopBar back title="Chỉnh sửa hồ sơ" />
      <div className="content-pad edit-form">
        <div className="edit-avatar">MA<button><Icon>photo_camera</Icon></button></div>
        <button className="text-link">Thay đổi ảnh đại diện</button>
        <Field label="Họ và tên" value="Nguyễn Minh Anh" icon="person" />
        <Field label="Số điện thoại" value="0912 345 678" icon="phone" />
        <Field label="Ngày sinh" value="18/08/1998" icon="calendar_month" trailing="arrow_drop_down" />
        <div className="radio-section"><small>GIỚI TÍNH</small><label><input type="radio" defaultChecked name="gender"/> Nam</label><label><input type="radio" name="gender"/> Nữ</label><label><input type="radio" name="gender"/> Khác</label></div>
        <MButton>Lưu thay đổi</MButton>
        <div className="date-picker-preview"><div className="date-head"><small>CHỌN NGÀY</small><b>Th 3, 18 thg 8</b></div><div className="calendar-mini"><b>Tháng 8, 1998</b><div>{["T2","T3","T4","T5","T6","T7","CN",...Array.from({length:31},(_,i)=>String(i+1))].map((x,i)=><span className={x==="18"?"selected":""} key={`${x}-${i}`}>{x}</span>)}</div></div></div>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="surface-screen settings-screen">
      <TopBar back title="Cài đặt" />
      <div className="content-pad">
        <p className="eyebrow blue">ĐƠN VỊ</p><Card>
          <div className="setting-block"><b>Nhiệt độ</b><div className="segmented wide"><i>°C</i><i>°F</i></div></div>
          <div className="setting-block"><b>Tốc độ gió</b><div className="segmented wide"><i>km/h</i><i>m/s</i></div></div>
        </Card>
        <p className="eyebrow blue">THÔNG BÁO</p><Card>
          <div className="settings-row"><span className="icon-tile"><Icon>schedule</Icon></span><span><b>Dự báo hằng ngày</b><small>07:00 mỗi ngày</small></span><button className="switch on"><i/></button></div>
          <div className="settings-row"><span className="icon-tile"><Icon>warning</Icon></span><span><b>Cảnh báo thời tiết</b><small>Bão, mưa lớn, nắng nóng</small></span><button className="switch on"><i/></button></div>
        </Card>
        <p className="eyebrow blue">GIAO DIỆN</p><Card><div className="theme-options">{["Sáng","Tối","Hệ thống"].map((x,i)=><span className={i===2?"selected":""} key={x}><Icon>{["light_mode","dark_mode","settings_brightness"][i]}</Icon><b>{x}</b></span>)}</div></Card>
        <p className="eyebrow blue">DỮ LIỆU & ỨNG DỤNG</p><Card>
          <div className="settings-row"><Icon>sync</Icon><b>Tự động cập nhật</b><small>30 phút</small><Icon>chevron_right</Icon></div>
          <div className="settings-row"><Icon>delete_sweep</Icon><b>Xóa bộ nhớ đệm</b><small>24,8 MB</small><Icon>chevron_right</Icon></div>
          <div className="settings-row"><Icon>info</Icon><b>Phiên bản</b><small>1.0.0</small></div>
        </Card>
      </div>
    </div>
  );
}

function States({ onLogout }: { onLogout:()=>void }) {
  return (
    <div className="states-screen">
      <TopBar title="Dialogs & states" />
      <div className="content-pad state-stack">
        <div className="alert-banner"><Icon filled>thunderstorm</Icon><span><b>Cảnh báo mưa dông</b><small>Mưa lớn và gió giật từ 15:00–18:00 tại Hà Nội.</small></span><Icon>close</Icon></div>
        <Card className="dialog">
          <Icon filled>logout</Icon><h3>Đăng xuất khỏi SkyCast?</h3><p>Bạn sẽ cần đăng nhập lại để đồng bộ các thành phố đã lưu.</p>
          <div><MButton variant="text">Hủy</MButton><MButton onClick={onLogout}>Đăng xuất</MButton></div>
        </Card>
        <Card className="dialog permission">
          <div className="permission-icon"><Icon filled>location_on</Icon></div><h3>Cho phép truy cập vị trí?</h3><p>SkyCast dùng vị trí để cung cấp dự báo chính xác nơi bạn đang ở.</p>
          <div><MButton variant="text">Để sau</MButton><MButton>Cho phép</MButton></div>
        </Card>
        <Card className="offline">
          <div className="state-art"><Icon>cloud_off</Icon></div><h3>Không có kết nối mạng</h3><p>Kiểm tra Wi-Fi hoặc dữ liệu di động, sau đó thử lại.</p><MButton icon="refresh">Thử lại</MButton>
        </Card>
        <Card className="empty-state"><Icon>inbox</Icon><h3>Chưa có nội dung</h3><p>Nội dung bạn lưu sẽ xuất hiện tại đây.</p></Card>
        <div className="snackbar"><Icon filled>check_circle</Icon><span>Đã cập nhật thời tiết</span><button>HOÀN TÁC</button></div>
      </div>
    </div>
  );
}

function MotionGuide() {
  return (
    <section className="motion-guide">
      <div><small>MICRO-INTERACTIONS</small><h2>Chuyển động có chủ đích</h2><p>Nhẹ nhàng, hữu ích và nhất quán với Material Motion.</p></div>
      {[
        ["animation","Splash","Scale 92→100% + fade in · 600ms"],
        ["swipe_right","Điều hướng","Slide từ phải + fade out · 300ms"],
        ["partly_cloudy_day","Thời tiết","Icon nổi nhẹ · số nhiệt độ count-up"],
        ["view_agenda","Danh sách","Fade + slide up, stagger 40ms"],
        ["touch_app","Phản hồi","Ripple trên card và nút · 200ms"],
        ["gradient","Điều kiện","Gradient cross-fade · 800ms"],
        ["dock_to_bottom","Bottom nav","Icon bounce khi được chọn"],
      ].map(([icon,title,note])=><Card key={title}><Icon>{icon}</Icon><span><b>{title}</b><small>{note}</small></span></Card>)}
    </section>
  );
}

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [toast, setToast] = useState("");
  const screens = ["splash","login","register","forgot","home","options","drawer","cities","search-city","day-detail","news","article","profile","edit-profile","settings","states"];
  const jump = (id:string) => document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});
  return (
    <main className={`app-shell ${darkTheme ? "gallery-dark" : ""}`}>
      <header className="gallery-header">
        <div className="brand"><span className="brand-icon"><Icon filled>partly_cloudy_day</Icon></span><span><b>SkyCast</b><small>Android · Material 3 UI Reference</small></span></div>
        <div className="gallery-actions"><MButton variant="outline" icon="dark_mode" onClick={()=>setDarkTheme(!darkTheme)}>Đổi nền</MButton><MButton icon="play_arrow" onClick={()=>jump("home")}>Mở prototype</MButton></div>
      </header>
      <nav className="jump-nav">{screens.map((id,i)=><button key={id} onClick={()=>jump(id)}>{String(i+1).padStart(2,"0")}</button>)}</nav>
      <section className="intro">
        <span className="kicker">MOBILE WEATHER EXPERIENCE · 360 × 800</span>
        <h1>Bầu trời hôm nay,<br/><em>trong tầm tay.</em></h1>
        <p>16 luồng trải nghiệm hoàn chỉnh cho ứng dụng dự báo thời tiết Android — rõ ràng, thân thiện và sẵn sàng để chuyển thành Java + XML.</p>
        <div className="token-row"><span><i className="token blue-token"/>Primary</span><span><i className="token sky-token"/>Secondary</span><span><i className="token sun-token"/>Sun</span><span><Icon>grid_4x4</Icon>8dp grid</span><span><Icon>rounded_corner</Icon>24dp cards</span></div>
      </section>
      <section className="gallery-grid">
        <Phone number="01" title="Splash" id="splash" className="no-scroll"><Splash/></Phone>
        <Phone number="02" title="Đăng nhập · Error state" id="login"><Login/></Phone>
        <Phone number="03" title="Đăng ký" id="register"><Register/></Phone>
        <Phone number="04" title="Quên mật khẩu · Success" id="forgot"><Forgot/></Phone>
        <Phone number="05A" title="Thời tiết · Light" id="home" weather className="sunny"><WeatherHero/></Phone>
        <Phone number="05B" title="Thời tiết · Dark" id="home-dark" weather dark className="night"><WeatherHero dark/></Phone>
        <Phone number="06" title="Options + SubMenu" id="options" weather><MenuState/></Phone>
        <Phone number="07" title="Navigation drawer" id="drawer" weather><DrawerState/></Phone>
        <Phone number="08" title="Thành phố · Context menu" id="cities"><Cities/></Phone>
        <Phone number="09" title="Tìm thành phố" id="search-city"><SearchCity/></Phone>
        <Phone number="10" title="Chi tiết ngày" id="day-detail"><DayDetail/></Phone>
        <Phone number="11" title="Tin tức · Menu + Skeleton" id="news"><News/></Phone>
        <Phone number="12" title="Chi tiết bài viết" id="article"><Article/></Phone>
        <Phone number="13" title="Hồ sơ" id="profile"><Profile dark={darkTheme} onDark={()=>setDarkTheme(!darkTheme)} onLogout={()=>setToast("Đã đăng xuất khỏi SkyCast")}/></Phone>
        <Phone number="14" title="Chỉnh sửa hồ sơ" id="edit-profile"><EditProfile/></Phone>
        <Phone number="15" title="Cài đặt" id="settings"><Settings/></Phone>
        <Phone number="16" title="Dialogs & states" id="states"><States onLogout={()=>setToast("Đã đăng xuất")}/></Phone>
      </section>
      <MotionGuide/>
      <footer><div className="brand"><span className="brand-icon"><Icon filled>partly_cloudy_day</Icon></span><span><b>SkyCast</b><small>Design reference · Android Material 3</small></span></div><p>Be Vietnam Pro · Material Symbols Rounded · 8dp baseline grid</p></footer>
      {toast && <div className="global-toast"><Icon filled>check_circle</Icon>{toast}<button onClick={()=>setToast("")}>Đóng</button></div>}
    </main>
  );
}
