MVP Guide – Restaurant Web Frontend 
(React + TypeScript) 
Diperuntukkan	untuk:	Mentee	–	Frontend	--- LINK DEPLOYMENT

1) Tujuan & Ruang Lingkup 
Membangun	Frontend	MVP	untuk	aplikasi	Restaurant	yang	terhubung	ke	backend.	Fokus	
pada	alur	dasar:	eksplor	menu,	filter	&	pencarian,	keranjang,	dan	checkout	sederhana.

3) Repo Backend & Figma 
• Backend	(Node):	git	clone	
https://github.com/Henryrivardo07/be_restaurant_app_for_mentee.git	lalu	jalankan	
`npm	i`	dan	`npm	run	dev`	atau	perintah	yang	tersedia	pada	repo.	
• Figma	(UI	acuan):	
https://www.figma.com/design/LjdhdKvvmkoQYFQ8veYoiv/Restaurant---Batch
3?node-id=37411-2452	
• Env	=	
DATABASE_URL="postgresql://neondb_owner:npg_Fr1DGLoThui0@ep-summer
feather-a1m96c5z-pooler.ap-southeast
1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" 
JWT_SECRET="your-super-secret-jwt-key-here" 
JWT_EXPIRES_IN="7d" 
PORT=8080 
NODE_ENV="development"

5) Tech Stack Wajib 
• React.js	+	TypeScript	—	framework	&	type	safety	
• Tailwind	CSS	—	styling	cepat,	utility-first	
• shadcn/ui	—	komponen	UI	siap	pakai	
• Redux	Toolkit	—	simpan	filter,	cart,	dan	state	UI	lain	(client	state)	
• TanStack	Query	(React	Query)	—	fetching	&	caching	server	state	
• Optimistic	UI	—	UX	responsif	(mis.	tambah/hapus	cart)	
• Day.js	—	format	waktu/tanggal

6) MVP Scope (Fitur Minimum) 
• Halaman	Menu	(Home):	daftar	makanan	&	minuman,	harga,	kategori,	rating,	foto.	
• Filter	&	Sort:	berdasarkan	kategori,	harga,	rating;	simpan	di	Redux.	
• Pencarian:	search	by	name/keyword	(client-side	atau	server-side).	
• Detail/Quick	View:	modal	atau	halaman	detail	sederhana	(opsional).	
• Keranjang	(Cart):	tambah,	ubah	qty,	hapus	item	—	Optimistic	UI.	
• Checkout	Sederhana:	form	nama/no	HP/alamat	(tanpa	payment	gateway).	
• Riwayat	Pesanan	(History):	daftar	pesanan	yang	pernah	dibuat	(sederhana).	
• State	Management:	server	state	via	React	Query,	UI	state	via	Redux.	
• Responsif:	mobile-first,	minimal	breakpoint	sm/md/lg.	
• Aksesibilitas:	alt	text,	focus	ring,	warna	kontras	cukup.
    
7) Pemisahan State: Redux vs React Query 
• React	Query	(Server	State):	menu,	kategori,	detail	item,	order	list.	
• Redux	Toolkit	(Client/UI	State):	filters,	sort,	search	query,	cart,	modal	open/close.

7) Struktur Project (Direkomendasikan) 
src/	
├─	app/																					
├─	pages/																			
├─	features/	
│			├─	cart/																
│			└─	filters/													
├─	components/														
├─	ui/																						
├─	services/	
│			├─	api/																	
│			└─	queries/													
├─	types/																			
├─	lib/																					
├─	styles/																		
├─	assets/																		
└─	config/																		
#	Entry	&	routing	(Vite/CRA:	src/main.tsx	+	src/App.tsx)	
#	Page-level	components	(Home,	Cart,	Checkout,	Orders)	
#	Redux	slice	cart	+	hooks	
#	Redux	slice	filter/sort/search	
#	UI	reusable	(Navbar,	Footer,	ProductCard,	EmptyState)	
#	shadcn/ui	wrappers	jika	perlu	
#	axios	instance,	request	helpers	
#	React	Query	hooks	(useMenusQuery,	dst.)	
#	TypeScript	types	(MenuItem,	Category,	Order,	dst.)	
#	utils	(formatCurrency,	cn,	etc.)	
#	global.css,	tailwind.css	
#	images/icons	jika	perlu	
#	env,	constants,	route	paths

