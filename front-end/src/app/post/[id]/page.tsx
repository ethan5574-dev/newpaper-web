import { Eye } from 'lucide-react';
import Image from 'next/image';

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

    // Fake data for demo UI
    const post = {
        id,
        title: 'Create Meaningful Family Moments',
        author: 'Jane Doe',
        date: 'September 20, 2025',
        readTime: '7 min read',
        cover:
            'https://cdn-media.sforum.vn/storage/app/media/anh-dep-13.jpg',
        content: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus nisi soluta repellendus earum, eaque quam perspiciatis, obcaecati nam ducimus.',
            'Nesciunt nobis, similique iusto provident amet illo delectus at dolores eveniet reiciendis adipisci, autem ullam. Explicabo, ipsam. Optio illo ipsa accusantium.',
            'Ullam numquam quasi, pariatur mollitia saepe recusandae laboriosam rem, cumque excepturi ipsum obcaecati sapiente. Ducimus impedit omnis repellendus ipsum architecto.',
        ],
    };

    return (
        <article className=" mt-16 px-4 py-8 sm:py-12 bg-zinc-100">
            {/* Title */}
            <div className="mx-auto max-w-[900px]">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                    {post.title}
                </h1>

                {/* Meta */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-900">
                    <div className="flex items-center gap-3">
                        <Image
                            src="https://randomuser.me/api/portraits/women/65.jpg"
                            alt={post.author}
                            width={36}
                            height={36}
                            className="rounded-full"
                        />
                        <span className="text-xl text-zinc-900 font-bold">{post.author}</span>
                    </div>
                    <span className="text-zinc-400 font-bold ">•</span>
                    <span className="text-zinc-700 font-bold ">{post.date}</span>
                    <span className="text-zinc-400 ">•</span>
                    <span className="text-zinc-700 ">{post.readTime}</span>
                    <span className="text-zinc-400 ">•</span>
                    <span className="flex items-center gap-1 text-zinc-700">
                        <Eye className="h-4 w-4" />
                        1,234 views
                    </span>
                </div>

                {/* Cover image */}
                <div className="relative mt-6 overflow-hidden rounded-lg">
                    <Image
                        src={post.cover}
                        alt={post.title}
                        width={1600}
                        height={900}
                        className="h-[240px] w-full object-cover sm:h-[360px] md:h-[420px]"
                    />
                </div>

                {/* Content */}
                <div className="prose prose-zinc mt-8 max-w-none text-zinc-900">
                    <p>{post.content[0]}</p>
                    <p>{post.content[1]}</p>
                    <blockquote>
                        Good design is making something intelligible and memorable. Great design is making something
                        memorable and meaningful.
                    </blockquote>
                    <p>{post.content[2]}</p>
                </div>
            </div>
        </article>
    );
}

// Next.js static export requires pre-defined params for dynamic routes
export async function generateStaticParams() {
    // TODO: Replace with real IDs from your API at build time
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
}


