import React, { useEffect, useRef, useState } from "react";

import {

  Monitor, Keyboard, Mouse, Printer, Laptop, Smartphone,

  Globe, Camera, Headphones, Mic, Usb, Computer, Hand,

  RotateCcw, Users, UserRound, Settings, HelpCircle,

  Maximize, CheckCircle2, Star, Video, BookOpen, Trophy,

  Eye, AlertTriangle, ChevronRight, Play

} from "lucide-react";

import type { LucideIcon } from "lucide-react";

type Item = {

  id: string;

  name: string;

  Icon: LucideIcon;

  video?: string;

  poster?: string;

};

type GameCard = {

  uid: string;

  item: Item;

  kind: "device" | "sign";

};

type Team = {

  name: string;

  avatar: number;

  score: number;

};

type Level = "facil" | "medio" | "dificil";

type Screen = "home" | "how" | "settings" | "setup" | "game" | "end";

type Mode = "solo" | "teams";

// Adicione apenas vídeos reais, autorizados e revisados.

// Exemplo:

// video: "/libras/computador.mp4"

const ITEMS: Item[] = [

  { id: "computador", name: "Computador", Icon: Computer },

  { id: "teclado", name: "Teclado", Icon: Keyboard },

  { id: "mouse", name: "Mouse", Icon: Mouse },

  { id: "monitor", name: "Monitor", Icon: Monitor },

  { id: "impressora", name: "Impressora", Icon: Printer },

  { id: "notebook", name: "Notebook", Icon: Laptop },

  { id: "celular", name: "Celular", Icon: Smartphone },

  { id: "internet", name: "Internet", Icon: Globe },

  { id: "camera", name: "Câmera", Icon: Camera },

  { id: "fone", name: "Fone de ouvido", Icon: Headphones },

  { id: "microfone", name: "Microfone", Icon: Mic },

  { id: "pendrive", name: "Pendrive", Icon: Usb }

];

const COUNTS: Record<Level, number> = {

  facil: 4,

  medio: 8,

  dificil: 12

};

const AVATARS = [Monitor, Camera, Headphones, Keyboard];

function shuffle<T>(items: T[]): T[] {

  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];

  }

  return result;

}

function Character({ small = false }: { small?: boolean }) {

  return (

    <svg

viewBox="0 0 210 230"

role="img"

aria-label="Ilustração de estudante negra com recursos tecnológicos"

className={small ? "w-24 max-w-full" : "w-full max-w-[240px] h-auto"}

    >

      <circle cx="105" cy="110" r="100" fill="#ede9fe" />

      <path

d="M36 211 Q39 155 102 153 Q174 155 176 211"

fill="#2563eb"

      />

      <path

d="M72 169 L103 191 L132 169"

fill="#bfdbfe"

      />

      <rect

x="94" y="139" width="22" height="27"

rx="9" fill="#9a5b39"

      />

      <ellipse cx="105" cy="92" rx="53" ry="63" fill="#242037" />

      <ellipse cx="105" cy="107" rx="39" ry="49" fill="#a76540" />

      <circle cx="90" cy="108" r="3" fill="#111827" />

      <circle cx="119" cy="108" r="3" fill="#111827" />

      <path

d="M94 130 Q105 138 117 130"

stroke="#582e28"

strokeWidth="3"

fill="none"

strokeLinecap="round"

      />

      <path

d="M67 92 Q55 40 105 39 Q154 41 144 95

           Q128 71 118 65 Q90 90 67 92"

fill="#242037"

      />

      <circle cx="64" cy="108" r="7" fill="#a76540" />

      <circle cx="147" cy="108" r="7" fill="#a76540" />

      <rect

x="146" y="154" width="48" height="34"

rx="7" fill="#7c3aed"

      />

      <rect

x="151" y="159" width="38" height="23"

rx="3" fill="#ffffff"

      />

      <path

d="M161 171h18"

stroke="#2563eb"

strokeWidth="4"

strokeLinecap="round"

      />

    </svg>

  );

}

