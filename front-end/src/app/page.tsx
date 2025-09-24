'use client';
import Image from "next/image";
import { ImageOff, StickyNote, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Home() {
  const dataCard = [
    {
      id: 1,
      title: "Just a Standard Format Post.",
      date: "December 15, 2017",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi dolores voluptate quasi repellat assumenda.",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
      imageHeightClass: "h-56",
      author: "Alex Johnson",
      views: 1280,
    },
    {
      id: 2,
      title: "10 Interesting Facts About Caffeine.",
      date: "December 15, 2017",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet adipisci suscipit cumque.",
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop",
      imageHeightClass: "h-48",
      author: "Emily Carter",
      views: 2365,
    },
    {
      id: 3,
      title: "No Sugar Oatmeal Cookies.",
      date: "December 10, 2017",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, magni.",
      image:
        "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop",
      imageHeightClass: "h-48",
      author: "Sophia Nguyen",
      views: 980,
    },
    {
      id: 4,
      title: "Key Benefits Of Family Photography.",
      date: "December 10, 2017",
      excerpt: "Lorem ipsum dolor sit amet, consectetur.",
      image:
        "https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=1200&auto=format&fit=crop",
      imageHeightClass: "h-56",
      author: "Michael Lee",
      views: 1512,
    },
    {
      id: 5,
      title: "Visiting Theme Parks Improves Your Health.",
      date: "December 10, 2017",
      excerpt:
        "Accusamus delectus nisi soluta repellendus earum, eaque quam perspiciatis.",
      image:
        "",
      imageHeightClass: "h-72",
      author: "Liam Walker",
      views: 742,
    },
    {
      id: 6,
      title: "Workspace Design Trends and Ideas.",
      date: "December 10, 2017",
      excerpt: "Lorem ipsum dolor sit amet, consectetur.",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
      imageHeightClass: "h-48",
      author: "Mia Thompson",
      views: 2044,
    },
    {
      id: 7,
      title: "The Pomodoro Technique Really Works.",
      date: "December 29, 2017",
      excerpt: "Dolor sit amet consectetur adipisicing elit.",
      image:
        "https://cdn-media.sforum.vn/storage/app/media/anh-dep-17.jpg",
      imageHeightClass: "h-56",
      author: "Noah Martinez",
      views: 1687,
    },
    {
      id: 8,
      title: "Throwback To The Good Old Days.",
      date: "December 29, 2017",
      excerpt: "Nostrum perferendis, optio repellendus delectus.",
      image:
        "https://cdn-media.sforum.vn/storage/app/media/anh-dep-13.jpg",
      imageHeightClass: "h-56",
      author: "Olivia Perez",
      views: 1120,
    },
    {
      id: 9,
      title: "Create Meaningful Family Moments.",
      date: "December 10, 2017",
      excerpt: "Quisquam, quae. Voluptatem reiciendis ullam!",
      image:
        "",
      imageHeightClass: "h-72",
      author: "William Chen",
      views: 659,
    },
    {
      id: 10,
      title: "What Your Music Preference Says About You.",
      date: "December 29, 2017",
      excerpt: "Ipsum dolor sit amet, consectetur adipisicing elit.",
      image:
        "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?q=80&w=1200&auto=format&fit=crop",
      imageHeightClass: "h-64",
      author: "Ava Patel",
      views: 1899,
    },
  ];
  const dataTop3Post = [
    {
      id: 1,
      title: "What Your Music Preference Says About You and Your Personality.",
      author: "John Doe",
      date: "December 29, 2017",
    },
    {
      id: 2,
      title: "The Pomodoro Technique Really Works.",
      author: "John Doe",
      date: "December 29, 2017",
    },
    {
      id: 3,
      title: "Throwback To The Good Old Days.",
      author: "John Doe",
      date: "December 29, 2017",
    },
  ];
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen pt-16">
      <div className="bg-zinc-900 mx-auto pt-6 sm:pt-10">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 max-sm:gap-4 p-4 sm:px-6 lg:grid-cols-2">
          <div className="relative h-[240px] sm:h-[320px] md:h-[420px] lg:h-[500px] bg-[url('https://cdn-media.sforum.vn/storage/app/media/anh-dep-15.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[70%] to-[100%] from-transparent to-black"></div>
            <div className="absolute left-2 bottom-2 z-20">
              <h1 className="text-white text-2xl font-bold leading-tight max-w-xl cursor-pointer" onClick={() => router.push(`/post/${dataTop3Post[0].id}`)}>
                {dataTop3Post[0].title}
              </h1>
              <div className="flex items-center mt-4 space-x-3">
                <Image
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="John Doe"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <span className="text-white font-bold">{dataTop3Post[0].author}</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-300">{dataTop3Post[0].date}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch justify-center max-sm:gap-4">
            <div className="relative h-[180px] sm:h-[220px] md:h-[250px] bg-[url('https://cdn-media.sforum.vn/storage/app/media/anh-dep-17.jpg')] bg-cover bg-center">
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[80%] to-[100%] from-transparent to-black"></div>
              <div className="absolute left-2 bottom-2 z-20">
                <h1 className="text-white text-xl font-bold leading-tight max-w-xl cursor-pointer" onClick={() => router.push(`/post/${dataTop3Post[1].id}`)}>
                  {dataTop3Post[1].title}
                </h1>
                <div className="flex items-center mt-2 space-x-3">

                  <span className="text-white font-bold">{dataTop3Post[1].author}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-300">{dataTop3Post[1].date}</span>
                </div>
              </div>
            </div>
            <div className="relative h-[180px] sm:h-[220px] md:h-[250px] bg-[url('https://cdn-media.sforum.vn/storage/app/media/anh-dep-13.jpg')] bg-cover bg-center">
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[80%] to-[100%] from-transparent to-black"></div>
              <div className="absolute left-2 bottom-2 z-20">
                <h1 className="text-white text-xl font-bold leading-tight max-w-xl cursor-pointer" onClick={() => router.push(`/post/${dataTop3Post[2].id}`)}>
                  {dataTop3Post[2].title}
                </h1>
                <div className="flex items-center mt-2 space-x-3">

                    <span className="text-white font-bold">{dataTop3Post[2].author}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-300">{dataTop3Post[2].date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto pt-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 [column-fill:_balance]">{/* masonry columns */}
            {dataCard.map((card) => (
              <article key={card.id} className="group mb-6 break-inside-avoid overflow-hidden rounded-md bg-white shadow">
                {card.image ? (
                  <div className={`relative ${card.imageHeightClass} w-full overflow-hidden`}>
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className={`${card.imageHeightClass} flex w-full items-center justify-center bg-zinc-100 text-zinc-400`}>
                    <StickyNote className="h-8 w-8" />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-xs text-gray-500">{card.date}</p>
                  <h3 className="mt-1 text-base font-semibold text-zinc-900 cursor-pointer hover:text-sky-700" onClick={() => router.push(`/post/1`)}>{card.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">{card.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-sky-700">{card.author}</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="h-4 w-4" />
                      {card.views.toLocaleString?.() || card.views}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