8) Persiapan Project (Langkah Cepat) 
• Inisialisasi	project:	Vite	(disarankan)	→	`npm	create	vite@latest	restaurant-frontend	--	--template	react-ts`	
• Masuk	folder	&	install	deps:	`cd	restaurant-frontend	&&	npm	i`	
• Install	Tailwind	CSS:	sesuai	dokumentasi	Tailwind	(init	&	konfigurasi).	
• Install	shadcn/ui:	setup	sesuai	docs;	generate	komponen	yang	dibutuhkan	(Button,	
Input,	Card,	Dialog).	
• Install	Redux	Toolkit	&	React	Query:	`npm	i	@reduxjs/toolkit	react-redux	
@tanstack/react-query	axios	dayjs`	
• Siapkan	`axios`	instance	(`/services/api/axios.ts`)	dan	baseURL	dari	backend.	
• Buat	store	Redux	(`/features/store.ts`)	dan	slice	(cart,	filters).	
• Bungkus	App	dengan	`<Provider>`	(Redux)	dan	`<QueryClientProvider>`	(React	Query).
    
9) Environment & Konfigurasi 
• Buat	`.env`	dengan	`VITE_API_BASE_URL=http://localhost:3000`	(sesuaikan).	
• Axios	instance	membaca	`import.meta.env.VITE_API_BASE_URL`.	
• Hindari	hard-code	URL	API	di	komponen.

10) TypeScript Types (Contoh) 
type	Category	=	{	
id:	string;	
name:	string;	
};	
type	MenuItem	=	{	
id:	string;	
name:	string;	
price:	number;	
imageUrl?:	string;	
categoryId:	string;	
rating?:	number;	
createdAt?:	string;	
};	
type	CartItem	=	{	
id:	string;								
//	menu	id	
name:	string;	
price:	number;	
qty:	number;	
imageUrl?:	string;	
};	
type	Order	=	{	
id:	string;	
items:	CartItem[];	
total:	number;	
customerName:	string;	
phone:	string;	
address:	string;	
createdAt:	string;	
};	

11) React Query Hooks (Contoh) 
//	services/queries/menu.ts	
import	{	useQuery	}	from	'@tanstack/react-query';	
import	axios	from	'../api/axios';	
export	function	useMenusQuery(params?:	{	q?:	string;	category?:	string;	sort?:	string	})	{	
return	useQuery({	
queryKey:	['menus',	params],	
queryFn:	async	()	=>	{	
const	{	data	}	=	await	axios.get('/menus',	{	params	});	
return	data;	//	MenuItem[]	
},	
staleTime:	60_000,	
});	
}	

12) Redux Slice (Contoh Cart) 
//	features/cart/cartSlice.ts	
import	{	createSlice,	PayloadAction	}	from	'@reduxjs/toolkit';	
import	type	{	CartItem	}	from	'../../types';	
type	CartState	=	{	items:	CartItem[]	};	
const	initialState:	CartState	=	{	items:	[]	};	
const	cartSlice	=	createSlice({	
name:	'cart',	
initialState,	
reducers:	{	
addToCart:	(state,	action:	PayloadAction<CartItem>)	=>	{	
const	found	=	state.items.find(i	=>	i.id	===	action.payload.id);	
if	(found)	found.qty	+=	action.payload.qty;	
else	state.items.push(action.payload);	
},	
updateQty:	(state,	action:	PayloadAction<{	id:	string;	qty:	number	}>)	=>	{	
const	it	=	state.items.find(i	=>	i.id	===	action.payload.id);	
if	(it)	it.qty	=	Math.max(1,	action.payload.qty);	
},	
removeFromCart:	(state,	action:	PayloadAction<string>)	=>	{	
state.items	=	state.items.filter(i	=>	i.id	!==	action.payload);	
},	
clearCart:	(state)	=>	{	state.items	=	[];	}	
}	
});	
export	const	{	addToCart,	updateQty,	removeFromCart,	clearCart	}	=	cartSlice.actions;	
export	default	cartSlice.reducer;

13) Optimistic UI (Contoh Tambah ke Cart) 
Contoh	alur:	saat	klik	"Add	to	Cart",	langsung	update	Redux	(optimistic),	baru	sync	ke	
server	(opsional).	Jika	gagal,	rollback.

