/*
Size Guide
https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977038/size_guide_inksxc.webp


Well said White Logo
https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977043/wellsaidwhite_kg7qaa.png


Well Said Purple
https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977043/wellsaidpurple_alsabf.png


Well Said BG
https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977043/wellsaid-background_f84v60.jpg
*/

export const FRAME_COLORS = {
	silver: "bg-neutral-400",
	natural: "bg-[#d0b693]",
	black: "bg-black",
	white: "bg-gray-50",
	gold: "bg-[#dfaf37]",
};

export const getRandomIdx = (array) => {
	return Math.floor(Math.random() * array.length);
};

export const prices = [
	{ size: "A0 (33.1 x 46.8 in.)", price: 189.99 },
	{ size: "A1 (34.4 x 33.1 in.)", price: 149.99 },
	{ size: "A2 (16.5 x 23.4 in.)", price: 109.99 },
	{ size: "A3 (11.7 x 16.5 in.)", price: 89.99 },
	{ size: "A4 (8.3 x 11.7 in.)", price: 64.99 },
	{ size: "A5 (5.8 x 8.2 in.)", price: 39.99 },
];

export const bannerdata = [
	{
		image:
			"https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977045/blossom-slide_xawgxx.png",
		position: "justify-center md:justify-end items-center w-full h-full",
		subtitle: "Words That Move You",
		textAlign: "md:text-right",
		title:
			"Empower your space with <span class='text-secondary'>uplifting words.</span>",
		text: "From motivational quotes to bold statements, find the perfect piece to elevate your mindset.",
		button: "Find Inspo Art",
		category: "Inspo",
	},
	,
	{
		image:
			"https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977044/dreamer-slide_km0ez5.png",
		position: "justify-center md:justify-start items-center w-full h-full",
		textAlign: "md:text-left",
		subtitle: "Let The Music Play",
		title: "Celebrate<span class='text-secondary'> iconic </span> lyrics",
		text: "Capture the heart of your favorite songs with eye-catching décor that hits all the right notes.",
		button: "Shop Lyrics",
		category: "Lyrics",
	},
	{
		image:
			"https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977044/thriving-slide_gfwafj.png",
		position: "justify-center items-center w-full h-full",
		textAlign: "",
		subtitle: "Humor Meets Home",
		title: "Life’s <span class='text-secondary'>too short </span>for boring!",
		text: "Inject personality into your space with hilarious, conversation-starting wall art.",
		button: "Explore Funny Art",
		category: "Funny",
	},
];

export const servicetype = [
	{
		title: "Curated art to",
		text: " match your vibe",
		icon: "fa-solid fa-palette",
		borders: "md:border-b md:border-t",
		extclass: "border-b-2 md:border-b-0 border-r-2 border-bkgrd",
	},
	{
		title: "Crafted with care,",
		text: "made to last",
		borders: "md:border-l md:border-r",
		icon: "fa-solid fa-award",
		extclass: "md:border-r-2 border-b-2 border-bkgrd",
	},
	{
		title: "Own a piece of",
		text: "the extraordinary",
		borders: "md:border-b md:border-t",
		icon: "fa-regular fa-gem",
		extclass: "border-r-2 border-bkgrd",
	},
	{
		title: "The perfect gift",
		text: "for every occasion",
		borders: "md:border-l md:border-r",
		icon: "fa-solid fa-gift",
		extclass: "",
	},
];

export const shipping = [
	{
		name: "Standard",
		pricing: 14.99,
		freePricing: 0,
		time: "5-7 days",
	},
	{
		name: "Express",
		pricing: 29.99,
		time: "2-3 days",
	},
	{
		name: "Next Day",
		pricing: 49.99,
		time: "1 day",
	},
];

