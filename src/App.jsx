import React, { useState, useEffect } from 'react';
import { 
  Leaf, Map as MapIcon, MapPin, Heart, ShoppingBag, Footprints, Droplets, 
  Wind, Sun, Award, QrCode, ArrowRight, TrendingUp, Sparkles, Check, Lock, Sprout,
  Bike, Bus, Coffee, Zap, Ticket, CreditCard, Coffee as CoffeeIcon, Star, User, Settings, Wallet, ChevronRight, Bell, Share2, X
} from 'lucide-react';

/**
 * Ansan Green Pass - Korean Version
 * Theme: "Ethereal Forest"
 */

const App = () => {
  const [activeTab, setActiveTab] = useState('home'); 
  const [points, setPoints] = useState(2850); 
  
  // Tree State
  const [currentSeed, setCurrentSeed] = useState(null);
  const [treeLevel, setTreeLevel] = useState(0); 
  const [isWatering, setIsWatering] = useState(false);

  // Adoption State
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [adoptedTrees, setAdoptedTrees] = useState([
    {
      id: 101,
      type: '안산 은행나무 (Ginkgo)',
      date: '2024년 10월 24일',
      location: '안산 시민의 숲 A구역',
      code: 'CBJ70762492379',
      imageEmoji: '🍂',
      color: 'from-yellow-300 to-amber-500'
    },
    {
      id: 102,
      type: '호수 벚나무 (Cherry)',
      date: '2024년 04월 12일',
      location: '안산 호수공원 B구역',
      code: 'CBJ80811234451',
      imageEmoji: '🌸',
      color: 'from-pink-300 to-rose-400'
    }
  ]);

  // Certificate Modal State
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Energy/Action State
  const [steps, setSteps] = useState(4200);
  const [bikeDistance, setBikeDistance] = useState(0);
  const [claimedAction, setClaimedAction] = useState(null);

  // Market Categories
  const [marketFilter, setMarketFilter] = useState('seeds');

  // --- DATA ---
  const seeds = [
    { id: 'ginkgo', name: '안산 은행나무', rarity: 'Epic', cost: 1200, desc: '안산의 시목, 장수와 번영의 상징입니다.', color: 'from-yellow-300 to-amber-500', shadow: 'shadow-yellow-500/50', visual: '🍂', tag: '안산시목', type: 'yellow' },
    { id: 'cherry', name: '호수 벚나무', rarity: 'Rare', cost: 800, desc: '안산 호수공원의 핑크빛 낭만을 담았습니다.', color: 'from-pink-300 to-rose-400', shadow: 'shadow-pink-500/50', visual: '🌸', tag: '봄 한정', type: 'pink' },
    { id: 'pine', name: '상록 소나무', rarity: 'Common', cost: 200, desc: '사계절 푸른 절개, 끈기를 상징합니다.', color: 'from-emerald-400 to-teal-600', shadow: 'shadow-emerald-500/50', visual: '🌲', tag: '초보자 추천', type: 'green' },
    { id: 'azalea', name: '로얄 철쭉', rarity: 'Rare', cost: 600, desc: '안산의 시화, 화려한 색감을 자랑합니다.', color: 'from-fuchsia-300 to-purple-500', shadow: 'shadow-purple-500/50', visual: '🌺', tag: '안산시화', type: 'purple' },
  ];

  const rewards = [
    { id: 1, name: '안산사랑상품권 5k', cost: 2500, icon: <CreditCard size={20}/>, type: 'voucher', desc: '관내 가맹점에서 사용 가능' },
    { id: 2, name: '안산 그리너스 관람권', cost: 3000, icon: <Ticket size={20}/>, type: 'ticket', desc: 'K리그 홈경기 입장권' },
    { id: 3, name: '대부도 커피 쿠폰', cost: 1500, icon: <CoffeeIcon size={20}/>, type: 'food', desc: '오션뷰 카페 무료 이용권' },
    { id: 4, name: '티머니 충전권', cost: 1000, icon: <Bus size={20}/>, type: 'transport', desc: '1,000원 충전 코드' },
  ];

  // Action: Simulate syncing steps
  useEffect(() => {
    const timer = setTimeout(() => {
      if (steps < 8000) {
        setSteps(prev => prev + 150);
        if (Math.random() > 0.7) setBikeDistance(prev => parseFloat((prev + 0.2).toFixed(1)));
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [steps]);

  // Logic Functions
  const handleBuySeed = (seed) => {
    if (treeLevel > 0) { alert("화분에 이미 식물이 자라고 있습니다. 먼저 성장을 완료해주세요."); return; }
    if (points >= seed.cost) { setPoints(prev => prev - seed.cost); setCurrentSeed(seed); setTreeLevel(1); setActiveTab('home'); }
  };

  const handleWaterTree = () => {
    if (points >= 300) {
      setIsWatering(true);
      setTimeout(() => {
        setPoints(prev => prev - 300); setIsWatering(false);
        if (treeLevel < 4) { const newLevel = treeLevel + 1; setTreeLevel(newLevel); if (newLevel === 4) setTimeout(() => setShowAdoptionModal(true), 1200); }
      }, 1200);
    }
  };

  const handleConfirmAdoption = () => {
    setShowAdoptionModal(false);
    const newTree = { 
      id: Date.now(), 
      type: currentSeed.name, 
      date: new Date().toLocaleDateString('ko-KR', {year: 'numeric', month: 'long', day: 'numeric'}), 
      location: '안산 시민의 숲 A구역', 
      code: `CBJ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      imageEmoji: currentSeed.visual,
      color: currentSeed.color
    };
    setAdoptedTrees([newTree, ...adoptedTrees]); 
    setTreeLevel(0); 
    setCurrentSeed(null);
    setSelectedCertificate(newTree);
  };

  const handleClaimPoints = (id, amount) => { setPoints(prev => prev + amount); setClaimedAction(id); setTimeout(() => setClaimedAction(null), 1000); };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-100 via-emerald-50 to-sky-100 text-slate-800 font-sans flex justify-center items-start pt-0 md:pt-8 overflow-hidden select-none">
      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes gentle-sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes sway { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Device Frame */}
      <div className="w-full max-w-md md:rounded-[3rem] shadow-2xl h-[100vh] md:h-[880px] relative overflow-hidden flex flex-col bg-white/40 backdrop-blur-xl border border-white/50">
        {/* Background Ambient Orbs */}
        <div className={`absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full blur-3xl pointer-events-none mix-blend-multiply transition-colors duration-1000 ${activeTab === 'profile' ? 'bg-indigo-300/30' : 'bg-emerald-300/30'}`}></div>
        <div className={`absolute bottom-[10%] right-[-5%] w-80 h-80 rounded-full blur-3xl pointer-events-none mix-blend-multiply transition-colors duration-1000 ${activeTab === 'profile' ? 'bg-purple-300/30' : 'bg-sky-300/30'}`}></div>

        {/* HEADER */}
        <header className="px-6 pt-14 pb-6 flex justify-between items-center sticky top-0 z-20 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              <Leaf className="text-emerald-600 fill-emerald-600" size={20} />
              Ansan Green Pass
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {activeTab === 'profile' && <button className="p-2 bg-white/40 rounded-full hover:bg-white/60"><Settings size={18} className="text-slate-600"/></button>}
            <div className="flex items-center gap-2 bg-white/60 pl-3 pr-1 py-1 rounded-full border border-white/50 shadow-sm transition-all duration-300">
              <span className="font-bold text-emerald-800 text-sm">{points}</span>
              <div className="bg-emerald-500 p-1 rounded-full"><Sparkles size={12} className="text-white" /></div>
            </div>
          </div>
        </header>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 pb-28">

          {/* TAB 1: HOME */}
          {activeTab === 'home' && (
            <>
              {/* TREE SECTION */}
              <div className="relative h-[380px] w-full overflow-hidden flex flex-col items-center justify-end">
                {/* Weather */}
                <Sun className="absolute top-10 right-10 text-amber-300/80 animate-pulse" size={40} />
                <div className="absolute top-20 left-12 text-sky-300/60 animate-[bounce_4s_infinite]"><Wind size={28} /></div>
                
                {treeLevel === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full mb-20 animate-in fade-in zoom-in duration-500">
                    <div className="w-32 h-32 rounded-full bg-white/30 border-2 border-dashed border-emerald-300 flex items-center justify-center mb-4 backdrop-blur-sm">
                      <Sprout size={40} className="text-emerald-300" />
                    </div>
                    <p className="text-slate-500 font-medium mb-4">화분이 비어있어요</p>
                    <button onClick={() => setActiveTab('market')} className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold shadow-lg shadow-emerald-200 hover:scale-105 transition-transform">
                      상점으로 이동
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Visuals */}
                    {isWatering && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-400/30 rounded-full animate-ping z-0"></div>}
                    <div className={`relative z-10 transform transition-all duration-1000 ease-out origin-bottom mb-12 ${isWatering ? 'scale-105' : 'scale-100'}`}>
                      {/* Pass color type from seed */}
                      <EnhancedTreeVisual level={treeLevel} colorType={currentSeed?.type} />
                    </div>
                  </>
                )}
                {/* Ground */}
                <svg className="absolute bottom-0 w-full h-32 text-emerald-800/10 z-0 blur-sm" preserveAspectRatio="none" viewBox="0 0 1440 320"><path fill="currentColor" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,229.3C840,235,960,213,1080,197.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
              </div>

              {/* CONTROLS */}
              <div className="px-6 -mt-8 relative z-20">
                {treeLevel > 0 && (
                  <div className="flex justify-center mb-10">
                    <button onClick={handleWaterTree} disabled={points < 300 || isWatering || treeLevel === 4} className={`relative group w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${treeLevel === 4 ? 'bg-emerald-100 cursor-default' : points >= 300 ? 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-emerald-200/50 hover:scale-110 active:scale-95' : 'bg-slate-200 cursor-not-allowed grayscale opacity-70'}`}>
                      {treeLevel === 4 ? <Check size={32} className="text-emerald-600" /> : <Droplets size={32} className={`text-white transition-transform ${isWatering ? 'animate-bounce' : 'group-hover:rotate-12'}`} fill="white" />}
                      <div className="absolute -bottom-8 text-center w-32"><span className="text-sm font-bold text-slate-700 block">{treeLevel === 4 ? '성장 완료' : '에너지 주입'}</span>{treeLevel < 4 && <span className="text-[10px] text-slate-500">300 포인트 소모</span>}</div>
                    </button>
                    {treeLevel === 4 && (<div className="absolute mt-28"><button onClick={() => setShowAdoptionModal(true)} className="bg-slate-800 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">나무 입양하기</button></div>)}
                  </div>
                )}
                {/* ACTIONS */}
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Zap size={18} className="text-amber-500 fill-amber-500" /> 탄소 중립 활동</h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                    <ActionCard id="walk" title="걷기" value={steps.toLocaleString()} unit="걸음" icon={Footprints} color="text-emerald-600" bg="bg-emerald-50" points={50} isClaimed={claimedAction === 'walk'} onClick={() => handleClaimPoints('walk', 50)} />
                    <ActionCard id="bike" title="따릉이" value={bikeDistance} unit="km" icon={Bike} color="text-sky-500" bg="bg-sky-50" points={120} isClaimed={claimedAction === 'bike'} onClick={() => handleClaimPoints('bike', 120)} />
                    <ActionCard id="bus" title="대중교통" value="이용완료" unit="" icon={Bus} color="text-indigo-500" bg="bg-indigo-50" points={80} isClaimed={claimedAction === 'bus'} onClick={() => handleClaimPoints('bus', 80)} />
                    <ActionCard id="coffee" title="텀블러" value="QR인증" unit="" icon={Coffee} color="text-amber-600" bg="bg-amber-50" points={30} isClaimed={claimedAction === 'coffee'} onClick={() => handleClaimPoints('coffee', 30)} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: MARKET */}
          {activeTab === 'market' && (
            <div className="px-6 pt-4 animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center mb-6">
                <div><h2 className="text-2xl font-black text-slate-800">교환소</h2><p className="text-xs text-slate-500">친환경 활동으로 얻은 포인트로 교환하세요</p></div>
                <div className="flex bg-white/40 p-1 rounded-xl backdrop-blur-md">
                  <button onClick={() => setMarketFilter('seeds')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${marketFilter === 'seeds' ? 'bg-white shadow-sm text-emerald-800' : 'text-slate-400'}`}>씨앗</button>
                  <button onClick={() => setMarketFilter('rewards')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${marketFilter === 'rewards' ? 'bg-white shadow-sm text-emerald-800' : 'text-slate-400'}`}>혜택</button>
                </div>
              </div>
              {marketFilter === 'seeds' && (
                <div className="grid grid-cols-2 gap-4 pb-8">
                  {seeds.map((seed) => (
                    <div key={seed.id} className="relative group perspective">
                      <div className={`relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${seed.color} p-4 h-64 flex flex-col justify-between shadow-lg ${seed.shadow} transition-transform duration-300 hover:-translate-y-2`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        <div className="flex justify-between items-start z-10">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md text-white/90 bg-black/10 border border-white/20 ${seed.rarity === 'Epic' ? 'bg-amber-500/50' : seed.rarity === 'Rare' ? 'bg-pink-500/50' : ''}`}>{seed.rarity}</span>
                          {seed.tag && (<span className="text-[10px] font-bold text-white shadow-sm">#{seed.tag}</span>)}
                        </div>
                        <div className="flex-1 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                          <div className="text-[5rem] filter drop-shadow-2xl animate-[gentle-sway_3s_ease-in-out_infinite]">{seed.visual}</div>
                          {seed.rarity !== 'Common' && (<Sparkles className="absolute text-white animate-pulse" style={{top: '30%', right: '20%'}} size={20} />)}
                        </div>
                        <div className="z-10 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                          <h3 className="text-white font-bold text-sm leading-tight mb-1">{seed.name}</h3>
                          <div className="flex justify-between items-center">
                            <span className="text-white font-bold text-xs flex items-center gap-1"><Leaf size={10} /> {seed.cost}</span>
                            <button onClick={() => handleBuySeed(seed)} className="bg-white text-emerald-800 p-1.5 rounded-lg shadow-sm hover:scale-110 transition-transform active:scale-95">{treeLevel > 0 ? <Lock size={14} /> : <ShoppingBag size={14} />}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {marketFilter === 'rewards' && (
                <div className="space-y-3 pb-8">
                  {rewards.map((reward) => (
                    <div key={reward.id} className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:bg-white/80 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">{reward.icon}</div>
                      <div className="flex-1"><h4 className="font-bold text-slate-800 text-sm">{reward.name}</h4><p className="text-[10px] text-slate-500 mt-0.5">{reward.desc}</p></div>
                      <button disabled={points < reward.cost} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${points >= reward.cost ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>{reward.cost} pts</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MAP */}
          {activeTab === 'map' && (
            <div className="px-6 pt-4">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">입양 지도</h2>
              <div className="h-96 rounded-[2rem] overflow-hidden relative shadow-lg shadow-sky-100/50 border border-white/50">
                <div className="absolute inset-0 bg-sky-100/50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM5NDc0ODkiIHN0cm9rZS1vcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0wIDIwaDQwTTIwIDB2NDAiLz48L2c+PC9zdmc+')] opacity-50"></div>
                <div className="absolute top-1/4 left-1/3 animate-bounce"><MapPin className="text-emerald-600 fill-emerald-200" size={32}/></div>
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="px-6 pt-4 space-y-6 animate-in slide-in-from-right duration-300">
              {/* 1. Profile Header Card */}
              <div className="relative rounded-[2rem] p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-200 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-[-50%] right-[-50%] w-full h-full border-[40px] border-white/20 rounded-full"></div>
                  <div className="absolute bottom-[-20%] left-[-20%] w-60 h-60 bg-white/30 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center text-3xl shadow-inner">👨‍🌾</div>
                    <div><h2 className="text-xl font-bold">안산 시민</h2><p className="text-indigo-100 text-xs">숲의 수호자 Lv.5</p></div>
                  </div>
                  <div className="flex justify-between bg-black/10 rounded-2xl p-4 backdrop-blur-md border border-white/10">
                    <div className="text-center"><p className="text-[10px] text-indigo-100 uppercase tracking-wider mb-1">나무</p><p className="text-xl font-black">{adoptedTrees.length}</p></div>
                    <div className="w-px bg-white/20"></div>
                    <div className="text-center"><p className="text-[10px] text-indigo-100 uppercase tracking-wider mb-1">탄소감축</p><p className="text-xl font-black">14.2<span className="text-xs font-normal">kg</span></p></div>
                  </div>
                </div>
              </div>

              {/* 2. My Forest Archive (Adoptions) */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <Award className="text-amber-500" size={20} /> 명예의 숲
                  </h3>
                  <span className="text-xs text-slate-400">클릭해서 인증서 확인</span>
                </div>
                {adoptedTrees.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 bg-white/30 rounded-3xl border border-dashed border-slate-300">
                    <Sprout className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">아직 입양한 나무가 없습니다. <br/>나무를 심어보세요!</p>
                  </div>
                ) : (
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                    {adoptedTrees.map((tree) => (
                      <button
                        key={tree.id} 
                        onClick={() => setSelectedCertificate(tree)}
                        className="min-w-[260px] relative overflow-hidden rounded-[1.5rem] p-5 shadow-lg shadow-emerald-900/10 border border-white/40 group cursor-pointer hover:scale-[1.02] transition-transform bg-gradient-to-br from-emerald-600 to-teal-800 text-white snap-center text-left"
                      >
                        <div className="absolute -right-8 -top-8 text-white/10 rotate-12"><Leaf size={100} /></div>
                        <div className="relative z-10">
                          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur uppercase">Certificate</span>
                          <h3 className="text-lg font-bold mt-2">{tree.type}</h3>
                          <p className="text-[10px] text-emerald-100 mt-1 flex items-center gap-1 opacity-80"><MapIcon size={10}/> {tree.location}</p>
                          <div className="mt-4 pt-3 border-t border-white/20 flex justify-between text-[10px] opacity-80">
                            <span>{tree.code}</span>
                            <span>{tree.date}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Eco-Wallet */}
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <Wallet className="text-slate-600" size={20} /> 에코 지갑
                </h3>
                <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-2 shadow-sm">
                  <div className="p-4 flex items-center gap-4 border-b border-slate-100 hover:bg-white/50 transition-colors rounded-xl cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Bus size={20} /></div>
                    <div className="flex-1"><h4 className="text-sm font-bold text-slate-800">티머니 교통카드</h4><p className="text-xs text-slate-500">연동됨 • 끝번호 8821</p></div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>
                  <div className="p-4 flex items-center gap-4 hover:bg-white/50 transition-colors rounded-xl cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center"><Ticket size={20} /></div>
                    <div className="flex-1"><h4 className="text-sm font-bold text-slate-800">나의 쿠폰함</h4><p className="text-xs text-slate-500">사용 가능 3장</p></div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM NAV */}
        <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/70 backdrop-blur-xl border border-white/50 p-2 rounded-full flex justify-between items-center z-30 shadow-lg shadow-slate-200/50">
          <NavBtn active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={Leaf} label="키우기" />
          <NavBtn active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={ShoppingBag} label="상점" />
          <NavBtn active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={MapIcon} label="지도" />
          <NavBtn active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={User} label="내 정보" />
        </nav>

        {/* --- MODALS --- */}
        {showAdoptionModal && (
          <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-[2rem] w-full max-w-sm p-8 shadow-2xl transform scale-100 animate-in zoom-in-95 duration-300 relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-emerald-100/50 to-transparent -z-10"></div>
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-50"><Check size={40} className="text-emerald-600" /></div>
              <h2 className="text-2xl font-extrabold text-slate-800 mb-2">성장 완료!</h2>
              <p className="text-slate-600 text-sm mb-8">이 <b>{currentSeed?.name || '나무'}</b>는 이제 현실 세계로 나갈 준비가 되었습니다.<br/>입양을 확정하면 인증서가 발급되고 화분이 비워집니다.</p>
              <button onClick={handleConfirmAdoption} className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200/50 hover:scale-[1.02] transition-transform active:scale-95">입양 확정 & 인증서 발급</button>
            </div>
          </div>
        )}

        {/* CERTIFICATE DETAIL MODAL */}
        {selectedCertificate && (
          <div className="absolute inset-0 z-[60] bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
            <button onClick={() => setSelectedCertificate(null)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 z-50"><X size={24} /></button>
            <div className="w-full max-w-sm bg-[#fdfbf7] rounded-xl shadow-2xl relative overflow-hidden transform animate-in zoom-in-95 duration-500 border-[8px] border-double border-[#d4b98c]">
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700"></div>
              <div className="relative pt-8 pb-4 text-center">
                <div className="inline-block bg-[#1f4e3d] text-[#f0e6d2] px-6 py-1.5 rounded-full text-xs font-bold shadow-md relative z-10 border border-[#d4b98c]">✨ 축하합니다! 안산 시민님의 업적 ✨</div>
                <div className="mt-2 text-emerald-600 font-bold text-sm flex justify-center items-center gap-1">활력 포인트 <Zap size={14} fill="currentColor" /> +800 획득</div>
              </div>
              <div className="px-8 pb-10 text-center relative z-10">
                <h2 className="text-2xl font-black text-[#2c3e50] mb-6 tracking-tight font-serif">내 나무 인증서</h2>
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-[#e8dcc4] bg-white shadow-inner flex items-center justify-center overflow-hidden">
                    <span className="text-6xl filter drop-shadow-md animate-[gentle-sway_3s_ease-in-out_infinite]">{selectedCertificate.imageEmoji}</span>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#2c3e50] text-white text-[10px] px-3 py-1 rounded-full border border-[#d4b98c]">{selectedCertificate.type.split(' ')[0]}</div>
                </div>
                <div className="text-left text-sm text-[#4a5568] leading-relaxed mb-6 font-serif">
                  <p className="mb-2"><span className="font-bold text-[#2c3e50]">안산 시민</span>님 감사합니다:</p>
                  <p className="indent-6">신청하신 <span className="font-bold text-emerald-700">{selectedCertificate.type.split(' ')[0]}</span>는 안산시에서 입양하여 식재를 진행합니다. 다음 주에 명패가 부착될 예정입니다.</p>
                </div>
                <div className="bg-[#f5f0e6] rounded-lg p-4 text-xs text-left space-y-2 border border-[#e8dcc4]">
                  <div className="flex"><span className="text-[#8d806a] w-16">나무 번호:</span> <span className="font-mono text-[#2c3e50] font-bold">{selectedCertificate.code}</span></div>
                  <div className="flex"><span className="text-[#8d806a] w-16">신청 일자:</span> <span className="text-[#2c3e50]">{selectedCertificate.date}</span></div>
                  <div className="flex"><span className="text-[#8d806a] w-16">식재 장소:</span> <span className="text-[#2c3e50]">{selectedCertificate.location}</span></div>
                </div>
                <div className="mt-8 flex justify-between items-end relative">
                  <div className="text-left"><div className="text-[10px] font-bold text-[#1f4e3d] opacity-80 flex items-center gap-1"><Leaf size={10} /> ANSAN GREEN PASS</div></div>
                  <div className="text-right relative">
                    <p className="font-bold text-[#2c3e50] font-serif">안산시청</p>
                    <div className="absolute -top-6 -left-6 w-20 h-20 border-[3px] border-red-600/80 rounded-full flex items-center justify-center transform -rotate-12 opacity-80 pointer-events-none mix-blend-multiply">
                      <div className="w-16 h-16 border border-red-600/50 rounded-full flex items-center justify-center p-1 text-center text-[8px] font-bold text-red-600 leading-tight">안산<br/>시청<br/>인</div>
                      <div className="absolute text-[8px] text-red-600 font-bold top-1">공증</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-8 w-full max-w-sm bg-[#FEE500] hover:bg-[#FDD835] text-[#3c1e1e] font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95">
              <div className="bg-[#3c1e1e] text-[#FEE500] p-1 rounded"><Share2 size={16} /></div>
              카카오톡으로 자랑하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---

const ActionCard = ({ id, title, value, unit, icon: Icon, color, bg, points, isClaimed, onClick }) => (
  <button onClick={onClick} className={`min-w-[140px] p-4 rounded-2xl border border-white/60 shadow-sm backdrop-blur-md bg-white/40 flex flex-col justify-between items-start snap-center hover:bg-white/60 transition-all active:scale-95 group relative overflow-hidden`}>
    {isClaimed && (<div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 animate-in fade-in zoom-in duration-300"><div className="text-emerald-600 font-bold flex flex-col items-center"><Check size={24} /><span className="text-xs">+{points}</span></div></div>)}
    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${bg} ${color}`}><Icon size={16} /></div>
    <div><h4 className="text-xs text-slate-500 font-medium mb-0.5">{title}</h4><div className="flex items-baseline gap-1"><span className="text-lg font-extrabold text-slate-800">{value}</span><span className="text-[10px] text-slate-400">{unit}</span></div></div>
    <div className="mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded-full flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"><Sparkles size={8} /> +{points}</div>
  </button>
);

const NavBtn = ({ active, onClick, icon: Icon, label }) => (
  <button onClick={onClick} className={`relative flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-500 ${active ? 'text-emerald-800 bg-emerald-100/80 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
    <Icon size={active ? 20 : 22} strokeWidth={active ? 2.5 : 2} />{active && <span className="text-sm font-bold animate-in fade-in slide-in-from-right-2 duration-300">{label}</span>}
  </button>
);

// Enhanced Tree Visual with detailed Level 4 features
const EnhancedTreeVisual = ({ level, colorType }) => {
  // Color Palettes
  const palettes = {
    yellow: { trunk: ['#8D6E63', '#5D4037'], leafLight: '#FDE047', leafDark: '#EAB308', fruit: '#F59E0B' },
    pink: { trunk: ['#795548', '#4E342E'], leafLight: '#F9A8D4', leafDark: '#EC4899', fruit: '#FCE7F3' },
    purple: { trunk: ['#5D4037', '#3E2723'], leafLight: '#D8B4FE', leafDark: '#9333EA', fruit: '#E9D5FF' },
    green: { trunk: ['#8D6E63', '#5D4037'], leafLight: '#86EFAC', leafDark: '#16A34A', fruit: '#FCD34D' }, // default
  };

  const p = palettes[colorType] || palettes.green; // Fallback to green

  return (
    <svg width="300" height="340" viewBox="0 0 300 340" className="overflow-visible">
      <defs>
        <linearGradient id={`trunkGrad-${colorType}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={p.trunk[0]} /><stop offset="100%" stopColor={p.trunk[1]} /></linearGradient>
        <linearGradient id={`leafGradLight-${colorType}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={p.leafLight} /><stop offset="100%" stopColor={p.leafDark} /></linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* --- LEVEL 4: MATURE & MAGICAL --- */}
      {level >= 4 && (
        <g transform="translate(150, 300)">
          {/* Energy Aura/Halo */}
          <circle cx="0" cy="-150" r="120" fill="url(#glow)" className="animate-[pulse_3s_infinite]" />
          {/* Trunk */}
          <path d="M-15,0 C-20,-10 -25,-10 -30,20 L-12,0 L-10,-100 Q-10,-120 10,-120 L10,-100 L12,0 L30,20 C25,-10 20,-10 15,0 Z" fill={`url(#trunkGrad-${colorType})`} />
          
          {/* Magical Floating Particles */}
          <g className="animate-[spin_10s_linear_infinite]">
            <circle cx="-80" cy="-180" r="2" fill="white" opacity="0.6" />
            <circle cx="80" cy="-120" r="3" fill="white" opacity="0.4" />
            <circle cx="0" cy="-240" r="2" fill="white" opacity="0.5" />
          </g>

          {/* Foliage Clusters - Volumetric Look */}
          <g className="origin-[0_-120px] animate-[sway_6s_ease-in-out_infinite]">
            {/* Back Layer */}
            <circle cx="-50" cy="-120" r="50" fill={p.leafDark} />
            <circle cx="50" cy="-120" r="50" fill={p.leafDark} />
            <circle cx="0" cy="-170" r="60" fill={p.leafDark} />
            
            {/* Middle Layer */}
            <circle cx="-40" cy="-140" r="50" fill={`url(#leafGradLight-${colorType})`} />
            <circle cx="40" cy="-140" r="50" fill={`url(#leafGradLight-${colorType})`} />
            
            {/* Top Layer */}
            <circle cx="0" cy="-190" r="55" fill={`url(#leafGradLight-${colorType})`} filter="drop-shadow(0 10px 10px rgba(0,0,0,0.1))" />
            {/* Decor: Fruits/Flowers */}
            <g className="animate-[bounce_3s_infinite]">
              <circle cx="-20" cy="-160" r="6" fill={p.fruit} stroke="white" strokeWidth="1" />
              <circle cx="30" cy="-150" r="7" fill={p.fruit} stroke="white" strokeWidth="1" />
              <circle cx="10" cy="-200" r="5" fill={p.fruit} stroke="white" strokeWidth="1" />
              <circle cx="-40" cy="-130" r="5" fill={p.fruit} stroke="white" strokeWidth="1" />
            </g>
          </g>
        </g>
      )}

      {/* --- LEVEL 1-3 (Simplified for brevity, similar to before) --- */}
      {level < 4 && (
        <g transform="translate(150, 300)">
          {level === 1 && <circle cx="0" cy="0" r="10" fill={p.trunk[0]} />}
          {level === 2 && (
            <g>
              <path d="M0,0 Q5,-30 0,-60" stroke={p.trunk[0]} strokeWidth="6" strokeLinecap="round" />
              <path d="M0,-60 Q-25,-90 0,-120 Q25,-90 0,-60 Z" fill={p.leafLight} className="origin-bottom animate-[wiggle_3s_ease-in-out_infinite]" />
            </g>
          )}
          {level === 3 && (
            <g>
              <path d="M-5,0 L-5,-80 Q-5,-100 0,-110 Q5,-100 5,-80 L5,0 Z" fill={p.trunk[0]} />
              <g className="origin-[0_-100px] animate-[sway_4s_ease-in-out_infinite]">
                <circle cx="0" cy="-120" r="40" fill={p.leafDark} />
                <circle cx="-20" cy="-140" r="30" fill={p.leafLight} />
                <circle cx="20" cy="-140" r="30" fill={p.leafLight} />
              </g>
            </g>
          )}
        </g>
      )}
    </svg>
  );
};

export default App;