14) Komponen UI Prioritas (Tailwind + shadcn/ui) 
• Navbar	(brand,	search	input,	cart	button)	
• FilterBar	(kategori,	sort	select)	
• ProductCard	(gambar,	nama,	harga,	rating,	tombol	Add	to	Cart)	
• CartDrawer/Modal	(list	item,	qty	+/-,	subtotal,	tombol	Checkout)	
• EmptyState	(untuk	list	kosong)	
• Form	Checkout	(nama,	no	HP,	alamat)

15) Routing (Direkomendasikan) 
• /	→	Home/Menu	
• /cart	→	Cart	(opsional	jika	pakai	drawer)	
• /checkout	→	Checkout	form	
• /orders	→	Riwayat	pesanan

16) Loading, Error, Empty 
• Gunakan	skeleton	(shadcn/ui	Skeleton)	saat	loading	list.	
• Tampilkan	error	state	dengan	Alert.	
• Empty	state	dengan	icon	&	call-to-action.

17) Testing Ringan (Opsional tapi Direkomendasikan) 
• Test	utility	(formatCurrency).	
• Test	reducer	cartSlice	(add/update/remove).	
• Test	komponen	ProductCard	render	props	penting.

18) Aksesibilitas & Responsif 
• Semua	gambar	punya	alt.	
• Komponen	interaktif	fokus	dengan	jelas	(focus-visible).	
• Breakpoint	minimum:	sm/md/lg;	grid	responsif	1–2–4	kolom.

19) Kualitas Kode & Style 
• Gunakan	TypeScript	dengan	type	yang	jelas	(hindari	any).	
• Nama	file	dan	folder	konsisten	(kebab/pascal-case	sesuai	konteks).	
• Pisahkan	server-state	(React	Query)	vs	UI-state	(Redux).	
• Hindari	logic	berat	di	komponen;	pindahkan	ke	hooks/helper.
	
20) Deployment 
• Buat	build:	`npm	run	build`.	
• Deploy	ke	Vercel/Netlify:	pastikan	setting	env	`VITE_API_BASE_URL`.	
• Uji	konektivitas	ke	backend	(CORS	&	baseURL).	

21) Acceptance Criteria (Dinilai Lulus) 
•  Home	menampilkan	list	menu	dari	backend	dengan	loading	skeleton.	
•  Filter/sort/search	berfungsi	dan	tersimpan	di	Redux.	
•  Add	to	Cart	berjalan	(optimistic);	ubah	qty	&	hapus	item.	
•  Checkout	form	menyimpan	order	(mock	atau	endpoint	backend).	
•  Orders	history	menampilkan	minimal	daftar	order	yang	disubmit.	
• Responsif	mobile	&	aksesibilitas	dasar	terpenuhi.	
• Kode	rapi,	terstruktur,	dan	sesuai	stack	yang	diminta.
    
22) Rubrik Penilaian (Total 100) 
• Fungsionalitas	Inti	(40):	list	menu,	filter/sort/search,	cart,	checkout.	
• Kualitas	UI/UX	(20):	konsistensi	design	Tailwind/shadcn,	responsif,	aksesibel.	
• Arsitektur	&	State	(20):	pemisahan	Redux	vs	React	Query,	folder	structure.	
• Kualitas	Kode	(10):	TypeScript	types,	clean	code,	reusable	components.	
• Stabilitas	(10):	error/loading/empty	states;	basic	testing.

23) Timeline & Deliverables 
• Day	1–2:	Setup	project,	Tailwind,	shadcn/ui,	store,	axios,	query	client.	
• Day	3–4:	Home	+	list	menu	+	filter/search	+	skeleton.	
• Day	5–6:	Cart	+	checkout	+	optimistic	UI.	
• Day	7:	Orders	history	+	polishing	+	deploy.	
• Deliverables:	URL	deploy,	repo	GitHub,	dan	README	yang	jelas.
    
24) Git Workflow (Sederhana) 
• Branch:	main	(protected),	feature/*	untuk	task.	
• PR	kecil	&	sering;	deskripsi	jelas;	screenshot/record	bila	UI.	
• Conventional	commits	(feat:,	fix:,	refactor:,	docs:).

25) Catatan Backend 
• Jalankan	backend	lokal	sebelum	frontend.	
• Cek	endpoint	yang	tersedia	(menus,	categories,	orders)..

26) Kontak & Bantuan 
• Laporkan	blocker	di	Slack	channel	kelas.	
• Cantumkan	log	error	&	langkah	reproduksi	saat	bertanya.	
• Selalu	refer	ke	Figma	untuk	konsistensi	UI.