export const artworks = [
	{
		category: "Inspo",
		images: [
			{
				frame_color: "gold",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977025/ChangeChoose_Gold_xlduam.png",
			},
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977025/ChangeChoose_Black_gmdimu.png",
			},
		],
		name: "Change or Choose",
		quote: "Whatever you are not changing, you are choosing.\n-Laurie Buchanan",
		artwork_id: "3452afc9-a662-4efa-a1ab-b6ef64a253ec",
	},
	{
		category: "Funny",
		images: [
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977031/Experience_White_by4ukp.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977031/Experience_Natural_oyusyr.png",
			},
		],
		name: "Experience",
		quote:
			"Good judgment comes from experience, experience comes from bad judgment",
		artwork_id: "2c59379a-6b62-440e-81f8-cbd288ca7908",
	},
	{
		category: "Lyrics",
		images: [
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977034/LiveLove_Black_jv526j.png",
			},
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977035/LiveLove_White_abz85y.png",
			},
		],
		name: "Live Love",
		quote: "Love the life you live. Live the life you love.\n-Bob Marley",
		artwork_id: "36934394-ed57-47de-96a1-c9461c86cab8",
	},
	{
		category: "Inspo",
		images: [
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977034/Illusion_Black_eokzos.png",
			},
			{
				frame_color: "silver",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977034/Illusion_Silver_qnbgcg.png",
			},
		],
		name: "Illusion",
		quote: "Perfect Is An Illusion",
		artwork_id: "260e6c80-c785-4ea4-b6be-6f747aef79e2",
	},
	{
		category: "Lyrics",
		images: [
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977030/Dreamer_White_vj8f9v.png",
			},
			{
				frame_color: "silver",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977030/Dreamer_Silver_jyresz.png",
			},
		],
		name: "Dreamer",
		quote: "You may say I'm a dreamer, but I'm not the only one.\n—John Lennon",
		artwork_id: "2381e591-3f9d-4ae1-aae6-f19c01a74c4f",
	},
	{
		category: "Inspo",
		images: [
			{
				frame_color: "gold",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977032/Flawed_Gold_opkfk7.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977032/Flawed_Natural_e2ejzi.png",
			},
		],
		name: "Flawed",
		quote: "Flawed And Still Worthy",
		artwork_id: "e522634b-4ab8-4cb1-816a-d78c564f40ba",
	},
	{
		category: "Funny",
		images: [
			{
				frame_color: "gold",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977028/Cocktails_Gold_wu8vje.png",
			},
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977029/Cocktails_White_f1d6rm.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977028/Cocktails_Natural_k3vkac.png",
			},
		],
		name: "Cocktails",
		quote: "But First, Cocktails",
		artwork_id: "963dee83-d252-4263-810b-29b7e4f6525a",
	},
	{
		category: "Funny",
		images: [
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977036/Reality_Black_zehfpr.png",
			},
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977035/Reality_White_fyl95g.png",
			},
			{
				frame_color: "silver",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977037/Reality_Silver_lfgrmd.png",
			},
		],
		name: "Reality",
		quote: "Reality Continues To Ruin My Life",
		artwork_id: "05ab9341-f703-4da4-a5ca-2efb3e81310a",
	},
	{
		category: "Funny",
		images: [
			{
				frame_color: "gold",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977040/Thriving_Gold_kcqcwr.png",
			},
			{
				frame_color: "silver",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977040/Thriving_Silver_iai4vq.png",
			},
		],
		name: "Thriving",
		quote: "Thriving Purely Out Of Spite",
		artwork_id: "3a076102-8247-4791-bbc9-2cd2ac24240d",
	},
	{
		category: "Inspo",
		images: [
			{
				frame_color: "gold",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977032/HardDays_Gold_vwzdta.png",
			},
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977033/HardDays_White_uysvyk.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977033/HardDays_Natural_hnuo2w.png",
			},
		],
		name: "Hard Days",
		quote: "Dont Let The Hard Days Win",
		artwork_id: "81a9f0a9-4317-4322-8edb-181cd7e26c19",
	},
	{
		category: "Inspo",
		images: [
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977024/Break_White_b1flad.png",
			},
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977024/Break_Black_clueak.png",
			},
		],
		name: "Break",
		quote: "Dont Let It Break You",
		artwork_id: "7e4cf549-a11e-4ba1-a153-29167ecab720",
	},
	{
		category: "Lyrics",
		images: [
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977037/SheIs_White_a97d6y.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977036/SheIs_Natural_ovy2et.png",
			},
			{
				frame_color: "silver",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977037/SheIs_Silver_pvvqtf.png",
			},
		],
		name: "She Is",
		quote:
			"She's imperfect, but she tries.\n She is good, but she lies.\nShe is hard on herself.\nShe is broken and won't ask for help.\nShe is messy, but she's kind.\nShe is lonely most of the time.\nShe is all of this mixed up.\nAnd baked in a beautiful pie.\nSara Bareilles",
		artwork_id: "e5650cd7-045b-4209-90b3-7ffca4acf861",
	},
	{
		category: "Lyrics",
		images: [
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977021/AllGood_White_uay2t3.png",
			},
			{
				frame_color: "silver",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977022/AllGood_Silver_wamgul.png",
			},
		],
		name: "All Good",
		quote: "It's All Good, Baby Baby.\n-Notorious B.I.G",
		artwork_id: "ff2820df-07fd-41c5-8e7c-6431fc8bf7cb",
	},
	{
		category: "Lyrics",
		images: [
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977023/BeautifulLife_White_yoq2qe.png",
			},
			{
				frame_color: "silver",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977022/BeautifulLife_Silver_dtx1jz.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977022/BeautifulLife_Natural_pdldot.png",
			},
		],
		name: "Beautiful Life",
		quote: "And Watch Me Do It All Again, It's A Beautiful Life.\n-Nas",
		artwork_id: "7af9f318-451f-42aa-a5a8-693df9d22efc",
	},
	{
		category: "Inspo",
		images: [
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977029/DeepBreath_Black_zqjb9q.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977030/DeepBreath_Natural_i8i5rd.png",
			},
		],
		name: "Deep Breathe",
		quote: "Take A Deep Breath And Try All Over Again",
		artwork_id: "bb0d8db6-00f0-43a0-847c-4d80c011d345",
	},
	{
		category: "Inspo",
		images: [
			{
				frame_color: "gold",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977023/Blossom_Gold_tyc1ry.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977024/Blossom_Natural_rypbiq.png",
			},
		],
		name: "Blossom",
		quote:
			"And the day came when the risk to remain tight in a bud was more painful than the risk it took to blossom.\n-Anais Nin",
		artwork_id: "54ee806f-2fcb-40dd-8f30-e158b5f4803f",
	},
	{
		category: "Lyrics",
		images: [
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977038/SlowDown_Black_ywglvs.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977038/SlowDown_Natural_u6ltnl.png",
			},
		],
		name: "Slow Down",
		quote:
			"Slow down, you're doing fine. You can't be everything you want to be before your time.\n-Billy Joel",
		artwork_id: "fc87ffe0-d55d-4e48-956b-66cc91d87f24",
	},
	{
		category: "Funny",
		images: [
			{
				frame_color: "gold",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977042/Vintage_Gold_wbg0kd.png",
			},
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977042/Vintage_Black_l54bbm.png",
			},
		],
		name: "Vintage",
		quote: "Not Old, Vintage",
		artwork_id: "a8d13ca4-304b-49d1-9a35-e0fc7140451d",
	},
	{
		category: "Inspo",
		images: [
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977040/Unapologetic_Black_apv4xx.png",
			},
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977041/Unapologetic_White_zmhloz.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977041/Unapologetic_Natural_afylrn.png",
			},
		],
		name: "Unapologetic",
		quote: "Unapologetic",
		artwork_id: "43782074-4f1a-44c1-adea-9448113b16eb",
	},
	{
		category: "Inspo",
		images: [
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977039/Thankful_Black_l7jv2p.png",
			},
			{
				frame_color: "silver",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977040/Thankful_Silver_ymercg.png",
			},
		],
		name: "Thankful",
		quote: "Thankful I Didn't End Up With What I Thought I Wanted",
		artwork_id: "19b3b7d3-8a9d-49e1-9125-91ad2bca4ec3",
	},
	{
		category: "Funny",
		images: [
			{
				frame_color: "gold",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977026/Chaos_Gold_crebx3.png",
			},
			{
				frame_color: "black",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977026/Chaos_Black_hs8vwo.png",
			},
			{
				frame_color: "white",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977027/Chaos_White_v2jjj2.png",
			},
			{
				frame_color: "natural",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977026/Chaos_Natural_c7d95a.png",
			},
			{
				frame_color: "silver",
				src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977027/Chaos_Silver_xuf3yt.png",
			},
		],
		name: "Chaos",
		quote: "Embrace The Chaos",
		artwork_id: "5e198dae-0573-44d3-bc6b-f967e1fd6324",
	},
];

const startIdx = getRandomIdx(artworks.slice(0, -6));
export const featured = artworks.slice(startIdx, startIdx + 6);