function WelcomeVideo() {
  const [available, setAvailable] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="w-full rounded-3xl bg-gradient-to-br from-blue-50 to-violet-100 p-5 sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-xl bg-white p-3 shadow-sm">
          <Video className="text-violet-700" size={24} />
        </span>
        <div>
          <h2 className="text-lg font-black text-blue-950">Boas-vindas em Libras</h2>
          <p className="text-sm text-slate-600">Assista à apresentação do jogo</p>
        </div>
      </div>

      {available ? (
        <>
          <div className="mx-auto flex w-full max-w-[320px] justify-center overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              className="block max-h-[420px] w-full object-contain"
              onError={() => setAvailable(false)}
              aria-label="Vídeo de boas-vindas em Libras"
            >
              <source src="/videos/boas-vindas.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>
          </div>
          <button
            type="button"
            className="secondary mx-auto mt-5 flex items-center justify-center gap-2"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                void videoRef.current.play();
              }
            }}
          >
            <Play size={18} />
            ASSISTIR NOVAMENTE
          </button>
        </>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-violet-300 bg-white p-6 text-center">
          <Video size={36} className="mx-auto mb-3 text-violet-600" />
          <p className="font-black text-violet-800">Vídeo ainda não encontrado</p>
          <p className="mt-2 text-sm text-slate-600">
            Coloque boas-vindas.mp4 em memoria-tech/public/videos.
          </p>
        </div>
      )}
      <p className="mt-5 text-center text-sm font-bold text-violet-800">
        Uma experiência visual para aprender e jogar!
      </p>
    </section>
  );
}

function SignContent({

item,

demo

}: {

  item: Item;

  demo: boolean;

}) {

  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideo = Boolean(item.video);

  return (

    <div className="flex flex-col items-center justify-center gap-1 w-full h-full text-center">

      <div className="flex items-center gap-1 text-violet-700 font-black text-xs">

        <Hand size={15} />

        LIBRAS

      </div>

      {hasVideo ? (

        <>

          <video

ref={videoRef}

src={item.video}

poster={item.poster}

controls

playsInline

preload="metadata"

className="w-full max-h-[65%] object-contain rounded-lg bg-slate-100"

aria-label={`Sinal de ${item.name} em Libras`}

          />

          <button

className="text-xs font-bold text-blue-700 underline"

onClick={(event) => {

event.stopPropagation();

              if (videoRef.current) {

                videoRef.current.currentTime = 0;

                void videoRef.current.play();

              }

            }}

          >

            Repetir vídeo

          </button>

        </>

      ) : (

        <>

          <Character small />

          <span className="text-[10px] sm:text-xs font-black text-amber-800">

            {demo ? "SEM SINAL" : "SINAL PENDENTE"}

          </span>

          <span className="text-[10px] text-slate-600 leading-tight">

            Vídeo não cadastrado

          </span>

        </>

      )}

    </div>

  );

}

