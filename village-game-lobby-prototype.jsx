import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  List,
  ScrollText,
  Settings,
  Lock,
  Unlock,
  Users,
  Plus,
  ArrowLeft,
  Search,
  Crown,
  Moon,
  Sun,
} from "lucide-react";

const mockRooms = [
  { id: 1, name: "Karanlık Köy", players: 4, maxPlayers: 10, locked: true, inGame: false },
  { id: 2, name: "Gece Avı", players: 7, maxPlayers: 10, locked: false, inGame: false },
  { id: 3, name: "Sessiz Kasaba", players: 10, maxPlayers: 10, locked: false, inGame: true },
  { id: 4, name: "Arkadaş Lobisi", players: 2, maxPlayers: 8, locked: true, inGame: false },
  { id: 5, name: "Hızlı Oyun", players: 5, maxPlayers: 10, locked: false, inGame: false },
];

function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-white/15 bg-black/25 backdrop-blur-md shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

function MenuButton({ icon: Icon, label, onClick, badge }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-left text-white transition hover:bg-white/15"
      type="button"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/10 p-2">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-base font-semibold tracking-wide">{label}</span>
        </div>
        {typeof badge === "number" && badge > 0 ? (
          <span className="min-w-8 rounded-full bg-emerald-500/90 px-2 py-1 text-center text-xs font-bold text-white">
            {badge}
          </span>
        ) : null}
      </div>
    </motion.button>
  );
}

function RoomCard({ room }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{room.name}</span>
            {room.locked ? <Lock className="h-4 w-4 text-amber-300" /> : <Unlock className="h-4 w-4 text-emerald-300" />}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/80">
            <span className="inline-flex items-center gap-1">
              <Users className="h-4 w-4" /> {room.players}/{room.maxPlayers}
            </span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                room.inGame ? "bg-red-500/20 text-red-200" : "bg-emerald-500/20 text-emerald-200"
              }`}
            >
              {room.inGame ? "Oyunda" : "Bekliyor"}
            </span>
          </div>
        </div>
        <button
          className="rounded-xl bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/15"
          type="button"
        >
          Katıl
        </button>
      </div>
    </motion.div>
  );
}

export default function VillageGameLobbyPrototype() {
  const [screen, setScreen] = useState("menu");
  const [nickname, setNickname] = useState("Player 1");
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [themeNight, setThemeNight] = useState(false);

  const filteredRooms = useMemo(() => {
    return mockRooms.filter((room) => room.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const roomCount = mockRooms.filter((r) => !r.inGame).length;

  const BackgroundOverlay = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 transition duration-700 ${themeNight ? "bg-slate-950" : "bg-sky-400"}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-black/10 to-black/40" />
      <motion.div
        animate={themeNight ? { x: 180, y: 80, opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute left-8 top-8"
      >
        <div className="h-16 w-16 rounded-full bg-yellow-300 shadow-[0_0_80px_rgba(253,224,71,0.75)]" />
      </motion.div>
      <motion.div
        animate={themeNight ? { x: 0, y: 0, opacity: 1 } : { x: -180, y: 80, opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute right-10 top-10"
      >
        <div className="h-14 w-14 rounded-full bg-slate-100 shadow-[0_0_70px_rgba(255,255,255,0.45)]" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[52%]">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-emerald-950/65 to-emerald-700/15" />
        <div className="absolute bottom-0 left-[46%] h-[58%] w-[8%] rounded-t-[40px] bg-cyan-700/85 blur-[1px]" />
        <div className="absolute bottom-[18%] left-[43%] h-5 w-[14%] rounded-full bg-amber-700/80" />
        {[12, 24, 70, 84, 18, 77, 33, 63].map((left, idx) => (
          <div
            key={idx}
            className="absolute bottom-[10%]"
            style={{ left: `${left}%` }}
          >
            <div className="relative h-16 w-20 rounded-t-[24px] border border-black/20 bg-stone-300/90 shadow-lg">
              <div className={`absolute left-1/2 top-4 h-4 w-5 -translate-x-1/2 rounded-sm ${themeNight ? "bg-yellow-200/80" : "bg-sky-100/90"}`} />
              <div className="absolute bottom-full left-1/2 h-5 w-3 -translate-x-1/2 rounded-t-sm bg-stone-700" />
              <div className="absolute -top-4 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[44px] border-r-[44px] border-b-[24px] border-l-transparent border-r-transparent border-b-amber-900" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Header = ({ title, subtitle }) => (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-white/75">{subtitle}</p> : null}
      </div>
      <button
        onClick={() => setThemeNight((v) => !v)}
        className="rounded-2xl border border-white/15 bg-white/10 p-3 text-white hover:bg-white/15"
        type="button"
        aria-label="Temayı değiştir"
      >
        {themeNight ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen overflow-hidden">
        <BackgroundOverlay />

        <div className="relative mx-auto flex min-h-screen max-w-md items-center px-4 py-6">
          <Panel className="w-full p-5">
            <AnimatePresence mode="wait">
              {screen === "menu" && (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                >
                  <Header title="Köy Oyunu" subtitle="Odaya gir, arkadaşlarını topla ve geceyi sağ çık." />

                  <div className="mb-5 rounded-2xl border border-white/15 bg-white/10 p-4">
                    <label className="mb-2 block text-sm font-medium text-white/80">İsim</label>
                    <input
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-emerald-300/40"
                      placeholder="Nickname yaz"
                    />
                  </div>

                  <div className="space-y-3">
                    <MenuButton icon={Home} label="Oda Kur" onClick={() => setScreen("create-room")} />
                    <MenuButton icon={List} label="Oda Listeleri" badge={roomCount} onClick={() => setScreen("room-list")} />
                    <MenuButton icon={ScrollText} label="Roller Hakkında" onClick={() => setScreen("roles")} />
                    <MenuButton icon={Settings} label="Ayarlar" onClick={() => setScreen("settings")} />
                  </div>
                </motion.div>
              )}

              {screen === "create-room" && (
                <motion.div
                  key="create-room"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <button
                      onClick={() => setScreen("menu")}
                      className="rounded-2xl border border-white/15 bg-white/10 p-3 text-white hover:bg-white/15"
                      type="button"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Oda Oluştur</h2>
                      <p className="text-sm text-white/75">Oda adı ve istersen parola belirle.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">Oda adı</label>
                      <input
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-emerald-300/40"
                        placeholder="Örn: Karanlık Köy"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">Parola (opsiyonel)</label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-emerald-300/40"
                        placeholder="Boş bırakırsan oda açık olur"
                      />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
                      <div className="flex items-center justify-between gap-4">
                        <span>Oda durumu</span>
                        <span className={`rounded-full px-3 py-1 font-medium ${password ? "bg-amber-500/20 text-amber-200" : "bg-emerald-500/20 text-emerald-200"}`}>
                          {password ? "Parolalı" : "Açık oda"}
                        </span>
                      </div>
                    </div>

                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-4 text-base font-bold text-white shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      disabled={!roomName.trim()}
                    >
                      <Plus className="h-5 w-5" /> Odayı Oluştur
                    </button>
                  </div>
                </motion.div>
              )}

              {screen === "room-list" && (
                <motion.div
                  key="room-list"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <button
                      onClick={() => setScreen("menu")}
                      className="rounded-2xl border border-white/15 bg-white/10 p-3 text-white hover:bg-white/15"
                      type="button"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Oda Listeleri</h2>
                      <p className="text-sm text-white/75">Açık odaları görüntüle ve katıl.</p>
                    </div>
                  </div>

                  <div className="mb-4 rounded-2xl border border-white/15 bg-white/10 p-3">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-white/60" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
                        placeholder="Oda ara"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredRooms.map((room) => (
                      <RoomCard key={room.id} room={room} />
                    ))}
                    {filteredRooms.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-white/65">
                        Aramaya uygun oda bulunamadı.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {screen === "roles" && (
                <motion.div
                  key="roles"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <button
                      onClick={() => setScreen("menu")}
                      className="rounded-2xl border border-white/15 bg-white/10 p-3 text-white hover:bg-white/15"
                      type="button"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Roller Hakkında</h2>
                      <p className="text-sm text-white/75">Şimdilik yer tutucu ekran. Sonraki adımda dolduracağız.</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-white/85">
                    {[
                      ["🗡️", "Katil", "Geceleri hedef seçer."],
                      ["🩺", "Doktor", "Bir oyuncuyu korur."],
                      ["👮", "Polis", "Bir oyuncuyu o gece kilitler."],
                      ["🪤", "Tuzakçı", "Bir eve kapan kurar."],
                      ["🎭", "Kaosçu", "Asılırsa tek başına kazanır."],
                    ].map(([icon, name, desc]) => (
                      <div key={name} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                        <div className="text-base font-semibold text-white">{icon} {name}</div>
                        <div className="mt-1 text-white/70">{desc}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {screen === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <button
                      onClick={() => setScreen("menu")}
                      className="rounded-2xl border border-white/15 bg-white/10 p-3 text-white hover:bg-white/15"
                      type="button"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Ayarlar</h2>
                      <p className="text-sm text-white/75">Şimdilik temel görünüm ayarları.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setThemeNight((v) => !v)}
                      className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/10 p-4 text-white hover:bg-white/15"
                      type="button"
                    >
                      <span className="font-medium">Tema</span>
                      <span className="text-sm text-white/75">{themeNight ? "Gece" : "Gündüz"}</span>
                    </button>
                    <button
                      className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/10 p-4 text-white hover:bg-white/15"
                      type="button"
                    >
                      <span className="font-medium">Müzik</span>
                      <span className="text-sm text-white/75">Yakında</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/55">
              <span className="inline-flex items-center gap-1"><Crown className="h-3.5 w-3.5" /> Prototip</span>
              <span>Lobby v1</span>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