export default function App() {

  const [screen, setScreen] = useState<Screen>("home");

  const [level, setLevel] = useState<Level>("facil");

  const [mode, setMode] = useState<Mode>("solo");

  const [teamCount, setTeamCount] = useState(2);

  const [teams, setTeams] = useState<Team[]>([

    { name: "Equipe Azul", avatar: 0, score: 0 },

    { name: "Equipe Roxa", avatar: 1, score: 0 }

  ]);

  const [turn, setTurn] = useState(0);

  const [cards, setCards] = useState<GameCard[]>([]);

  const [open, setOpen] = useState<string[]>([]);

  const [matched, setMatched] = useState<string[]>([]);

  const [wrong, setWrong] = useState<string[]>([]);

  const [attempts, setAttempts] = useState(0);

  const [soloScore, setSoloScore] = useState(0);

  const [demo, setDemo] = useState(true);

  const [reduced, setReduced] = useState(false);

  const [contrast, setContrast] = useState(false);

  const [help, setHelp] = useState(false);

  const [busy, setBusy] = useState(false);

  const [message, setMessage] = useState("");

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const turnRef = useRef(0);

  const ready = ITEMS.filter(item => Boolean(item.video)).length;

  const count = COUNTS[level];

  const found = matched.length / 2;

  function clearTimer() {

    if (timer.current) {

      clearTimeout(timer.current);

      timer.current = null;

    }

  }

  useEffect(() => {

    return () => {

      if (timer.current) clearTimeout(timer.current);

    };

  }, []);

  function start() {

    clearTimer();

    const pool = demo

      ? ITEMS

      : ITEMS.filter(item => Boolean(item.video));

    if (pool.length < count) {

      setMessage(

        `Cadastre ${count} vídeos validados para jogar. Disponíveis: ${pool.length}.`

      );

      return;

    }

    const selected = shuffle(pool).slice(0, count);

    const newCards: GameCard[] = selected.flatMap(item => [

      {

        uid: `${item.id}-device`,

        item,

        kind: "device"

      },

      {

        uid: `${item.id}-sign`,

        item,

        kind: "sign"

      }

    ]);

    setCards(shuffle(newCards));

    setOpen([]);

    setMatched([]);

    setWrong([]);

    setAttempts(0);

    setSoloScore(0);

    setTurn(0);

    turnRef.current = 0;

    setTeams(previous =>

previous.slice(0, teamCount).map(team => ({

        ...team,

        score: 0

      }))

    );

    setBusy(false);

    setMessage("");

    setScreen("game");

  }

  function flip(card: GameCard) {

    if (

      busy ||

      matched.includes(card.uid) ||

      open.includes(card.uid) ||

      open.length >= 2

    ) {

      return;

    }

    const next = [...open, card.uid];

    setOpen(next);

    if (next.length !== 2) return;

    setBusy(true);

    setAttempts(value => value + 1);

    const first = cards.find(item => item.uid === next[0]);

    if (!first) {

      setBusy(false);

      return;

    }

    const correct =

      first.item.id === card.item.id &&

      first.kind !== card.kind;

    if (correct) {

      const totalMatched = matched.length + 2;

      setMatched(previous => [...previous, ...next]);

      setSoloScore(value => value + 10);

      if (mode === "teams") {

        setTeams(previous =>

previous.map((team, index) =>

index === turnRef.current

              ? { ...team, score: team.score + 10 }

              : team

          )

        );

      }

      setMessage("Par encontrado! +10 pontos");

      timer.current = setTimeout(() => {

        setOpen([]);

        setBusy(false);

        setMessage("");

        if (totalMatched === cards.length) {

          setScreen("end");

        }

      }, reduced ? 300 : 850);

    } else {

      setWrong(next);

      setMessage("Não formou par. Observe e tente novamente.");

    }

  }

  function finishMiss() {

    if (!busy || wrong.length !== 2) return;

    clearTimer();

    setOpen([]);

    setWrong([]);

    setBusy(false);

    setMessage("");

    if (mode === "teams") {

      setTurn(previous => {

        const next = (previous + 1) % teamCount;

        turnRef.current = next;

        return next;

      });

    }

  }

  function updateTeam(

index: number,

field: "name" | "avatar",

value: string | number

  ) {

    setTeams(previous =>

previous.map((team, current) =>

index === current

          ? { ...team, [field]: value }

          : team

      )

    );

  }

  function setup() {

    setMessage("");

    setScreen("setup");

  }

  function fullscreen() {

    if (!document.fullscreenElement) {

      void document.documentElement.requestFullscreen?.();

    } else {

      void document.exitFullscreen?.();

    }

  }

  function button(

text: string,

    action: () => void,

secondary = false

  ) {

    return (

      <button

className={secondary ? "secondary" : "primary"}

onClick={action}

      >

        {text}

      </button>

    );

  }

  return (

    <div

className={`${contrast ? "high-contrast" : ""} ${

        reduced ? "reduce-motion" : ""

      } min-h-screen px-3 py-5 sm:p-7`}

    >

      <div className="max-w-6xl mx-auto">

        <header className="flex flex-wrap justify-between items-center gap-3 mb-7">

          <button

onClick={() => {

              clearTimer();

              setScreen("home");

            }}

className="flex items-center gap-3 text-blue-800 font-black text-xl"

          >

            <span className="bg-blue-600 text-white p-2 rounded-xl">

              <Computer />

            </span>

            MEMÓRIA

            <span className="text-violet-700">TECH</span>

          </button>

          <div className="flex items-center gap-2">

            <button

aria-label="Ajuda"

title="Ajuda"

className="secondary !p-3"

onClick={() => setHelp(true)}

            >

              <HelpCircle />

            </button>

            <button

aria-label="Tela cheia"

title="Tela cheia"

className="secondary !p-3"

onClick={fullscreen}

            >

              <Maximize />

            </button>

            <button

aria-label="Acessibilidade"

title="Acessibilidade"

className="secondary !p-3"

onClick={() => setScreen("settings")}

            >

              <Settings />

            </button>

          </div>

        </header>

        {screen === "home" && (
        <main className="surface grid items-center gap-8 p-6 md:p-10 lg:grid-cols-2 lg:gap-12">
          <section className="flex min-w-0 flex-col justify-center">
            <span className="inline-flex self-start items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-black text-violet-700">
              <Hand size={18} />
              EDUCAÇÃO BILÍNGUE
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl xl:text-6xl">
              MEMÓRIA<span className="text-blue-600"> TECH</span>
            </h1>

            <p className="mt-4 text-xl font-extrabold text-violet-700">
              Computação em Libras
            </p>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              Aprenda conceitos de Computação de maneira divertida e inclusiva!
              Observe as cartas, encontre os pares e descubra novos conhecimentos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {button("JOGAR", setup)}
              {button("COMO JOGAR", () => setScreen("how"), true)}
              {button("ACESSIBILIDADE", () => setScreen("settings"), true)}
            </div>
          </section>

          <WelcomeVideo />
        </main>
      )}

      {screen === "how" && (

          <main className="surface p-6 md:p-10">

            <h1 className="text-3xl font-black mb-6">

              Como jogar

            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {([

                [Eye, "Escolha duas cartas"],

                [Computer, "Veja o componente"],

                [Hand, "Observe o sinal em Libras"],

                [CheckCircle2, "Encontre o par"],

                [Star, "Ganhe 10 pontos"]

              ] as [LucideIcon, string][]).map(

                ([Icon, label], index) => (

                  <div

className="rounded-2xl bg-blue-50 p-5 flex flex-col gap-3"

key={index}

                  >

                    <span className="font-black text-blue-700">

                      PASSO {index + 1}

                    </span>

                    <Icon

size={42}

className="text-violet-700"

                    />

                    <strong className="text-lg">

                      {label}

                    </strong>

                    <div className="border border-dashed border-violet-300 rounded-lg p-2 text-xs">

                      <Video size={18} />

                      Vídeo explicativo em Libras pendente

                    </div>

                  </div>

                )

              )}

            </div>

            <p className="mt-6 text-slate-700 font-bold">

              Em equipes: acertou, continua.

              Errou, passa a vez.

              Sem áudio obrigatório.

            </p>

            <div className="mt-6 flex gap-3 flex-wrap">

              {button("ESCOLHER NÍVEL", setup)}

              {button("VOLTAR", () => setScreen("home"), true)}

            </div>

          </main>

        )}

        {screen === "settings" && (

          <main className="surface p-7 max-w-2xl mx-auto">

            <h1 className="text-3xl font-black mb-6">

              Acessibilidade

            </h1>

            <label className="flex items-center justify-between gap-3 p-4 bg-blue-50 rounded-xl mb-3 font-bold">

              Alto contraste

              <input

type="checkbox"

className="w-7 h-7"

checked={contrast}

onChange={event =>

                  setContrast(event.target.checked)

                }

              />

            </label>

            <label className="flex items-center justify-between gap-3 p-4 bg-blue-50 rounded-xl mb-3 font-bold">

              Reduzir animações

              <input

type="checkbox"

className="w-7 h-7"

checked={reduced}

onChange={event =>

                  setReduced(event.target.checked)

                }

              />

            </label>

            <p className="mb-5 text-slate-600">

              Use Tab, Enter ou Espaço para escolher cartas.

              Os vídeos possuem controles próprios.

            </p>

            {button(

              "VOLTAR AO INÍCIO",

              () => setScreen("home")

            )}

          </main>

        )}

        {screen === "setup" && (

          <main className="surface p-6 md:p-10">

            <h1 className="text-3xl font-black mb-5">

              Prepare sua partida

            </h1>

            <h2 className="font-black mb-3">Nível</h2>

            <div className="grid grid-cols-3 gap-3 mb-7">

              {(["facil", "medio", "dificil"] as Level[]).map(

selectedLevel => (

                  <button

key={selectedLevel}

onClick={() => setLevel(selectedLevel)}

className={`rounded-2xl p-3 sm:p-4 border-4 font-black ${

                      level === selectedLevel

                        ? "border-blue-600 bg-blue-50"

                        : "border-slate-200"

                    }`}

                  >

                    {selectedLevel.toUpperCase()}

                    <span className="block text-sm mt-2">

                      {COUNTS[selectedLevel]} pares

                    </span>

                  </button>

                )

              )}

            </div>

            <h2 className="font-black mb-3">Modo</h2>

            <div className="grid grid-cols-2 gap-3 mb-6">

              <button

onClick={() => setMode("solo")}

className={`rounded-xl border-4 p-4 font-black flex items-center justify-center gap-2 ${

                  mode === "solo"

                    ? "border-blue-600"

                    : "border-slate-200"

                }`}

              >

                <UserRound />

                Individual

              </button>

              <button

onClick={() => setMode("teams")}

className={`rounded-xl border-4 p-4 font-black flex items-center justify-center gap-2 ${

                  mode === "teams"

                    ? "border-violet-600"

                    : "border-slate-200"

                }`}

              >

                <Users />

                Equipes

              </button>

            </div>

            {mode === "teams" && (

              <div className="bg-violet-50 rounded-2xl p-4 mb-6">

                <label className="font-black">

                  Quantidade de equipes

                  <select

className="ml-3 rounded-lg p-2 border"

value={teamCount}

onChange={event => {

                      const number = Number(event.target.value);

                      setTeamCount(number);

                      setTeams(previous =>

                        Array.from(

                          { length: number },

                          (_, index) =>

                            previous[index] || {

                              name: `Equipe ${index + 1}`,

                              avatar: index % 4,

                              score: 0

                            }

                        )

                      );

                    }}

                  >

                    {[2, 3, 4].map(number => (

                      <option key={number} value={number}>

                        {number}

                      </option>

                    ))}

                  </select>

                </label>

                <div className="grid sm:grid-cols-2 gap-3 mt-4">

                  {teams.slice(0, teamCount).map((team, index) => (

                    <div

key={index}

className="bg-white p-3 rounded-xl"

                    >

                      <label className="font-bold text-sm">

                        Equipe {index + 1}

                        <input

maxLength={22}

className="block w-full p-2 border rounded-lg mt-1"

value={team.name}

onChange={event =>

                            updateTeam(

                              index,

                              "name",

                              event.target.value

                            )

                          }

                        />

                      </label>

                      <div className="flex gap-2 mt-2">

                        {AVATARS.map((Icon, avatarIndex) => (

                          <button

key={avatarIndex}

aria-label={`Avatar ${avatarIndex + 1}`}

onClick={() =>

                              updateTeam(

                                index,

                                "avatar",

                                avatarIndex

                              )

                            }

className={`p-2 rounded-lg ${

                              team.avatar === avatarIndex

                                ? "bg-violet-200 ring-2 ring-violet-700"

                                : "bg-slate-100"

                            }`}

                          >

                            <Icon size={22} />

                          </button>

                        ))}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}

            <div className="rounded-xl bg-amber-50 border border-amber-300 p-4 mb-5">

              <div className="font-black flex items-center gap-2">

                <AlertTriangle size={20} />

                Sinais cadastrados: {ready}/12

              </div>

              <p className="text-sm mt-1">

                O modo demonstração permite testar o jogo

                sem apresentar sinais fictícios de Libras.

              </p>

              <label className="flex items-center gap-3 mt-3 font-bold">

                <input

type="checkbox"

className="w-6 h-6"

checked={demo}

onChange={event =>

                    setDemo(event.target.checked)

                  }

                />

                Ativar modo demonstração

              </label>

            </div>

            {message && (

              <p role="alert" className="text-red-700 font-bold mb-4">

                {message}

              </p>

            )}

            <div className="flex gap-3 flex-wrap">

              {button("COMEÇAR PARTIDA", start)}

              {button("VOLTAR", () => setScreen("home"), true)}

            </div>

          </main>

        )}

        {screen === "game" && (

          <main>

            <div className="surface p-4 mb-4 flex flex-wrap items-center justify-between gap-3">

              <div>

                <h1 className="font-black text-xl">

                  {level.toUpperCase()}

                  <span className="text-slate-500 text-sm">

                    {demo

                      ? " — DEMONSTRAÇÃO"

                      : " — LIBRAS"}

                  </span>

                </h1>

                <p className="font-bold text-slate-600">

                  Pares: {found}/{count} · Tentativas: {attempts}

                </p>

              </div>

              <div className="flex gap-2 items-center">

                {mode === "solo" && (

                  <span className="font-black text-blue-700">

                    {soloScore} pontos

                  </span>

                )}

                <button

className="secondary !p-3"

title="Reiniciar"

aria-label="Reiniciar"

onClick={start}

                >

                  <RotateCcw />

                </button>

                <button

className="secondary !p-3"

onClick={() => setHelp(true)}

aria-label="Ajuda"

                >

                  <HelpCircle />

                </button>

              </div>

            </div>

            {mode === "teams" && (

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">

                {teams.slice(0, teamCount).map((team, index) => {

                  const Icon = AVATARS[team.avatar];

                  return (

                    <div

key={index}

className={`surface p-3 flex items-center gap-2 ${

                        turn === index

                          ? "ring-4 ring-yellow-400"

                          : ""

                      }`}

                    >

                      <Icon className="text-violet-700" />

                      <div className="min-w-0">

                        <div className="font-black truncate">

                          {team.name || `Equipe ${index + 1}`}

                        </div>

                        <div className="text-sm font-bold">

                          {team.score} pontos

                          {turn === index ? " · VEZ" : ""}

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}

            <div

aria-live="polite"

className="text-center font-black text-blue-800 min-h-7 mb-3"

            >

              {message ||

                "Encontre uma carta de componente e seu correspondente em Libras"}

            </div>

            <div

className={`grid gap-2 sm:gap-3 mx-auto ${

                level === "dificil"

                  ? "grid-cols-4 sm:grid-cols-6 max-w-5xl"

                  : "grid-cols-4 max-w-3xl"

              }`}

            >

              {cards.map(card => {

                const visible =

                  open.includes(card.uid) ||

                  matched.includes(card.uid);

                const isMatched = matched.includes(card.uid);

                const isWrong = wrong.includes(card.uid);

                const Icon = card.item.Icon;

                return (

                  <div

key={card.uid}

className={`card ${

                      visible ? "flipped" : ""

                    } ${

                      isMatched ? "matched" : ""

                    } ${

                      isWrong ? "wrong" : ""

                    }`}

                  >

                    <div className="card-inner">

                      <button

className="card-face card-front"

aria-label="Virar carta fechada"

disabled={visible || busy}

onClick={() => flip(card)}

                      >

                        <Computer

className="w-1/2 h-1/2 max-h-14"

strokeWidth={1.5}

                        />

                        <span className="font-black text-xs mt-2">

                          TECH

                        </span>

                      </button>

                      <div className="card-face card-back">

                        {card.kind === "device" ? (

                          <>

                            <Icon

className="w-1/2 h-1/2 max-h-20 text-blue-700"

strokeWidth={1.5}

                            />

                            <strong className="text-[11px] sm:text-base mt-2 text-center leading-tight">

                              {card.item.name}

                            </strong>

                            <span className="text-[9px] font-black text-blue-600">

                              COMPONENTE

                            </span>

                          </>

                        ) : (

                          <SignContent

item={card.item}

demo={demo}

                          />

                        )}

                        {isMatched && (

                          <CheckCircle2

size={20}

className="text-green-600 absolute right-1 top-1"

                          />

                        )}

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

            {wrong.length === 2 && (

              <div className="text-center mt-5 surface p-4 max-w-lg mx-auto">

                <p className="font-black mb-3">

                  Não formou par!

                  Observe as cartas e tente novamente.

                </p>

                <button

className="primary"

onClick={finishMiss}

                >

                  TENTAR NOVAMENTE

                  <ChevronRight className="inline ml-2" />

                </button>

              </div>

            )}

            <p className="text-center text-xs text-slate-500 mt-5">

              {demo

                ? "Modo demonstração: sinais não cadastrados não representam Libras."

                : "Os vídeos podem ser repetidos antes de continuar."}

            </p>

          </main>

        )}

        {screen === "end" && (

          <main className="surface p-8 md:p-12 text-center max-w-3xl mx-auto">

            <Trophy

size={76}

className="mx-auto text-yellow-500 mb-3"

            />

            <h1 className="text-4xl font-black text-blue-700">

              PARABÉNS!

            </h1>

            <h2 className="text-xl font-black text-violet-700 mt-3">

              {demo

                ? "VOCÊ CONCLUIU A DEMONSTRAÇÃO!"

                : "VOCÊ DESCOBRIU A COMPUTAÇÃO EM LIBRAS!"}

            </h2>

            <div className="grid grid-cols-3 gap-3 mt-8 mb-6">

              {[

                [`${found}`, "Pares"],

                [`${attempts}`, "Tentativas"],

                [

                  `${

                    mode === "solo"

                      ? soloScore

                      : teams.reduce(

                          (total, team) => total + team.score,

                          0

                        )

                  }`,

                  "Pontos"

                ]

              ].map(([value, label]) => (

                <div

key={label}

className="bg-blue-50 rounded-xl p-4"

                >

                  <strong className="text-3xl text-blue-700">

                    {value}

                  </strong>

                  <p className="font-bold">{label}</p>

                </div>

              ))}

            </div>

            {mode === "teams" && (

              <div className="bg-yellow-50 rounded-xl p-4 mb-6">

                <p className="font-black">

                  {(() => {

                    const activeTeams = teams.slice(0, teamCount);

                    const highest = Math.max(

                      ...activeTeams.map(team => team.score)

                    );

                    const winners = activeTeams.filter(

team => team.score === highest

                    );

                    return winners.length > 1

                      ? `Empate: ${winners

                          .map(team => team.name)

                          .join(", ")}`

                      : `Equipe vencedora: ${winners[0].name}`;

                  })()}

                </p>

                <div className="mt-2">

                  {teams.slice(0, teamCount).map((team, index) => (

                    <p key={index}>

                      {team.name}: {team.score} pontos

                    </p>

                  ))}

                </div>

              </div>

            )}

            <div className="flex flex-wrap justify-center gap-3">

              {button("JOGAR NOVAMENTE", start)}

              {button("ESCOLHER NÍVEL", setup, true)}

              {button(

                "VOLTAR AO INÍCIO",

                () => setScreen("home"),

                true

              )}

            </div>

          </main>

        )}

        {help && (

          <div

className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-4"

role="dialog"

aria-modal="true"

aria-label="Ajuda"

          >

            <div className="surface p-6 max-w-md w-full">

              <BookOpen

size={40}

className="text-violet-700"

              />

              <h2 className="font-black text-2xl my-3">

                Ajuda visual

              </h2>

              <p className="font-bold mb-3">

                Selecione duas cartas.

                Encontre o componente e seu sinal correspondente.

              </p>

              <p className="mb-4">

                Em equipes, cada acerto vale 10 pontos.

                Ao errar, tente novamente sem reiniciar o jogo.

              </p>

              <div className="border-dashed border-2 p-3 rounded-xl mb-4 text-sm">

                <Video />

                Vídeo de ajuda em Libras pendente.

              </div>

              {button("ENTENDI", () => setHelp(false))}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}
